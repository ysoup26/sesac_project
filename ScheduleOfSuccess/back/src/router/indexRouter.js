const indexController = require("../controller/indexController.js");
const {jwtMiddleware} = require("../../jwtMiddleware");

exports.indexRouter = function(app){
    app.get("/",indexController.dummy);
    //일정 CRUD API
    app.post("/todo",jwtMiddleware,indexController.createTodo) // create
    app.get("/todos",jwtMiddleware,indexController.readTodo); // read: user/1/todos>>특정 유저의 todos를 보려고함
    app.patch("/todo",jwtMiddleware,indexController.updateTodo); // update
    app.delete("/todo/:todoIdx",jwtMiddleware,indexController.deleteTodo); // delete: user/1/todo/1 유저1의 투두1 삭제
};