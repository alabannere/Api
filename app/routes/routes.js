module.exports = (app, authorization) => {
  const Functions = require("../components/Functions");

  /////////////////////////////////////////////////////////
  //AUTH LOGIN
  /////////////////////////////////////////////////////////
  const auth = require("../controllers/auth.js");

  app.post("/auth", auth.signIn);
  app.post("/signUp", auth.signUp);

  /////////////////////////////////////////////////////////
  //PROTEGIDO
  /////////////////////////////////////////////////////////
  const categories = require("../controllers/categories.js");
  const posts = require("../controllers/posts.js");


  const ifAuth = Functions.ApiKeyIs(authorization);
  const errorApiKey = (req, res) => {
    res.send({
      url: req.url,
      message: `¡No tenes permisos!`
    });
  };


  if (ifAuth) {
    // Posts
    app.post("/posts", posts.create);
    app.get("/posts", posts.findAll);
    app.get("/posts/:id", posts.findOne);
    app.put("/posts/:id", posts.update);
    app.delete("/post/:id", posts.delete);
    app.delete("/posts", posts.deleteAll);

    // Categorias
    app.get("/categories", categories.findAll);
    app.get("/category/:id", categories.findOne);
  } else {
    app.get("*", errorApiKey);
    app.post("*", errorApiKey);
    app.put("*", errorApiKey);
    app.delete("*", errorApiKey);
  }




  //////////////////////////////////////////////////////////

};
