const {config}=require('dotenv')
config()

const configuracion = []
configuracion.PUERTO=process.env.PUERTO || 3000
configuracion.TOKEN_API=process.env.TOKEN_API || '@@sicarius'
configuracion.USUARIO=process.env.USUARIO || 'sicarius'
configuracion.PASSWORD=process.env.PASSWORD || 'sicarius'

module.exports=configuracion