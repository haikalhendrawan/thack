import jwt from"jsonwebtoken";

//Middleware untuk memastikan yg request memiliki token (minimal user biasa)
const authenticate=(req, res, next)=>{               
    const headerReceived= req.headers.authorization;  // headerReceived bentuknya kyk gini: Bearer ajnqwonqwojnrqwj21309123212121   
    if(headerReceived){
        const token = headerReceived.split(" ")[1];  // extract tokennya aja
        jwt.verify(token, "secretKey", (err, payload)=>{
            if(err){console.log(err)};
            req.payload=payload;  // {id:xxx, username: xxx, role:xxx}
        });

        next();
    }else{
        res.status(401).json("not authenticated")
    }

}

export default authenticate;