import express from 'express';
import bodyParser from 'body-parser'
import { registrarTurnos, atenderTurnosById, aplicarValidaciones, aplicarValidacionesById, borrarTurno } from './queryInfo';

const app = express();
const port = 3000;

app.use (bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true} ));

app.get('/', (req, res ) => {
    console.log("Estoy en el endpoint raiz")
    res.json({ message: "Welcome to my first API"});
});

app.post('/turnos/: nombre, edad, tipo', registrarTurnos);
app.get('/turnos/: tipoSolicitud', atenderTurnosById);
app.post('/turnos', aplicarValidaciones)
app.post('/turnos/: tipoSolicitud', aplicarValidacionesById)
app.delete('/turnos/: alreadyAssisted', borrarTurno);


app.listen(port, () => {
    console.log(`Server is running port ${port}`);
})