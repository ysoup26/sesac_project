const indexDao = require("../dao/indexDao");

exports.dummy = function(req,res){
    return res.send("it works");
};

exports.a = function(req,res){
    return res.send("AAA");
};

exports.createdTodo = async function(req,res){
    const {userIdx,contents,type} = req.body;

    if(!userIdx || !contents ||!type){
        return res.send({
            isSuccess: false,
            code: 404,
            message: "입력값이 누락됐습니다.",
        });
    }
    // contents 20글자 초과 불가
    if(contents.length > 20){
        return res.send({
            isSuccess: false,
            code: 404,
            message: "contents는 20글자 이하로 설정해주세요.",
        });
    }

    //type: do, decide, delete, delegate
    const ValidTypes = ["do", "decide", "delete", "delegate"];
    if(!ValidTypes.includes(type)){
        return res.send({
            isSuccess: false,
            code: 404,
            message: "유효한 타입이 아닙니다.",
        });
    }
    const insertTodoRow = await indexDao.insertTodo(userIdx,contents,type);
    if(!insertTodoRow){
        return res.send({
            isSuccess: false,
            code: 404,
            message: "요청에 실패했습니다. 관리자에게 문의해주세요.",
        });
    }
};

exports.readTodo = async function (req,res){
    const {userIdx} = req.params;

    const todos = {};
    const types = ["do","decide","delegate","delete"];
    for(let type of types){
        let selectTodoByTypeRows = await indexDao.selectTodoByType(userIdx,type);
        if(!selectTodoByTypeRows){
            return res.send({
                isSuccess: false,
                code: 404,
                message: "일정 조회 실패. 관리자에게 문의해주세요.",
            });
        }
        
        todos[type] = selectTodoByTypeRows;
    }
    return res.send({
        result: todos,
        isSuccess: false,
        code: 200,
        message: "일정 조회 성공.",
    });
}

exports.updateTodo = async function(req,res){
    let {userIdx,todoIdx,contents,status} = req.body;
    if(!userIdx || !todoIdx){
        return res.send({
            isSuccess: false,
            code: 404,
            message: "userIdx와 todoIdx를 보내주세요.",
        });
    }
    if(!contents ){
        contents = null;
    }
    if(!status ){
        contents = null;
    }

    //user와 todo가 존재하는지, 업데이트 전 확인
    const isValidTodoRow = await indexDao.selectValidTodo(userIdx,todoIdx);
    if(isValidTodoRow.length < 1){
        return res.send({
            isSuccess: false,
            code: 404,
            message: "유효한 요청이 아닙니다. userIdx와 todoIdx를 확인하세요.",
        });
    }
    const updateTodoRow = await indexDao.updateTodo(userIdx,todoIdx,contents,status);
    return res.send({
        isSuccess: false,
        code: 200,
        message: "수정 성공.",
    });
}