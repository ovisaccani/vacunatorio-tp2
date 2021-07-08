//- Hecho por: Sasha Berkowsky
import FormData from "form-data";
import fs from "fs";
import axios from "axios";


const url = `http://localhost:5000/solicitudes`;

const yo = {
    nombre: "Sasha",
    apellido: "Berkowsky",
    edad: 20,
    dni: 42816270,
    email: "s.nberkowsky@gmail.com",
    antecedentes: "nada",
    foto: fs.createReadStream("../inputs/fotoPaciente.png"),
};

function crearPacienteForm() {
    const pacienteForm = new FormData();
    for (let key in yo) {
      pacienteForm.append(key, yo[key]);
    }
    return pacienteForm;
}

async function testHabilitarPaciente(){
    const paciente = crearPacienteForm(yo)
    try{
       const {data} = await axios.post(url, paciente, {
        headers: paciente.getHeaders(),
      });
      console.log(data)
    }
    catch(err){
      console.log(err)
    }
}

export {testHabilitarPaciente}