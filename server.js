const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// parse requests of content-type - application/json 
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  require("./app/routes/routes.js")(app, req.headers.authorization);
  next();
});
//* Enabling cors for all request by usiing cors middleware
app.use(cors());

// simple route
app.get("/", (req, res) => {
  res.send('No hay permisos');
});



//set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
