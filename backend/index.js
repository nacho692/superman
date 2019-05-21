var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

const CATEGORIES = [
  { name: "Bar", id: 1, description: "Papitas y alcohol"},
  { name: "Teatro", id: 2, description: "Papitas y gente que actúa"},
  { name: "Espacio cultural", id: 3, description: "Hippies"},
  { name: "Cine", id: 4, description: "Peliculas y pochocolos"},
  { name: "Museo", id: 5, description: "Huesos de dinosaurios"}
];

POIS = [
    { id: 1, name: "La Birreria", description: "Tienen un arcade con windjammers +10", latitude: -34.556578, longitude: -58.452443, categories: [CATEGORIES[0], CATEGORIES[1]] },
    { id: 2, name: "El gato y la caja negra y la luna y los gatos", description: "Buenos chorizos", latitude: -34.561637, longitude: -58.463049, categories: [CATEGORIES[0]] },
    { id: 3, name: "On Tap", description: "Me gustan los condimentos", latitude: -34.583137, longitude: -58.433931, categories: [CATEGORIES[0]] },
    { id: 4, name: "Museo de ciencias naturales", description: "Buenos dinosaurios", latitude: -34.605045, longitude: -58.437525, categories: [CATEGORIES[4]] },
    { id: 5, name: "Sala de reuniones", description: "Buenas cervezas", latitude: -34.590815, longitude: -58.427522, categories: [CATEGORIES[4]]}
];

PROPOSED_CATEGORIES = [ ];

app.get('/categories', function (req, res) {
  console.log("/categories");
  res.json(CATEGORIES);
});

app.get('/proposed_categories', function (req, res) {
  console.log("/proposed_categories");
  res.json(PROPOSED_CATEGORIES);
});

app.post('/propose_category', function (req, res) {
  console.log(req.body);
  let proposed_category = req.body;

  PROPOSED_CATEGORIES = PROPOSED_CATEGORIES.filter(
    function(category, index, arr) {
      return category.id != accepted_category.id;
    }
  );

  PROPOSED_CATEGORIES.push({
    id: PROPOSED_CATEGORIES.length,
    name: proposed_category.name,
    description: proposed_category.description,
  });
});


app.post('/reject_category', function (req, res) {
  console.log(req.body);
  let rejected_category = req.body;

  PROPOSED_CATEGORIES = PROPOSED_CATEGORIES.filter(
    function(category, index, arr) {
      return category.id != rejected_category.id;
    }
  );
});

app.post('/accept_category', function (req, res) {
  console.log(req.body);
  let accepted_category = req.body;

  PROPOSED_CATEGORIES = PROPOSED_CATEGORIES.filter(
    function(category, index, arr) {
      return category.id != accepted_category.id;
    }
  );

  CATEGORIES.push({
    id: CATEGORIES.length,
    name: accepted_category.name,
    description: accepted_category.description,
  });

  res.sendStatus(200)
});


app.post('/save_poi', function (req, res) {
  console.log(req.body);
  let poi = req.body;
  POIS.push({
    id: POIS.length,
    name: poi.name,
    description: poi.description,
    latitude: poi.lat,
    longitude: poi.lng,
    categories: [poi.categories.map(cat_id => CATEGORIES.find(c => c.id === cat_id))],
  });
  console.log(JSON.stringify(POIS))
  res.sendStatus(200);
});

app.post('/search_pois', function (req, res) {
  console.log(req.body);
  let query = req.body.query;
  let categories = req.body.categories;
  query = query.toLowerCase();

  if (query == "" && categories.length == 0) {
    return new Array();
  }
  
  found_pois = POIS.filter(poi => {
    let searchFound = true;
    if (query != "") {
      searchFound = poi.name.toLowerCase().search(query) >= 0;
    }
    let categoryFound = true;
    if (categories.length > 0) {
      categoryFound = poi.categories.some(poi_category => categories.includes(poi_category.id));
    }
    return searchFound && categoryFound;
  });
  res.json(found_pois);
});


app.listen(3000, function () {
  console.log("Listening on 3000!");
});