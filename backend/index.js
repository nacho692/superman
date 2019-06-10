var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
const {OAuth2Client} = require('google-auth-library');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

CATEGORIES = [
    { name: "Bar", id: 1, description: "Papitas y alcohol", should_show: true },
    { name: "Teatro", id: 2, description: "Papitas y gente que actúa", should_show: true },
    { name: "Espacio cultural", id: 3, description: "Hippies", should_show: true },
    { name: "Cine", id: 4, description: "Peliculas y pochocolos", should_show: false },
    { name: "Museo", id: 5, description: "Huesos de dinosaurios", should_show: true }
];

POIS = [{
        id: 1,
        name: "La Birreria",
        description: "Tienen un arcade con windjammers +10",
        latitude: -34.556578,
        longitude: -58.452443,
        categories: [CATEGORIES[0], CATEGORIES[1]],
        image_url: "",
        should_show: true
    },
    {
        id: 2,
        name: "El gato y la caja negra y la luna y los gatos",
        description: "Buenos chorizos",
        latitude: -34.561637,
        longitude: -58.463049,
        categories: [CATEGORIES[0]],
        image_url: "https://i.imgur.com/H37kxPH.jpg",
        should_show: true
    },
    {
        id: 3,
        name: "On Tap",
        description: "Me gustan los condimentos",
        latitude: -34.583137,
        longitude: -58.433931,
        categories: [CATEGORIES[0]],
        image_url: "",
        should_show: true
    },
    {
        id: 4,
        name: "Museo de ciencias naturales",
        description: "Buenos dinosaurios",
        latitude: -34.605045,
        longitude: -58.437525,
        categories: [CATEGORIES[4]],
        image_url: "",
        should_show: true
    },
    {
        id: 5,
        name: "Sala de reuniones",
        description: "Buenas cervezas",
        latitude: -34.590815,
        longitude: -58.427522,
        categories: [CATEGORIES[4]],
        image_url: "",
        should_show: false
    }
];

PROPOSED_CATEGORIES = [{ "id": 0, "name": "Lugares Oscuros", "description": "Donde no se ve nada y la magia está en el aire" },
    { "id": 1, "name": "Cat Propuesta", "description": "Una categoria propuesta nueva" }
];

app.all('/*', function(req, res) {
    if (req.header("caller") == "admin") {
        verify(req.header("token"));
    } else {
        res.status(404);
    }
    req.next();
});

app.get('/categories', function(req, res) {
    let isAdminCalling = req.header("caller") == "admin";
    console.log("retrieving categories: admin " + isAdminCalling);
    res.json(CATEGORIES.filter(c => {
        if (!isAdminCalling) {
            return c.should_show;
        } else {
            return true;
        }
    }));
});


app.get('/proposed_categories', function(req, res) {
    console.log("get proposed categories");
    res.json(PROPOSED_CATEGORIES);
});

app.post('/proposed_categories', function(req, res) {
    console.log("new proposed category")
    let proposed_category = req.body;

    new_proposed_category = {
        id: PROPOSED_CATEGORIES.length,
        name: proposed_category.name,
        description: proposed_category.description,
    };

    PROPOSED_CATEGORIES.push(new_proposed_category);

    res.json(new_proposed_category);
});


app.delete('/proposed_categories/:id', function(req, res) {
    console.log("deleting proposed category " + req.params.id)
    PROPOSED_CATEGORIES = PROPOSED_CATEGORIES.filter(
        pc => pc.id != req.params.id
    );
    res.sendStatus(200);
});

app.post('/categories', function(req, res) {
    console.log(req.body);
    let accepted_category = req.body;

    PROPOSED_CATEGORIES = PROPOSED_CATEGORIES.filter(
        pc => pc.id != accepted_category.id
    );

    new_category = {
        id: CATEGORIES.length + 1,
        name: accepted_category.name,
        description: accepted_category.description
    }
    CATEGORIES.push(new_category);

    res.json(new_category);
});

app.put('/categories/:id', function(req, res) {
    let id = req.params.id;
    console.log("Editing category " + id)
    category = req.body;
    category.id = parseInt(id);
    console.log(category)
    CATEGORIES = CATEGORIES.map(c => {
        if (c.id == id) {
            return category;
        } else {
            return c;
        }
    })
    res.json(CATEGORIES);
});

app.post('/points_of_interest', function(req, res) {
    console.log("Creating POI")
    console.log(req.body);
    let poi = req.body;
    let newPoi = {
        id: POIS.length + 1,
        name: poi.name,
        description: poi.description,
        latitude: poi.lat,
        longitude: poi.lng,
        categories: poi.categories.map(cat_id => CATEGORIES.find(c => c.id === cat_id)),
        image_url: poi.image_url,
        should_show: true
    }
    POIS.push(newPoi);
    res.json(newPoi);
});

app.put('/points_of_interest/:id', function(req, res) {
    let id = req.params.id;
    console.log("Editing POI " + id);
    console.log(req.body);
    let newValues = req.body;
    let editedPoint = POIS.find(p => p.id == id);
    editedPoint.name = newValues.name;
    editedPoint.description = editedPoint.description;
    editedPoint.categories = newValues.categories.map(cat_id => CATEGORIES.find(c => c.id === cat_id));
    editedPoint.image_url = newValues.image_url;
    editedPoint.should_show = newValues.should_show;

    res.json(editedPoint);
});

app.post('/points_of_interest/search', function(req, res) {
    let query = req.body.query;
    let categories = req.body.categories;
    let isAdminCalling = req.header("caller") == "admin";
    console.log("Searching POIS: admin " + isAdminCalling);

    query = query.toLowerCase();

    if (query == "" && categories.length == 0) {
        res.json([]);
        return;
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
        let shouldBeVisible;
        if (isAdminCalling) {
            shouldBeVisible = true;
        } else {
            shouldBeVisible = poi.should_show;
        }

        return searchFound && categoryFound && shouldBeVisible;
    });
    res.json(found_pois);
});


const CLIENT_ID = "68076431524-jm2vr8hf2t6t1g7k3ef84kt309l37gbm.apps.googleusercontent.com";
const googleClient = new OAuth2Client(CLIENT_ID);
function verify(token) {
  return googleClient.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
  }).then(res => {
      return res.payload.sub == "118218727106131839536";
  }
  ).catch(_ => false);  
}


app.listen(3000, function() {
    console.log("Listening on 3000!");
});
