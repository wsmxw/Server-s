// 1
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
let items = [];
app.get("/", function(request, response){
    response.send("<h2>Привет, Октагон!</h2>");
});
//2
app.get("/static", function(request, response){
    response.send({ header: "Hello", body: "Octagon NodeJS Test" });
});
app.get("/dynamic", function(request, response) {
    const a = parseInt(request.query.a);
    const b = parseInt(request.query.b);
    const c = parseInt(request.query.c); 
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        response.send({ header: "Error" });
    } else {
        const result = (a * b * c) / 3;
        response.send({ header: "Calculated", body: result.toString() });
    }
});
app.get('/getAllItems', (req, res) => {
    res.json(items);
  });

  app.post('/updateItem', (req, res) => {
    const { id, name, desc } = req.body;
    const itemIndex = items.findIndex(item => item.id === parseInt(id));
    if (itemIndex !== -1) {
      items[itemIndex] = { id: parseInt(id), name, desc };
      res.json({ message: 'Item updated' });
    } else {
      res.json({ message: 'Item not found' });
    }
  });
  app.post('/deleteItem', (req, res) => {
    const { id } = req.body;
    items = items.filter(item => item.id !== parseInt(id));
    res.json({ message: 'Item deleted' });
  });
  app.post('/addItem', (req, res) => {
    const { name, desc } = req.body;
    const newItem = { id: items.length + 1, name, desc };
    items.push(newItem);
    res.json(newItem);
  });
  app.post('/addItem', (req, res) => {
    const { name, desc } = req.query;
  
    if (!name || !desc) {
      res.json(null);
      return;
    }
  
    connection.query('INSERT INTO Items (name, desc) VALUES (?, ?)', [name, desc], (err, results) => {
      if (err) {
        res.status(500).send('Error adding item');
      } else {
        connection.query('SELECT * FROM Items WHERE id = ?', results.insertId, (err, item) => {
          if (err) {
            res.json({});
          } else {
            res.json(item);
          }
        });
      }
    });
  });
app.listen(3000);
//3
const mysql = require("mysql2");
  
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "chatbottests",
  password: ""
});
connection.connect(function(err){
  if (err) {
    return console.error("Ошибка: " + err.message);
  }
  else{
    console.log("Подключение к серверу MySQL успешно установлено");
  }
});
connection.end(function(err) {
  if (err) {
    return console.log("Ошибка: " + err.message);
  }
  console.log("Подключение закрыто");
});