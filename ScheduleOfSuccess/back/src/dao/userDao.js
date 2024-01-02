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

//유저 확인-email로
exports.selectUserByEmail = async function(email){
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

//유저 확인-email과 password로 
exports.selectUser = async function(email,password){
    try{
        const connection = await pool.getConnection(async (conn)=>conn);
        try{
            const selectUserQuery = "select * from MyTodoDB.Users where email = ? and password = ?;";
            const selectUserParams = [email,password];
            const [row] = await connection.query(selectUserQuery,selectUserParams);

            return row;
        }catch(err){
            console.log(` #### selectUserQuery Query error #####`);
            return false;
        }finally{
            connection.release();
        }
    } catch(err){
        console.log(` #### selectUserQuery DB error #####`);
        return false;
    }
};

// userIdx로 닉네임 조회
exports.selectNicknameByUserIdx = async function(userIdx){
    try{
        const connection = await pool.getConnection(async (conn)=>conn);
        try{
            const selectNicknameByUserIdxQuery = "select * from MyTodoDB.Users where userIdx = ?;";
            const selectNicknameByUserIdxParams = [userIdx];
            const [row] = await connection.query(selectNicknameByUserIdxQuery,selectNicknameByUserIdxParams);

            return row;
        }catch(err){
            console.log(` #### selectUserQuery Query error #####`);
            return false;
        }finally{
            connection.release();
        }
    } catch(err){
        console.log(` #### selectUserQuery DB error #####`);
        return false;
    }
}