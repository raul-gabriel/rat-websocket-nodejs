const configuracion = require('./config/configuracion');
const express = require('express');
const http = require('http');
const { Server: SocketServer } = require("socket.io");
const cors = require('cors');
const path = require('path');
const SocketController = require('./controllers/Socket.controllers.js');
const apiRoutes = require('./routes/api.routes.js');

// Crear una instancia de Express
const app = express();

// Habilitar CORS
app.use(cors());

// Parsear solicitudes JSON
app.use(express.json());

// Crear servidor HTTP utilizando Express
const servidor = http.createServer(app);

// Configurar Socket.IO para aceptar conexiones desde cualquier origen
const io = new SocketServer(servidor, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Inicializar controlador de sockets
new SocketController(io);

// Rutas de la API
app.use('/api', apiRoutes);

// Servir archivos estáticos desde la carpeta 'public' 
app.use(express.static(path.join(__dirname, '..', 'public')));

// Ruta predeterminada para cualquier otra solicitud (mostrar la pagina react)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Exportar el servidor para su uso en otros archivos
module.exports = servidor;
