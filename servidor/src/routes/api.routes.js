const { Router } = require('express')
const router = Router()

const controllers =require('../controllers/api.controllers')
//const usuario = new (require('../controllers/usuarios.controllers.js'))('parametro');

/*
router.post('/comando',controllers.api_comando);
router.get('/victimas',controllers.api_getVictimas);
//router.get('/datoVictima',controllers.api_getDatoCliente);
*/
router.post('/iniciarSesion',controllers.iniciarSesion);

module.exports = router