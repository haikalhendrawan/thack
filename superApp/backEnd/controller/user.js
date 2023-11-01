import pool from "../config/db.js";
import bcrypt from "bcrypt";

// 1. fungsi menambahkan user ke Database, Respons dalam bentuk JSON, kalau ada errorMsg -> error
const addUser = async (req, res) => {
    const saltRound = 10;
    const {username, password, nik, name} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRound);

        if (!(username && password && nik && name)) {
            return res.status(500).json({ errorMsg: "Failed to Add User, caused by either: 1. No username, 2. No password, 3. no NIK, 4. atau No Name in form submission" });
        }

        const connection = await pool.getConnection();  
        await connection.beginTransaction();  // krn ada beberapa query kita pakai transaction

        try {
            // masukin user baru ke table
            const q1 = "INSERT INTO user (username, password_hash, nik, name) VALUES (?, ?, ?, ?)"; 
            const [result] = await connection.execute(q1, [username, hashedPassword, nik, name]);
            
            // dapetin userId dari user yang baru kita daftarkan
            const userID = result.insertId;
            
            // userId tsb kita gunakan untuk insert data role pada tabel penghubung, 
            // utk endpoint ini kita hanya daftarkan pada aplikasi superApp (id 1) dengan role default admin (id 2)
            const q2 = "INSERT INTO junction (user_id, app_id, role_id) VALUES (?, ?, ?)";
            await connection.execute(q2, [userID, 1, 2]);
            
            await connection.commit();
            return res.json({ msg: "Data inserted successfully" });
        } catch (error) {
            //rollback seluruh transaksi apabila ada error
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: "failed to make database query " + error });
    }
}

// 2. fungsi mengambil User Data selain password, Respons dalam bentuk JSON, kalau ada errorMsg -> error
const getUser = async (req, res) => {
    try{
        const userId = req.payload.id
        const q = "SELECT user_id, username, nik, name, FROM user WHERE user_id = ?";
        const [rows] = await pool.execute(q, [userId]);
        return res.json(rows[0]);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({errorMsg:"failed to make database query"});
    }
}

// 3. fungsi mengambil seluruh user data
const getAllUser = async (req, res) => {
    try{
        const q = "SELECT user_id, username, nik, name FROM user";
        const [rows] = await pool.execute(q);
        return res.json(rows);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({errorMsg:"failed to make database query"});
    }
}

// 4. fungsi menghapus user
const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    try{
        //hapus user dari table user
        const q = "DELETE FROM user WHERE user_id = ?";
        await pool.execute(q, [userId]);
        return res.json({msg:'delete success'});

        //kita gakperlu query hapus assignment role di junction table, 
        //karena foreign key sudah di cascade (user terhapus -> assignment role terhapus)
    }
    catch(err){
        console.log(err);
        return res.status(500).json({errorMsg:"failed to make database query"});
    }
}

// 5. fungsi edit user
const editUser = async (req, res) => {
    const userId = req.params.userId;
    const {username, nik, name} = req.body;
    try{
        //edit user dari table user
        const q = "UPDATE user SET username=?, nik=?, name=? WHERE user_id = ?";
        await pool.execute(q, [username, nik, name, userId]);
        return res.json({msg:'delete success'});

    }
    catch(err){
        console.log(err);
        return res.status(500).json({errorMsg:"failed to make database query"});
    }
}

// 6. fungsi get data role beserta assignmentnya
const getAllRole = async (req, res) => {
    try{
        //edit user dari table user
        const q = "SELECT *, role.role_name FROM junction LEFT JOIN role ON junction.role_id=role.role_id";
        const [rows] = await pool.execute(q);
        console.log(rows)
        return res.json(rows);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({errorMsg:"failed to make database query"});
    }
}

// 7. fungsi menambahkan role pada aplikasi tertentu
const addRole = async (req, res) => {
    const userId = req.params.userId;
    const appId = req.params.appId;
    const roleId = req.params.roleId;

    try{
        //edit user dari table user
        const q = "INSERT INTO junction (user_id, app_id, role_id) VALUES (?, ?, ?)";
        await pool.execute(q, [userId, appId, roleId]);
        return res.json({ msg: "Data inserted successfully" });
    }catch(err){
        console.log(err);
        return res.status(500).json({errorMsg:"failed to make database query"});
    }
}

// 8. fungsi menghapus role
const deleteRole = async (req, res) => {
    const userId = req.params.userId;
    const appId = req.params.appId;
    try{
        //hapus role dari table user
        const q = "DELETE FROM junction WHERE user_id = ? AND app_id=?";
        await pool.execute(q, [userId, appId]);
        return res.json({msg:'delete success'});
    }catch(err){
        console.log(err);
        return res.status(500).json({errorMsg:"failed to make database query"});
    }
}

// 9. fungsi edit user
const editRole = async (req, res) => {
    const userId = req.params.userId;
    const appId = req.params.appId;
    const roleId =req.params.roleId
    try{
        //edit user dari table user
        const q = "UPDATE junction SET role_id=? WHERE user_id = ? and app_id=?";
        await pool.execute(q, [roleId, userId, appId]);
        return res.json({msg:'update success'});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({errorMsg:"failed to make database query"});
    }
}




export {addUser, getUser, getAllUser, deleteUser, editUser, getAllRole, addRole, deleteRole, editRole};