const indexController = require("../controller/indexController.js");

exports.indexRouter = function(app){
    app.get("/",indexController.dummy);
    app.get("/a",indexController.a);
    //일정 CRUD API
    app.post("/todo",indexController.createdTodo) // create
    app.get("/user/:userIdx/todos",indexController.readTodo); //user/1/todos>>특정 유저의 todos를 보려고함
};