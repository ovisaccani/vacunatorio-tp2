//Hecho por: Ovidio Saccani
import { createEmailComprobante } from './emailComprobante.js'
import { getAuth } from '../../config.js'

const credencialesEnv = getAuth()

async function crearMailer() {
  return  createEmailComprobante(credencialesEnv.mail, credencialesEnv.pass)
}

export {
  crearMailer
}