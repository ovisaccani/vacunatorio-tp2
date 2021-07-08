//Hecho por: Ovidio Saccani
function CrearPreparadorDeDatosParaPdf(){ 
    return {
            prepararDatos(paciente, turno){
                const datos = [
                    "Nombre : " + paciente.nombre,
                    "Apellido : " + paciente.apellido,
                    "Dni : " + paciente.dni,
                    "Fecha : " + turno.fecha,
                    "Lugar : " + turno.lugarVac,
                    "Tipo Vacuna: " + turno.tipoVacuna]
                return datos
            },
            prepararDatosParaComprobanteVacunacion(paciente, solicitud){
                let turno = solicitud.getTurno()
                const fecha = solicitud.getEstado() ==='VACUNADO_PRIMERA_DOSIS'? turno.fecha : 'Felicidades! Terminaste el proceso de vacunacion'
                const datos = [
                    "Nombre : " + paciente.nombre,
                    "Apellido : " + paciente.apellido,
                    "Dni : " + paciente.dni,
                    "Fecha proxima vacunacion : " + fecha,
                    "Lugar : " + turno.lugarVac,
                    "Tipo Vacuna: " + turno.tipoVacuna,
                    "Dosis Aplicada" + solicitud.getUltimaDosisAplicada()]
                return datos
            }
    }
}
export { CrearPreparadorDeDatosParaPdf }