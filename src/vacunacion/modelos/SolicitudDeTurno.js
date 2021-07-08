//Hecho por: Sasha Berkowsky
import { crearPaciente } from "./Paciente.js";
import { crearTurno } from "./Turno.js";
import { crearFechaHelper } from "../../compartido/fechaHelper/fechaHelper.js";

const fechaHelper = crearFechaHelper();

const estadosDeSolicitud = [
  "CONFIRMACION_DE_VACUNACION_PENDIENTE",
  "CONFIRMADO_PARA_VACUNARSE",
  "VACUNADO_PRIMERA_DOSIS",
  "VACUNADO_SEGUNDA_DOSIS",
  "VACUNACION_COMPLETA",
];

let idSolicitud = 0;

function crearSolicitudDeTurno(datos) {
  const solicitud = {};
  let paciente;
  let turno;
  let estado;
  let id;

  if (datos.paciente) {
    paciente = crearPaciente(datos.paciente);
  } else {
    paciente = crearPaciente(datos);
  }

  if (!datos.turno || datos.turno ==null) {
    turno = null;
  } else {
    turno = crearTurno(datos.turno);
  }

  if (!datos.estado) {
    estado = "CONFIRMACION_DE_VACUNACION_PENDIENTE";
  } else {
    const esEstadoValido = estadosDeSolicitud.some((e) => {
      return e === datos.estado;
    });
    if (!esEstadoValido) {
      throw new Error("estado de solicitud invalido");
    }
    estado = datos.estado;
  }

  if (!datos.id) {
    id = idSolicitud++;
  } else {
    id = datos.id;
  }

  solicitud.getPaciente = () => {
    return paciente;
  };

  solicitud.getDniPaciente= ()=>{
    return paciente.dni
  }

  solicitud.getTurno = () => {
    return turno;
  };

  solicitud.getEstado = () => {
    return estado;
  };

  solicitud.getId = () => {
    return id;
  };

  solicitud.setId=(newId)=>{
    id=newId
  }

  solicitud.getSolicitud = () => {
    return { turno, paciente, id, estado };
  };

  solicitud.actualizarSolicitudDeTurno = () => {
    if (estado == "CONFIRMADO_PARA_VACUNARSE") {
      estado = "VACUNADO_PRIMERA_DOSIS";
      turno.fecha = fechaHelper.sumarDias(30, turno.fecha);
    } else if (estado == "VACUNADO_PRIMERA_DOSIS") {
      estado = "VACUNADO_SEGUNDA_DOSIS";
      turno.fecha = null;
    }
  };

  solicitud.getFecha = () => {
    return turno.fecha;
  };
  solicitud.confirmarTurno = () => {
    estado = "CONFIRMADO_PARA_VACUNARSE";
  }

  solicitud.establecerTurno = (newturno) => {
    turno = newturno;
  }
  solicitud.getEmail = () => {
    return paciente.email;
  }

  solicitud.getUltimaDosisAplicada = () => {
    let dosis = "Todavia no recibio ninguna dosis";
    if (estado == "VACUNADO_PRIMERA_DOSIS") {
      dosis = "1° Dosis";
    } else if (estado == "VACUNADO_SEGUNDA_DOSIS") {
      dosis = "2° Dosis";
    }
    return dosis;
  };

  return solicitud;
}

export { crearSolicitudDeTurno };
