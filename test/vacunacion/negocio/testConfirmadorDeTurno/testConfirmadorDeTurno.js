//Hecho por: Ovidio Saccani
import axios from "axios";


const parametrosCorrectos = {
    "dni" : 42816270,
    "fecha" : "29-06-2021", 
    "lugarVac" : "Sede centro", 
    "tipoVacuna" : "sputnik-v"
}

const url = "http://localhost:5000/solicitudes/"

async function testConfirmadorDeTurno(){
    try{
        const {data} = await axios.patch(url, parametrosCorrectos);
      console.log(data)
    }
    catch(err){
      console.log(err)
    }
}

export {testConfirmadorDeTurno}
