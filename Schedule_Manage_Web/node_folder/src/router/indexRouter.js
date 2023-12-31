const indexController = require("../controller/indexController.js");
const {jwtMiddleware} = require("../../jwtMiddleware");

exports.indexRouter = function(app){
    app.get("/",indexController.dummy);
    app.get(
        "/dummy",
        function (req, res, next) {
          console.log(1);
          next();
        },
        function (req, res, next) {
          console.log(2);
          next();
        },
        function (req, res) {
          console.log(3);
        }
      );
    //일정 CRUD API
    app.post("/todo",jwtMiddleware,indexController.createdTodo) // create
    app.get("/user/:userIdx/todos",indexController.readTodo); // read: user/1/todos>>특정 유저의 todos를 보려고함
    app.patch("/todo",indexController.updateTodo); // update
    app.delete("/user/:userIdx/todo/:todoIdx",indexController.deleteTodo); // delete: user/1/todo/1 유저1의 투두1 삭제
};