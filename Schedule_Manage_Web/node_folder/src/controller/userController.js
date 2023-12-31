const userDao = require("../dao/userDao");

//회원가입
exports.signup = async function(req,res){
    const {email,password,nickname} = req.body;
    if(!email  || !password || !nickname)
    {
        return res.send({
            isSuccess: false,
            code: 404,
            message: "회원가입 입력값을 확인해주세요.",
        });
    }

    const isValidEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    //출처: https://suyou.tistory.com/150 [수유산장:티스토리]
    if(!isValidEmail.test(email))
    {
        return res.send({
            isSuccess: false,
            code: 404,
            message: "회원가입 입력값을 확인해주세요.",
        });
    }

    const isValidPassword =  /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/; //  8 ~ 20자 영문, 숫자 조합
    //출처: https://suyou.tistory.com/150 [수유산장:티스토리]
    if(!isValidPassword.test(password))
    {
        return res.send({
            isSuccess: false,
            code: 404,
            message: "비밀번호 형식을 확인해주세요. 8~20자 영문, 숫자 조합",
        });
    }

    if(nickname.length <2 || nickname.length >10)
    {
        return res.send({
            isSuccess: false,
            code: 404,
            message: "닉네임 형식을 확인해주세요. 2~10자",
        });
    }

    //중복 회원 검사
    const isDulplicatedEmail = await userDao.selectUserByEmaii(email);
    if(isDulplicatedEmail.length > 0){
        return res.send({
        isSuccess: false,
        code: 404,
        message: "이미 가입된 회원입니다.",
    });}

    //DB 입력
    const insertUserRow = await userDao.insertUser(email,password,nickname);
    if(!insertUserRow){
        return res.send({
        isSuccess: false,
        code: 404,
        message: "회원가입 실패. 관리자에게 문의해주세요.",
    })};

    return res.send({
        isSuccess: true,
        code: 200,
        message: "회원가입 성공.",
    });
};

