//Hecho por: Ovidio Saccani
import { crearErrorDniInexistente } from "../../../compartido/errores/ErrorDniInexistente.js";
import { crearErrorDatosInvalidos } from "../../../compartido/errores/ErrorDatosInvalidos.js";
import { crearTurno } from "../../Modelos/Turno.js";

function crearConfirmadorDeTurno(
  pdfer,
  mailer,
  daoSolicitudes,
  preparadorDatosParaPdf
) {
  return {
    confirmarPaciente: async (body) => {
      const dni = body.dni;
      const { solicitud, found } = await daoSolicitudes.getByDni(dni);

      if (found === 0) {
        throw crearErrorDniInexistente("No existe el paciente");
      } else {
        if (solicitud.getEstado() === "CONFIRMACION_DE_VACUNACION_PENDIENTE") {
          const turno = crearTurno(body);
          solicitud.confirmarTurno()

          //agrego los datos del turno
          solicitud.establecerTurno(turno);
          const paciente = solicitud.getPaciente();
      
          await daoSolicitudes.update(solicitud);
          //hago el esquema de datos para el pdf
          const datos = preparadorDatosParaPdf.prepararDatos(paciente, turno);

          //le mando al pdfer el titulo del pdf, el nombre del archivo, y los datos
          const nombrePdf = paciente.nombre + "" + paciente.apellido;

          //el titulo del pdf no lo envio por parametro porque el titulo de la confirmacion va a ser estatico
          pdfer.pasarAPdf("Datos de la vacunacion:", nombrePdf, datos);
          const nombreArchivo = nombrePdf + ".pdf";

          const rutaPdfs = pdfer.getRutaPdfs();
          const email = solicitud.getEmail();
          await mailer.sendEmailWithAttachment(email, nombreArchivo, rutaPdfs + "/" + nombreArchivo);
        } else {
          throw crearErrorDatosInvalidos(
            "paciente con solicitud ya confirmada"
          );
        }
      }
    },
  };
}
export { crearConfirmadorDeTurno };