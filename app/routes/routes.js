module.exports = (app, authorization) => {
  const Functions = require("../components/Functions");

  /////////////////////////////////////////////////////////
  //AUTH LOGIN
  /////////////////////////////////////////////////////////
  const auth = require("../controllers/auth.js");

  app.post("/auth/login", auth.signIn);
  app.post("/auth/register", auth.signUp);

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
    app.get("/posts", posts.GETALL);
    app.get("/post/:id", posts.GETBYID);
    app.post("/post/create", posts.CREATE);
    app.put("/post/update/:id", posts.UPDATE);
    app.delete("/post/delete/:id", posts.DELETE);
    //app.delete("/posts/deleteall", posts.deleteAll);

    // Categorias
    app.get("/categories", categories.GETALL);
    app.get("/category/:id", categories.GETBYID);
    app.delete("/category/delete/:id", categories.DELETE);

  } else {
    app.get("*", errorApiKey);
    app.post("*", errorApiKey);
    app.put("*", errorApiKey);
    app.delete("*", errorApiKey);
  }




  //////////////////////////////////////////////////////////

};
