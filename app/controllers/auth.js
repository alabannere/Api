const sql = require("../models/db.js");
const Functions = require("../components/Functions");


//////////////////////////////////
//AUTH REGISTER
//////////////////////////////////
exports.signUp = (req, result) => {
  const userData = {
    email: req.body.user,
    password: req.body.password,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    type: 'user'
  };

  sql.query(`SELECT email FROM users WHERE email = "${userData.email}"`, (err, userExist) => {
    if (userExist.length) {
      result.send({ message: 'El usuario ' + userData.email + ' ya esta registrado' });
    } else {
      sql.query("INSERT INTO users SET ?", userData, (err, res) => {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
        console.log("created customer: ", { uid: res.uid, ...userData });
        result.send({ uid: res.uid, ...userData });
      });
    }
  });

};

//////////////////////////////////
//AUTH LOGIN
//////////////////////////////////
exports.signIn = (req, result) => {

  const _user = req.body.user;
  const _pass = req.body.password;

  sql.query(`SELECT uid, email, password, type FROM users WHERE email = "${_user}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result.send(err);
      return;
    }
    if (res.length) {
      //El usuario existe en la base de datos
      //si existe verificamos la contraseña
      Functions.HashCompare(res[0]["password"], _pass).then((val) => {
        if (val === true) {
          result.send({ auth: true, type: res[0]["type"], uid: res[0]["uid"] });
          console.log("El usuario esta auth ok!");
        } else {
          result.send({ auth: false, message: "La contraseña no coincide." });
          console.log("Error! la contraseña no coincide");
        }
      }).catch((err) => console.log(err));
      return;
    }
    // El nombre de usuario no existe en la base de datos
    result.send({ auth: false, message: "El usuario no existe." });
    console.log("El usuario no existe");
  }
  );

};



