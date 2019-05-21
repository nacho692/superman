var express = require('express');
var app = express();

categories = [
    { name: "Bar", id: 1, description: "Papitas y alcohol"},
    { name: "Teatro", id: 2, description: "Papitas y gente que actúa"},
    { name: "Espacio cultural", id: 3, description: "Hippies"},
    { name: "Cine", id: 4, description: "Peliculas y pochocolos"},
    { name: "Museo", id: 5, description: "Huesos de dinosaurios"}
];

proposed_categories = [ ];

app.get('/categories', function (req, res) {
  res.json(categories);
});

app.get('/proposd_categories', function (req, res) {
    res.json(proposed_categories);
});

app.listen(3000, function () {
});