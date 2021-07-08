//Hecho por: Sasha Berkowsky
import { crearSolicitudDeTurno } from "../../modelos/SolicitudDeTurno.js";
import { crearErrorSolicitudExistente } from "../../../compartido/errores/ErrorSolicitudExistente.js";

function HabilitarSolicitud(daoSolicitudesDeTurno, emailModule) {
  return {
    ejecutar: async (datosSolicitud) => {
      const solicitud = crearSolicitudDeTurno(datosSolicitud);
      const { added } = await daoSolicitudesDeTurno.addUnique(solicitud);
      if (!added) {
        throw crearErrorSolicitudExistente(
          "paciente ya tiene una solicitud asignada"
        );
      }
      await emailModule.avisoAPaciente(solicitud.getPaciente());
      await emailModule.avisoAAdmin(solicitud.getPaciente());

      return solicitud.getSolicitud();
    },
  };
}

export { HabilitarSolicitud };
