const {pool} = require("../../database");


//유저 생성

exports.insertUser = async function(email,password,nickname){
    try{
        const connection = await pool.getConnection(async (conn)=>conn);
        try{
            const insertUserQuery = "insert into MyTodoDB.Users (email, password, nickname) values (?,?,?);";
            const insertUserParams = [email,password,nickname];
            const [row] = await connection.query(insertUserQuery,insertUserParams);

            return row;
        }catch(err){
            console.log(` #### insertUserQuery Query error #####`);
            return false;
        }finally{
            connection.release();
        }
    } catch(err){
        console.log(` #### insertUserQuery DB error #####`);
        return false;
    }
};

//유저 확인
exports.selectUserByEmaii = async function(email){
    try{
        const connection = await pool.getConnection(async (conn)=>conn);
        try{
            const selectUserByEmaiiQuery = "select * from MyTodoDB.Users where email = ?;";
            const selectUserByEmaiiParams = [email];
            const [row] = await connection.query(selectUserByEmaiiQuery,selectUserByEmaiiParams);

            return row;
        }catch(err){
            console.log(` #### selectUserByEmaiiQuery Query error #####`);
            return false;
        }finally{
            connection.release();
        }
    } catch(err){
        console.log(` #### selectUserByEmaiiQuery DB error #####`);
        return false;
    }
};