var express = require('express');
var app = express();

categories = [
  { name: "Bar", id: 1, description: "Papitas y alcohol"},
  { name: "Teatro", id: 2, description: "Papitas y gente que actúa"},
  { name: "Espacio cultural", id: 3, description: "Hippies"},
  { name: "Cine", id: 4, description: "Peliculas y pochocolos"},
  { name: "Museo", id: 5, description: "Huesos de dinosaurios"}
];

pois = [
    { id: 1, name: "La Birreria", description: "Tienen un arcade con windjammers +10", latitude: -34.556578, longitude: -58.452443, categories: [categories[0], categories[1]] },
    { id: 2, name: "El gato y la caja negra y la luna y los gatos", description: "Buenos chorizos", latitude: -34.561637, longitude: -58.463049, categories: [categories[0]] },
    { id: 3, name: "On Tap", description: "Me gustan los condimentos", latitude: -34.583137, longitude: -58.433931, categories: [categories[0]] },
    { id: 4, name: "Museo de ciencias naturales", description: "Buenos dinosaurios", latitude: -34.605045, longitude: -58.437525, categories: [categories[4]] },
    { id: 5, name: "Sala de reuniones", description: "Buenas cervezas", latitude: -34.590815, longitude: -58.427522, categories: [categories[4]]}
];

proposed_categories = [ ];

app.get('/categories', function (req, res) {
 res.json(categories);
});

app.get('/proposd_categories', function (req, res) {
  res.json(proposed_categories);
});

app.post('/propose_category', function (req, res) {
  let proposed_category = req.body;

  proposed_categories = proposed_categories.filter(
    function(category, index, arr) {
      return category.id != accepted_category.id;
    }
  );

  proposed_categories.push({
    id: proposed_categories.length,
    name: proposed_category.name,
    description: proposed_category.description,
  });
});


app.post('/reject_category', function (req, res) {
  let rejected_category = req.body;

  proposed_categories = proposed_categories.filter(
    function(category, index, arr) {
      return category.id != rejected_category.id;
    }
  );
});

app.post('/accept_category', function (req, res) {
  let accepted_category = req.body;

  proposed_categories = proposed_categories.filter(
    function(category, index, arr) {
      return category.id != accepted_category.id;
    }
  );

  categories.push({
    id: categories.length,
    name: accepted_category.name,
    description: accepted_category.description,
  });
});


app.post('/save_poi', function (req, res) {
  let poi = req.body;
  POIS.push({
    id: pois.length,
    name: poi.name,
    description: poi.description,
    latitude: poi.lat,
    longitude: poi.lng,
    categories: poi.categories.map(cat_id => categories.find(c => c.id == cat_id)),
  })
});

app.post('/search_pois', function (req, res) {
  let query = req.body.query;
  let categories = req.body.categories;
  query = query.toLowerCase();

  if (query == "" && categories.length == 0) {
    return new Array();
  }
  
  found_pois = pois.filter(poi => {
    let searchFound = true
    if (query != "") {
      searchFound = poi.name.toLowerCase().search(query) >= 0;
    }
    let categoryFound = true
    if (categories.length > 0) {
      categoryFound = poi.categories.some(c => categories.includes(c));
    }
    return searchFound && categoryFound;
  });
  res.json(found_pois);
});


app.listen(3000, function () {
  console.log("Listening on 3000!");
});