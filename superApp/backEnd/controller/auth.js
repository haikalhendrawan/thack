import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//1. Fungsi Login
// --cari user di database, kalo gaada catch error. Kemudian compare password hashnya pakai bcrypt.compare(req.password, db.password).
//   kalo oke lanjut buat token pakai jwt.sign({payload}, secretKey, {expiresIn}). 
//   handle accessTokennya di react pakai variable {auth}. RefreshTokennya dikirim pakai httponly cookie.
const login = async (req, res) => {
    const{username, password}=req.body;
    const q = "SELECT * FROM user WHERE username=? OR nik= ?";
    const q2 = "SELECT junction.app_id, junction.role_id, app.app_name, role.role_name FROM junction JOIN app ON junction.app_id = app.app_id JOIN role ON junction.role_id = role.role_id WHERE user_id = ?;"

    try{
        const [rows] = await pool.execute(q, [username, username]);
        const [roles] = await pool.execute(q2, [rows[0].user_id]); // [{a:xx, b:xx}, {a:xx, b:xx}]
        const hashedPassword = rows[0].password_hash;
        const match = await bcrypt.compare(password, hashedPassword);

        if(match){
            const accessToken = jwt.sign({user_id:rows[0].user_id, username: rows[0].username, nik:rows[0].nik, name:rows[0].name, role:roles},"secretKey", {expiresIn:60*30}); //generate token
            const refreshToken = jwt.sign({user_id:rows[0].user_id, username: rows[0].username, nik:rows[0].nik, name:rows[0].name, role:roles},"secretRefreshKey",{expiresIn:60*60*4});//generate refreshToken
            res.setHeader('Set-Cookie', `rToken=${refreshToken};HttpOnly`);
            res.status(200).json({
                user_id:rows[0].user_id, 
                username: rows[0].username, 
                nik:rows[0].nik, 
                name:rows[0].name, 
                accessToken,
                role:roles,
                msg:"Login Sucess"
            });
        }else{
            return res.status(401).json({errorMsg:"Invalid Password"});
        }
    }catch(error){
        console.log(error);
        if(error.rows){
            return res.status(500).json({errorMsg:"Failed to database query"});
        }else if(error.match){
            return res.status(401).json({errorMsg:"Failed to verify password using Bcrypt"});
        }else if(error.accessToken || error.refreshToken){
            return res.status(500).json({errorMsg:"Failed to generate Token using jwt.sign"});
        }else{
        return res.status(401).json({errorMsg:"Invalid Username"});
        }
    }
}


//2. Fungsi refresh Token 
// --untuk verify accessToken di Middleware, utk verify refreshToken disini. 
//Payload RefreshToken bentuknya {user_id:xxx, username: xxx, nik:xxx, name:xxx, role:[xx]} ---
const refresh = (req, res) => {  
    const refreshToken = req.cookies.rToken;
    if(!refreshToken){
        return res.status(401).json("no token")};

    try{
    jwt.verify(refreshToken, "secretRefreshKey",(err, payload)=>{
        if(err){console.log(err); res.status(401).json({errorMsg:"invalid token"})};

        const accessToken = jwt.sign({user_id:payload.user_id, username:payload.username, nik:payload.nik, name:payload.name, role:payload.role},"secretKey", {expiresIn:60*30}); //generate token
        const refreshToken = jwt.sign({user_id:payload.user_id, username:payload.username, nik:payload.nik, name:payload.name, role:payload.role},"secretRefreshKey",{expiresIn:60*60*4});//generate refreshToken
        res.cookie('refreshToken', refreshToken, {httpOnly:true});
        res.status(200).json({
            user_id:payload.user_id, 
            username: payload.username, 
            nik:payload.nik, 
            name:payload.name, 
            accessToken,
            role:payload.role,
            msg:"Token has been refreshed"
        });

    });
    }catch(error){
        console.log(error);
        return res.status(401).json({errorMsg:"something wrong when creating new token or sending it as new cookie"})
    }

}

//3. Fungsi Logout
// 
const logout = (req, res) => {
    const refreshToken = req.cookies;
    res.clearCookie('refreshToken', {httpOnly:true });
    console.log(`refresh Token Cookies ${JSON.stringify(refreshToken)} has been cleared`);
    return res.status(200).json({msg:`User logged out, refresh Token Cookies has been cleared`});
}

export {login, refresh, logout}