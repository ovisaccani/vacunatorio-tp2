// Hecho por: Nicolas Pacheco
import { crearDaoSolicitudesCache } from "../../persistencia/daos/daoSolicitudesCache.js";
import {crearEmailModule} from "../../../../src/compartido/moduloMailing/emailModule.js"
import { getAuth } from "../../../../src/config.js"
import { crearEnviadorRecordatorio } from "../../../../src/vacunacion/negocio/enviarRecordatorio/casoDeUso_enviarRecordatorio.js";

const dao = crearDaoSolicitudesCache()
const emailModule = crearEmailModule(getAuth());
const recordatorio =crearEnviadorRecordatorio(emailModule, dao)



function pruebaCasodeUsoEnviarNofiticaciones(dias){
recordatorio.recordarDiasAntes(dias)

}

pruebaCasodeUsoEnviarNofiticaciones(7)

export {pruebaCasodeUsoEnviarNofiticaciones}
