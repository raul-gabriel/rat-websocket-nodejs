const configuracion=require('./src/config/configuracion.js')
const servidor=require('./src/app.js')

// Crear servidor
servidor.listen(configuracion.PUERTO, () => {
    console.log(`Servidor creado en el puerto ${configuracion.PUERTO}`);
});