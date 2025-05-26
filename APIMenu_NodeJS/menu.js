import express from 'express';
import bodyParser from 'body-parser'

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const menu = {
  entradas: [
    { id: 1, Entrada: "Deditos de pollo" },
    { id: 2, Entrada: "Papas fritas" },
  ],
  platoFuerte: [
    { id: 3, platoFuerte: "Pizza" },
    { id: 4, platoFuerte: "Hamburguesa" },
  ],
  postres: [
    { id: 5, Postre: "Pastel de chocolate" },
    { id: 6, Postre: "Tiramisú" },
  ],
  bebidas: [
    { id: 7, Bebida: "Jugo natural" },
    { id: 8, Bebida: "Gaseosa" },
  ]
};

// Rutas GET
app.get('/entradas', (req, res) => {
  res.json(menu.entradas);
});

app.get('/platoFuerte', (req, res) => {
  res.json(menu.platoFuerte);
});

app.get('/postres', (req, res) => {
  res.json(menu.postres);
});

app.get('/bebidas', (req, res) => {
  res.json(menu.bebidas);
});


// Ruta dinámica por categoría
app.get('/menu/:categoria', (req, res, next) => {
  const categoria = req.params.categoria;
  const items = menu[categoria];

  if (!items) {
    return res.status(404).json({ error: "Categoría no encontrada" });
  }
  res.json(items);
});

app.get('/item/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let platoEncontrado = null;

  for (const categoria in menu) {
    platoEncontrado = menu[categoria].find(item => item.id === id);
    if (platoEncontrado) break;
  }

  if (!platoEncontrado) {
    return res.status(404).json({ error: "Item no encontrado" });
  }
  res.json(platoEncontrado);
});


app.listen(port, () => {
    console.log(`Server is running port ${port}`);
})