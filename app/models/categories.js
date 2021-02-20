const sql = require("./db.js");
//////////////////////////////////
//MODEL
//////////////////////////////////


// constructor
const Categories = function (data) {
  this.id = data.id;
  this.category = data.category;
};

Categories.create = (newData, result) => {
  sql.query("INSERT INTO categories SET ?", newData, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created: ", { id: res.id, ...newData });
    result(null, { id: res.id, ...newData });
  });
};

Categories.findById = (id, result) => {

  sql.query(`SELECT * FROM categories WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Categories.getAll = result => {

  sql.query("SELECT * FROM categories", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("res: ", res);
    result(null, res);
  });
};

Categories.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE categories SET email = ?, name = ?, active = ? WHERE id = ?",
    [customer.email, customer.name, customer.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

Categories.remove = (id, result) => {
  sql.query("DELETE FROM categories WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted id: ", id);
    result(null, res);
  });
};

Categories.removeAll = result => {
  sql.query("DELETE FROM categories", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows}`);
    result(null, res);
  });
};

module.exports = Categories;
