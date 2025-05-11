import express, { json } from 'express';
import bodyParser from 'body-parser'

const app = express();
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running port ${port}`);
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


/*app.get('/', (req, res, next)=> {
    console.log("Estoy en el Endpoint raiz")
    res.json({message: "Welcome to the API"});
})*/

//VIP = 1, Prioritario = 2, General = 3
const tipo = [ 1, 2, 3 ]

const middlewareType = (req, res, next) => {
    const { tipo, edad, nombre } = req.params;
    const palabraClave = req.headers.palabraClave;

    if(tipo == 1 && req.headers.palabraClave == "VIP123") {
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


const buscarArrayVIP = () => {
    const tipo = req.params.tipo;

    if (vipArray.length > 0) return vipArray;
    if (priorityArray.length > 0) return priorityArray;
    if (generalArray.length > 0) return generalArray;
};

const validarTurno = (req, res) => {
    const { turno } = req;
    res.json ({message: `Atendiendo el turno de ${turno.nombre}, edad: ${turno.edad}, turno: ${turno.turno}`})
}
app.get('/atender/:tipo/', buscarArrayVIP, validarTurno)