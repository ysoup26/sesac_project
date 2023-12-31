const {pool} = require("../../database");

exports.getUserRows = async function() {
    try{
        const connection = await pool.getConnection(async (conn)=>conn);
        try{
            const selectUserQuery = "SELECT * FROM Users";
            
            const [row] = await connection.query(selectUserQuery);

            return row;
        }catch(err){
            console.log(` #### getUserRows Query error #####`);
            return false;
        }finally{
            connection.release();
        }
    } catch(err){
        console.log(` #### getUserRows DB error #####`);
        return false;
    }
}

exports.insertTodo = async function(userIdx,contents,type){
    try{
        const connection = await pool.getConnection(async (conn)=>conn);
        try{
            const insertTodoQuery = "insert into Todos (userIdx,contents,type) value (?,?,?);";
            const insertTodoParams = [userIdx,contents,type];
            const [row] = await connection.query(insertTodoQuery,insertTodoParams);

            return row;
        }catch(err){
            console.log(` #### getUserRows Query error #####\n ${err}`);
            return false;
        }finally{
            connection.release();
        }
    } catch(err){
        console.log(` #### getUserRows DB error #####\n ${err}`);
        return false;
    }
};

exports.selectTodoByType = async function(userIdx,type){
    try{
        const connection = await pool.getConnection(async (conn)=>conn);
        try{
            const insertTodoQuery = "SELECT todoIdx,contents FROM MyTodoDB.Todos Where userIdx = ? and type=? and and not(status='D');";
            const insertTodoParams = [userIdx,type];
            const [row] = await connection.query(insertTodoQuery,insertTodoParams);

            return row;
        }catch(err){
            console.log(` #### getUserRows Query error #####\n ${err}`);
            return false;
        }finally{
            connection.release();
        }
    } catch(err){
        console.log(` #### getUserRows DB error #####\n ${err}`);
        return false;
    }
}

exports.selectValidTodo = async function(userIdx,todoIdx){
    try{
        const connection = await pool.getConnection(async (conn)=>conn);
        try{
            const selectValidTodoQuery = "SELECT * FROM MyTodoDB.Todos Where userIdx = ? and todoIdx = ? and not(status='D');";
            const selectValidTodoParams = [userIdx,todoIdx];
            const [row] = await connection.query(selectValidTodoQuery,selectValidTodoParams);

            return row;
        }catch(err){
            console.log(` #### getUserRows Query error #####\n ${err}`);
            return false;
        }finally{
            connection.release();
        }
    } catch(err){
        console.log(` #### getUserRows DB error #####\n ${err}`);
        return false;
    }
}

exports.updateTodo = async function(userIdx,todoIdx,contents,status){
    try{
        const connection = await pool.getConnection(async (conn)=>conn);
        try{
            const updateTodoQuery = "update MyTodoDB.Todos set contents = ifnull(?,contents) , status = ifnull(?,status) where userIdx = ? and todoIdx = ?;";
            const updateTodoParams = [contents,status,userIdx,todoIdx];
            const [row] = await connection.query(updateTodoQuery,updateTodoParams);

            return row;
        }catch(err){
            console.log(` #### getUserRows Query error #####\n ${err}`);
            return false;
        }finally{
            connection.release();
        }
    } catch(err){
        console.log(` #### getUserRows DB error #####\n ${err}`);
        return false;
    }
}