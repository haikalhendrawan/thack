import mysql from "mysql2/promise";


const pool =  mysql.createPool({
    host:'localhost',
    user: 'root',
    password:'Dummypassword99',
    database:'superapp',
    connectionLimit: 20
});

console.log("connected to database");

export default pool;