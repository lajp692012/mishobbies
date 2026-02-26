import express from 'express'
import fs from 'fs'
import bodyParser from 'body-parser';
import { dirname , join } from 'node:path';
import { fileURLToPath } from 'node:url';{}
import indexRouters from './routes/index.js'


const app = express()

const DATA_FILE = 'data.json';

const __dirname = dirname(fileURLToPath(import.meta.url))

app.set('views',join(__dirname, 'views'))
app.set('view engine','ejs')

app.use(bodyParser.json());
app.use(indexRouters)

app.use(express.static(join(__dirname, 'public')))


// Ruta para registrar datos
app.post('/registrar', (req, res) => {
  const newData = req.body;

  // Leer archivo existente
  let data = [];
  if (fs.existsSync(DATA_FILE)) {
    data = JSON.parse(fs.readFileSync(DATA_FILE));
  }

  // Agregar nuevo registro
  data.push(newData);

  // Guardar en archivo
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  res.json({ message: 'Datos registrados correctamente' });
});

// Ruta para visualizar datos
app.get('/data', (req, res) => {
  if (fs.existsSync(DATA_FILE)) {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(data);
  } else {
    res.json([]);
  }
});

app.listen(3000)

console.log('Servidor está escuchando', 3000)