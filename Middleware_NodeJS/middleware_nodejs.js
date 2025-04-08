import express from 'express';
//la línea de abajo sive para poder conectar el servidor de node con html
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url))

import { registrarTurnos, atenderTurnosById, aplicarValidaciones, aplicarValidacionesById, borrarTurno } from './queryInfo';
const app = express();
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running port ${port}`);
})


app.get('/', (req, res ) => res.sendFile (__dirname + "/index.html"));
app.use(express.json());

app.post('/turnos/: nombre, edad, tipo', registrarTurnos);
app.get('/turnos/: tipoSolicitud', atenderTurnosById);
app.post('/turnos', aplicarValidaciones)
app.put('/turnos/: tipoSolicitud', aplicarValidacionesById)
app.delete('/turnos/: alreadyAssisted', borrarTurno);