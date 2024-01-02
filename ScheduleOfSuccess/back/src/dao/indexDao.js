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
            console.log(` #### insertTodoQuery Query error #####\n ${err}`);
            return false;
        }finally{
            connection.release();
        }
    } catch(err){
        console.log(` #### insertTodoQuery DB error #####\n ${err}`);
        return false;
    }
};

exports.selectTodoByType = async function(userIdx,type){
    try{
        const connection = await pool.getConnection(async (conn)=>conn);
        try{
            const selectTodoQuery = "SELECT todoIdx,contents,status FROM MyTodoDB.Todos Where userIdx = ? and type=? and not(status='D');";
            const selectTodoParams = [userIdx,type];
            const [row] = await connection.query(selectTodoQuery,selectTodoParams);

            return row;
        }catch(err){
            console.log(` #### selectTodoQuery Query error #####\n ${err}`);
            return false;
        }finally{
            connection.release();
        }
    } catch(err){
        console.log(` #### selectTodoQuery DB error #####\n ${err}`);
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
            console.log(` #### selectValidTodoQuery Query error #####\n ${err}`);
            return false;
        }finally{
            connection.release();
        }
    } catch(err){
        console.log(` #### selectValidTodoQuery DB error #####\n ${err}`);
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
            console.log(` #### updateTodoQuery Query error #####\n ${err}`);
            return false;
        }finally{
            connection.release();
        }
    } catch(err){
        console.log(` #### updateTodoQuery DB error #####\n ${err}`);
        return false;
    }
}

exports.deleteTodo = async function(userIdx,todoIdx){
    try{
        const connection = await pool.getConnection(async (conn)=>conn);
        try{
            const deleteTodoQuery = "update MyTodoDB.Todos set status = 'D' where userIdx = ? and todoIdx = ?;";
            const deleteTodoParams = [userIdx,todoIdx];
            const [row] = await connection.query(deleteTodoQuery,deleteTodoParams);

            return row;
        }catch(err){
            console.log(` #### deleteTodoQuery Query error #####\n ${err}`);
            return false;
        }finally{
            connection.release();
        }
    } catch(err){
        console.log(` #### deleteTodoQuery DB error #####\n ${err}`);
        return false;
    }
}