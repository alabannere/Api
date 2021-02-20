const sql = require("../models/db.js");



//////////////////////////////////
///GET ALL
//////////////////////////////////
exports.GETALL = (req, result) => {
  sql.query("SELECT * FROM categories", (err, items) => {
    if (err) {
      console.log("error: ", err);
      result.send(err);
      return;
    }
    items = [{ count: items.length, items }];
    result.send(items);
  });
};


//////////////////////////////////
///GET BY ID
//////////////////////////////////
exports.GETBYID = (req, result) => {
  const id = req.params.id;

  sql.query(`SELECT * FROM categories WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result.send(err);
      return;
    }
    if (res.length) {
      console.log("found: ", res[0]);
      result.send(res[0]);
      return;
    }
    // not found Customer with the id
    result.send({ kind: "not_found" }, null);
  });
};


//////////////////////////////////
///CREATE
//////////////////////////////////
exports.CREATE = (req, result) => {
  // Validate request
  if (!req.body) {
    result.status(400).send({
      message: "Content can not be empty!"
    })
  }
  // Create a Customer
  const newData = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion
  };

  sql.query("INSERT INTO categories SET ?", newData, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result.send(err);
      return;
    }
    console.log("created: ", { id: res.id, ...newData });
    result.send({ id: res.id, ...newData });
  });
};



//////////////////////////////////
///UPDATE BY ID
//////////////////////////////////
exports.UPDATE = (req, result) => {
  const data = req.body;

  // Validate Request
  if (!data) {
    result.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(data);

  sql.query(
    "UPDATE categories SET name = ?, description = ? WHERE id = ?",
    [data.name, data.description, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result.send(err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result.send({ kind: "not_found" });
        return;
      }

      console.log("updated: ", { id: id, ...data });
      result.send({ id: id, ...data });
    }
  );
};


//////////////////////////////////
///DELETE
//////////////////////////////////
exports.DELETE = (req, result) => {
  const id = req.params.id;
  sql.query("DELETE FROM categories WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result.send(err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result.send({ kind: "not_found" });
      return;
    }

    console.log("deleted id: ", id);
    result.send(res);
  });
};



//////////////////////////////////
///DELETE ALL
//////////////////////////////////
exports.deleteAll = (req, result) => {
  sql.query("DELETE FROM categories", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result.send(err);
      return;
    }
    console.log(`deleted ${res.affectedRows}`);
    result.send(res);
  });
};




