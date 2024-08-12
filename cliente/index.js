const server=require('./src/app')
const configuracion=require('./src/config/configuracion')

const PORT = 3000;

// Iniciar el servidor
server.listen(configuracion.PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});


//npm install pm2 --save-dev
//pm2 start index.js
//npm install screenshot-desktop