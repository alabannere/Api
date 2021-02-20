const sql = require("./db.js");
const Functions = require("../components/Functions");
//////////////////////////////////
//MODEL
//////////////////////////////////

const Auth = function (data) {

  this.uid = Functions.UID();
  this.user = data.user;
  this.password = data.password; //Envia pass codificado desde el cliente
  this.email = data.email;
  this.lastName = data.lastName;
  this.firstName = data.firstName;

};

Auth.signUp = (userData, result) => {
  sql.query("INSERT INTO users SET ?", userData, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created customer: ", { uid: res.uid, ...userData });

    result(null, { uid: res.uid, ...userData });
  });
};



Auth.signIn = (_user, _pass, result) => {
  sql.query(`SELECT id, user, password FROM users WHERE user = "${_user}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      //El usuario existe en la base de datos
      //si existe verificamos la contraseña
      Functions.HashCompare(res[0]["password"], _pass).then((val) => {
        if (val === true) {
          result(null, { auth: true, uid: res[0]["id"] });
          console.log("El usuario esta auth ok!");
        } else {
          result(null, { auth: false, message: "La contraseña no coincide." });
          console.log("Error! la contraseña no coincide");
        }
      }).catch((err) => console.log(err));
      return;
    }
    // El nombre de usuario no existe en la base de datos
    result(null, { auth: false, message: "El usuario no existe." });
    console.log("El usuario no existe");
  }
  );
};

module.exports = Auth;
