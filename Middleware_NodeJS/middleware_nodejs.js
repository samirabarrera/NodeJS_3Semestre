import express from 'express';
import { registrarTurnos, atenderTurnosById, aplicarValidaciones, aplicarValidacionesById, borrarTurno } from './queryInfo';

const app = express();
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running port ${port}`);
})

app.post('/turnos/: nombre, edad, tipo', registrarTurnos);
app.get('/turnos/: tipoSolicitud', atenderTurnosById);
app.post('/turnos', aplicarValidaciones)
app.put('/turnos/: tipoSolicitud', aplicarValidacionesById)
app.delete('/turnos/: alreadyAssisted', borrarTurno);