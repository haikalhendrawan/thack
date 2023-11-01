import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {login, refresh, logout} from "../controller/auth.js";


const router = express.Router();

router.post("/login", login);
router.get("/refresh", refresh);
router.delete("/logout", logout);


router.get("/", (req, res)=>{
    res.json(req.cookies.refreshToken);
})



export default router;