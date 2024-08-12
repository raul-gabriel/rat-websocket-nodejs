const { exec } = require('child_process');
const os = require('os');
const https = require('https');
const fs = require('fs').promises;
const screenshot = require('screenshot-desktop');

class funciones {
    constructor() {
    }


    ejecutarComandoWindows(command) {
        try {

            return new Promise((resolve, reject) => {
                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        reject(error);
                    }
                    if (stderr) {
                        reject(new Error(stderr));
                    }
                    console.log(stdout)
                    resolve(stdout);
                });
            });
        } catch (error) {

        }
    }




    async obtenerIpPublica() {
        return new Promise((resolve, reject) => {
            https.get('https://httpbin.org/ip', (resp) => {
                let data = '';
                resp.on('data', (chunk) => { data += chunk; });
                resp.on('end', () => {
                    try {
                        const ipInfo = JSON.parse(data);
                        resolve(ipInfo.origin);
                    } catch (e) {
                        reject(e);
                    }
                });
            }).on("error", (err) => {
                reject(err);
            });
        });
    }

    async obtenerDatosCliente() {
        // Dirección IP local
        const networkInterfaces = os.networkInterfaces();
        let ipAddressLocal = '';
        for (const netInterface in networkInterfaces) {
            for (const networkInterface of networkInterfaces[netInterface]) {
                if (networkInterface.family === 'IPv4' && !networkInterface.internal) {
                    ipAddressLocal = networkInterface.address;
                    break;
                }
            }
            if (ipAddressLocal) break;
        }

        // Datos adicionales del cliente
        const hostname = os.hostname();
        const sistemaOperativo = `${os.type()} ${os.release()}`;
        const arquitectura = os.arch();
        //const memoriaTotal = os.totalmem();
        //const memoriaLibre = os.freemem();

        // Obtener la dirección IP pública
        let ipAddressPublica;
        try {
            ipAddressPublica = await this.obtenerIpPublica(); // Usar 'this' para referenciar el método
        } catch (error) {
            console.error("Error al obtener la IP pública:", error);
            ipAddressPublica = 'No disponible';
        }

        return {
            'ipLocal': ipAddressLocal,
            'ipPublica': ipAddressPublica,
            'nombre': hostname,
            'sistema_operativo': sistemaOperativo,
            'arquitectura': arquitectura,
        };
    }

    async crearArchivo(nombre, contenido) {
        try {
            console.log('nombre:' + nombre, 'contenido:' + contenido);
            await fs.writeFile(nombre, contenido);
            console.log('Archivo creado exitosamente.');
            return 'Archivo creado exitosamente.';
        } catch (err) {
            console.log(`Hubo un error al crear el archivo: ${err}`);
            return `Hubo un error al crear el archivo: ${err}`;
        }
    }


    async reconstruirArchivo(datos) {
        try {
            // Extraer la parte base64 de los datos
            const base64Data = datos.data.split(';base64,').pop();

            // Convertir los datos base64 a un buffer binario
            const buffer = Buffer.from(base64Data, 'base64');

            // Guardar el archivo en el sistema de archivos de forma asincrónica
            await fs.writeFile(datos.name, buffer);

            console.log('Archivo guardado correctamente');
            return 'Archivo guardado correctamente';
        } catch (err) {
            console.error('Error al guardar el archivo:', err);
            return 'Error al guardar el archivo:' + err;
        }
    }

    async leerArchivo(rutaArchivo) {
        try {
            const data = await fs.readFile(rutaArchivo);
            console.log('Archivo leído con éxito');
            return data;
        } catch (err) {
            console.error('Error al leer el archivo:', err);
            throw err;
        }
    }

    /*capturaPantalla() {
        
    }*/

    capturaPantalla(datos) {

        if (datos.opcion == "LOCAL") {
            return new Promise((resolve, reject) => {
                screenshot({ format: 'png' })
                    .then((img) => {
                        require('fs').writeFileSync('pantalla.png', img);
                        resolve('Captura de pantalla guardada como pantalla.png');
                    })
                    .catch((error) => {
                        reject(`Error al tomar la captura de pantalla: ${error}`);
                    });
            });

        } else {
            return new Promise((resolve, reject) => {
                screenshot({ format: 'png' })
                    .then((img) => {
                        // Convierte el buffer a base64
                        const base64Image = img.toString('base64');
                        resolve(base64Image);
                    })
                    .catch((error) => {
                        reject(`Error al tomar la captura de pantalla: ${error}`);
                    });
            });
        }

    }


}
module.exports = funciones;

