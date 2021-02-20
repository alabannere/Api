const Auth = require("../models/auth.js");
//////////////////////////////////
//CONTROLLERS
//////////////////////////////////


//////////////////////////////////
//AUTH REGISTER
//////////////////////////////////
exports.signUp = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a Customer
  const userData = new Auth({
    user: req.body.user,
    password: req.body.password,
    email: req.body.email,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
  });
  // Save Customer in the database
  Auth.signUp(userData, (err, data) => {
    res.send(data);
  });
};

//////////////////////////////////
//AUTH LOGIN
//////////////////////////////////
exports.signIn = (req, res) => {
  Auth.signIn(req.body.user, req.body.password, (err, data) => {
    res.send(data);
  });
};



