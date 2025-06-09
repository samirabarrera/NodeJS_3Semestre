import express from 'express';
import bodyParser from 'body-parser'

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//VIP = 1, Prioritario = 2, General = 3
const Tipos = {
    VIP: 1,
    PRIORITARIO: 2,
    GENERAL: 3
}

//Crear arrays 
const vipArray = [];
const priorityArray = [];
const generalArray = [];

const isValidRequest = (req) => {
    const palabraClave = req.headers["palabraClave"];
    const {tipo, edad} = req.params;
    const tipoInt = parseInt(tipo)
    return tipoInt == Tipos.VIP && palabraClave === "VIP123" ||
    (tipoInt == Tipos.PRIORITARIO && edad > 60) ||
    (Tipos.GENERAL)
}

const middlewareType = (req, res, next) => {
  if (!isValidRequest(req))
    return res.status(400).json({
      error: "El turno no cumple con los requisitos. Intenta de nuevo"
    });

  next();
}

//Crear Endpoint de /turno
const crearTurno = (req, res) => {
    const { tipo, edad, nombre } = req.params;
    console.log(`Creando turno para ${nombre}, tipo ${tipo}, edad ${edad}`);

    const tipoParam = parseInt(tipo)

// Se debe agregar el turno a la cola (arreglo) correspondiente:
if (tipoParam === Tipos.GENERAL) generalArray.push({nombre,tipo,edad})
    else if (tipoParam === Tipos.PRIORITARIO) priorityArray.push({nombre,tipo,edad})
    else if (tipoParam === Tipos.VIP) vipArray.push({nombre,tipo,edad})

    console.log("ordenes agendadas: ",Tipos.VIP);
    console.log(generalArray);
    console.log(priorityArray);
    console.log(vipArray);

    res.status(201).json({ message: `Turno creado para ${nombre}` });
}

app.post('/turno/:tipo/:edad/:nombre', middlewareType, crearTurno);

//Crear Enpoint de /atender
const buscarTurno = (req,res) => {
    if (vipArray.length > 0){
        console.log('Turno VIP ')
        const turnoVip = vipArray.shift();
        res.send(`Atendiendo turno VIP: ${turnoVip.nombre}`)
    } else if (priorityArray.length > 0) {
        console.log('Turno prioritario')
        const turnoPriority = priorityArray.shift();
        priorityArray.shift();
        res.send(`Atendiendo turno prioritario: ${turnoPriority.nombre}`)
    } else if (generalArray.length > 0) {
        console.log('Turno general')
        const turnoGeneral = generalArray.shift();
        generalArray.shift();
        res.send(`Atendiendo turno General: ${turnoGeneral.nombre}`)
    } else {
        res.send('No hay turnos')
    }
};

app.get('/atender', buscarTurno, middlewareType)

app.listen(port, () => {
    console.log(`Server is running port ${port}`);
})