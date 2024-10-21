const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db.config');
const app = express();

// Configuraciones básicas
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Motor de plantillas EJS
app.set('view engine', 'ejs');

// Ruta principal: Lista de productos
app.get('/', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.render('index', { products: results });
  });
});

// Crear producto
app.post('/product', (req, res) => {
  const { name, category, price } = req.body;
  const query = 'INSERT INTO products (name, category, price) VALUES (?, ?, ?)';
  db.query(query, [name, category, price], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Actualizar producto
app.post('/update/:id', (req, res) => {
  const { name, category, price } = req.body;
  const query = 'UPDATE products SET name = ?, category = ?, price = ? WHERE id = ?';
  db.query(query, [name, category, price, req.params.id], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Borrar producto
app.get('/delete/:id', (req, res) => {
  const query = 'DELETE FROM products WHERE id = ?';
  db.query(query, [req.params.id], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Servidor en puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
