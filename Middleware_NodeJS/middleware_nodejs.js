import express from 'express';
import bodyParser from 'body-parser'

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//VIP = 1, Prioritario = 2, General = 3
const tipo = [ 1, 2, 3 ]

const middlewareType = (req, res, next) => {
    const { tipo, edad, nombre } = req.params;
    const palabraClave = req.headers["palabraClave"];

    if(req.headers ["palabraClave"] === "VIP123") {
        next();
    } 
    if (tipo == 2 && req.edad > 60) {
        next ();
    }
    if (tipo == 3) {
    }
    res.status(400).json({ error: "El turno no cumple con los requisitos. Intenta de nuevo" });
}

//Crear Endpoint de /turno
const crearTurno = (req, res, next) => {
    const { tipo, edad, nombre } = req.params;
    console.log(`Creando turno para ${nombre}, tipo ${tipo}, edad ${edad}`);
    res.status(201).json({ message: `Turno creado para ${nombre}` });
}
app.post('/turnos/:tipo/:edad/:nombre', middlewareType, crearTurno);

//Crear Enpoint de /atender
//Crear arrays 
const vipArray = [];
const priorityArray = [];
const generalArray = [];

const buscarTurno = () => {
    const tipoTurno = req.params.body;

    if (vipArray.length > 0){
        tipoTurno = vipArray.shift();
        res.send('Atendiendo turno VIP')
        console.log('Turno VIP')
    } else if (priorityArray.length > 0) {
        tipoTurno = priorityArray.shift();
        res.send('Atendiendo turno prioritario')
        console.log('Turno prioritario')
    } else if (generalArray.length > 0) {
        tipoTurno = generalArray.shift();
        res.send('Atendiendo turno general')
        console.log('Turno general')
    } else {
        res.send('No hay turnos')
        console.log('No hay turnos en espera')
    }
};

const validarTurno = (req, res) => {
    const { tipoTurno } = req;
    res.json ({message: `Atendiendo el turno de ${turno.nombre}, edad: ${turno.edad}, turno: ${turno.tipoTurno}`})
}
app.get('/atender/:tipo/', buscarTurno, validarTurno)

app.listen(port, () => {
    console.log(`Server is running port ${port}`);
})