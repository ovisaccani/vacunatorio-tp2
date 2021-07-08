//- Hecho por: Desiree Cadahia 
import {crearErrorDniInexistente} from '../../../compartido/errores/ErrorDniInexistente.js'
import {crearErrorDatosInvalidos} from '../../../compartido/errores/ErrorDatosInvalidos.js'


function crearCasoDeUso_ConfirmacionAplicacionDeDosis(
  pdfConversor,
  daoSolicitudesDeTurno,
  emailComprobante,
  prepararDatosPdf
) {
  return {
    ejecutar: async (dni) => {

        const {solicitud, found} = await daoSolicitudesDeTurno.getByDni(dni)
        if(found){
          if(!(solicitud.getEstado() ==='CONFIRMACION_DE_VACUNACION_PENDIENTE'||solicitud.getEstado() ==='VACUNADO_SEGUNDADOSIS')){
            solicitud.actualizarSolicitudDeTurno();
            await daoSolicitudesDeTurno.update(solicitud);
            const paciente = solicitud.getPaciente();
            const nombrePdf = paciente.nombre+''+paciente.apellido + '_'+ solicitud.getEstado()
            const datosPdf = prepararDatosPdf.prepararDatosParaComprobanteVacunacion(paciente, solicitud);
            pdfConversor.pasarAPdf(
              "Datos de la vacunacion:",
              nombrePdf,
              datosPdf
            );

            await emailComprobante.sendEmailWithAttachment(paciente.email, nombrePdf, pdfConversor.getRutaPdfs()+'/'+nombrePdf+'.pdf')

            return solicitud
          } else{
            throw crearErrorDatosInvalidos('solicitud en estado erroneo')
          }

        } else{
          throw crearErrorDniInexistente('paciente inexistente')
        }


    },
  };
}
export { crearCasoDeUso_ConfirmacionAplicacionDeDosis };