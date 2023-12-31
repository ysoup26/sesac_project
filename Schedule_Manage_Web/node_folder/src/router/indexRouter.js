const indexController = require("../controller/indexController.js");

exports.indexRouter = function(app){
    app.get("/",indexController.dummy);
    app.get("/a",indexController.a);
    app.post("/todo",indexController.createdTodo) // create
};