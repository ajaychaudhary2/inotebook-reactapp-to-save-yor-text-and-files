const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Ajayisagoodboy$$';                                           
const fetchuser = (req, res, next)=>{
    //get the user from the jwt tokensand add id to req a=obj
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"pleases enter valid authentic token"})
    }
    try {
        const data= jwt.verify(token, JWT_SECRET);
        req.user = data.user
        next();   
    } catch (error) {
        res.status(401).send({error:"pleases enter valid authentic token"}) 
    }
}
module.exports = fetchuser