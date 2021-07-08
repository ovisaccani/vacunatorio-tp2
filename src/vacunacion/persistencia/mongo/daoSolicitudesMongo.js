import { crearSolicitudDeTurno } from "../../modelos/SolicitudDeTurno.js";

function crearDaoSolicitudesMongo(db, lastId) {
  const dbSolicitudes = db.collection("solicitudes");

  let idSol = lastId+1;

  async function findByDni(dni) {
    return await dbSolicitudes.findOne({
      "paciente.dni": dni,
    });
  }

  return {
    addUnique: async (solicitud) => {
      const solicitudByPaciente = await findByDni(solicitud.getDniPaciente());
      if (!solicitudByPaciente) {
        solicitud.setId(idSol++) 
        await dbSolicitudes.insertOne(solicitud.getSolicitud());
        return { added: 1 };
      } else {
        return { added: 0 };
      }
    },
    getByDni: async (dni) => {
      const solicitudEncontrada = await findByDni(dni);
      const solicitud = crearSolicitudDeTurno(solicitudEncontrada);
      if (solicitud) {
        return { solicitud, found: 1 };
      } else {
        return { found: 0 };
      }
    },
    getById: async (elId) => {
      const solicitudEncontrada = await dbSolicitudes.findOne({
        id: {$eq:elId}
      });
      console.log(solicitudEncontrada);
      const solicitud = crearSolicitudDeTurno(solicitudEncontrada);
      if (solicitud) {
        return { solicitud };
      } else {
        return { found: 0 };
      }
    },
    getByEstado: async (estado) => {
      const solicitudes = await dbSolicitudes
        .find({ estado: { $eq: estado } })
        .toArray();

      if (solicitudes) {
        return { solicitudes, found: solicitudes.length };
      } else {
        return { found: 0 };
      }
    },
    update: async (solicitud) => {
      await dbSolicitudes.replaceOne(
        { id: solicitud.getId() },
        solicitud.getSolicitud()
      );
    },
    cerrar: async () => {
      await db.close();
    },
  };
}

export { crearDaoSolicitudesMongo };
