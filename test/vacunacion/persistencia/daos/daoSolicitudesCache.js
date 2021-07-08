// Hecho por: Nicolas Pacheco
const solicitudesdb = [
    {
     paciente:{
       nombre:"Kiera",
       apellido:"Beatty",
       dni:20374554,
       edad:54,
       email:"test.proyecto.facu@gmail.com",
       antecedentes:"no tiene ningun antecedente",
       foto:"laFoto.png",
       filePath:"./uploads/laFoto.png",
       type:"image/png",
       root:"./uploads"
     },
     turno:{
       "fecha":"29-06-2021",
       "lugarVac":"Movistar Arena",
       "tipoVacuna":"Sputnik-V"
     },
     estado:"CONFIRMADO_PARA_VACUNARSE",
     id:2,
   },
   {
     paciente: {
       nombre: 'Sasha',
       apellido: 'Berkowsky',
       email:"test.proyecto.facu@gmail.com",
       antecedentes: 'nada',
       foto: {
         fileName: '42816270 - Berkowsky Sasha.png',
         filePath: './uploads/42816270 - Berkowsky Sasha.png',
         root: './uploads'
       },
       edad: 20,
       dni: 42816270
     },
     turno: {
       "fecha":"29-06-2021",
       "lugarVac":"Movistar Arena",
       "tipoVacuna":"Sputnik-V"
     },
     estado: "VACUNADO_PRIMERA_DOSIS",
     id: 0
   },
   {
     paciente: {
       nombre: 'JosÃ©',
       apellido: 'Pacheco',
       email:"test.proyecto.facu@gmail.com",
       antecedentes: 'nada',
       foto: {
         fileName: '42816270 - Berkowsky Sasha.png',
         filePath: './uploads/42816270 - Berkowsky Sasha.png',
         root: './uploads'
       },
       edad: 20,
       dni: 123123123
     },
    turno: {
        "fecha":"29-06-2021",
        "lugarVac":"Movistar Arena",
        "tipoVacuna":"Sputnik-V"
      },
     estado: "VACUNADO_SEGUNDA_DOSIS",
     id: 1
   },
   {
   paciente: {
    nombre: 'Soledad',
    apellido: 'Insua',
    email:"test.proyecto.facu@gmail.com",
    antecedentes: 'nada',
    foto: {
      fileName: '42816270 - Berkowsky Sasha.png',
      filePath: './uploads/42816270 - Berkowsky Sasha.png',
      root: './uploads'
    },
    edad: 20,
    dni: 123123123
  },
 turno: {
     "fecha":"29-06-2021",
     "lugarVac":"Movistar Arena",
     "tipoVacuna":"Sputnik-V"
   },
  estado: "CONFIRMACION_DE_VACUNACION_PENDIENTE",
  id: 1
}
 ];


 function crearDaoSolicitudesCache(){
    return{
        getByEstado:(estado) => {
            const solicitudes = solicitudesdb.filter((solicitud)=>solicitud.estado == estado);
            if (solicitudes) {
              return { solicitudes, found: solicitudes.length };
            } else {
              return { found: 0 };
            }
          },
    }
 }

 export{
     crearDaoSolicitudesCache,
 }