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