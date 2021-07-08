//- Hecho por: Desiree Cadahia 
import axios from "axios";
import { getPort } from "../../../../src/config.js";

const url = `http://localhost:${getPort()}/solicitudes/vacunar/42816270`;

async function testConfirmadorVacunacion(){
    await axios.post(url).then(res => {
        console.log('testConfirmadorVacunacion: OK');
        console.log(res.status);
    }).catch(err => {
        console.log(err.response.status, err.response.data.message)
    });
}

export { testConfirmadorVacunacion }