const configuracion = require('../config/configuracion');

class Controlers {

    /**
     * Controlador para iniciar sesión.
     * 
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Object} - Respuesta JSON indicando éxito o fracaso de la sesión.
     */
    static async iniciarSesion(req, res) {
        try {
            // Extraer el usuario y la contraseña del cuerpo de la solicitud
            const { usuario, password } = req.body;

            // Comprobar si el usuario y la contraseña coinciden con los configurados
            if (usuario === configuracion.USUARIO && password === configuracion.PASSWORD) {
                console.log("Sesión iniciada correctamente");
                return res.status(200).json({ mensaje: 1 }); // Éxito: 1
            } else {
                console.log("Error al iniciar sesión");
                return res.status(200).json({ mensaje: 0 }); // Fracaso: 0
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error interno del servidor' }); // Error interno del servidor
        }
    }
}

module.exports = Controlers;
