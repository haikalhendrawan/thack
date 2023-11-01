import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {addUser, getUser, getAllUser, deleteUser, editUser, getAllRole, addRole, deleteRole, editRole} from "../controller/user.js"


const router = express.Router();

router.post("/addUser",  addUser);
router.get("/getUser", getUser);
router.get("/getAllUser", getAllUser);
router.delete("/deleteUser/:userId", deleteUser);
router.post("/edituser/:userId", editUser);
router.get("/getAllRole", getAllRole);
router.post('/addRole/:userId/:appId/:roleId', addRole);
router.delete("/deleteRole/:userId/:appId", deleteRole);
router.get("/editrole/:userId/:appId/:roleId", editRole);


export default router;