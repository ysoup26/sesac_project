const userController = require("../controller/userController.js");
const {jwtMiddleware} = require("../../jwtMiddleware");

exports.userRouter = function(app){
    //회원가입 API 
    app.post("/user",userController.signup);

    //로그인 API
    app.post("/sign-in",userController.signin);

    //jwt 검증 API
    app.get("/jwt",jwtMiddleware,userController.getNicknameByToken);
};