const mysql = require("mysql2/promise");
const {databaseSecret} = require("./secret"); //db 관련 내용

exports.pool = mysql.createPool(databaseSecret);