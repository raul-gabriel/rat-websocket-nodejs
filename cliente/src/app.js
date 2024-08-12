const express = require('express');
const ioClient = require('socket.io-client');
const http = require('http'); 
const configuracion=require('./config/configuracion')
const SocketController = require('./controllers/SocketController');

const app = express();
const server = http.createServer(app);
const socket = ioClient(configuracion.URL_SERVIDOR);

// controlar todas las conecciones del socket
new SocketController(socket);


module.exports = server;
