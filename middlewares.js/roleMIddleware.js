const jwt = require('jsonwebtoken')

let adminMiddleware = async (req,res,next) =>{
    let authoriztiontoken = (req.headers.authorization)

    let token = authoriztiontoken.split(" ")[1]

    let decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET); 

    if(decoded.role != 'admin'){
        return res.status(401).json({
            success:false,
            message: "You are not Authorized"
        })
    } else {
        next()
    }
    
    
}


let vendorMiddleware = async (req,res,next) =>{
    let authoriztiontoken = (req.headers.authorization)

    let token = authoriztiontoken.split(" ")[1]

    let decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET); 

    if(decoded.role != 'vendor' ){
        return res.status(401).json({
            success:false,
            message: "You are not Authorized"
        })
    } else {
        next()
    }
    
    
}

let userMiddleware = async (req,res,next) =>{
    let authoriztiontoken = (req.headers.authorization)
    
    if(!authoriztiontoken){
        return res.status(401).json({
            success:false,
            message: "You are not logged in"
        })
    }

    let token = authoriztiontoken.split(" ")[1]

    let decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET); 

    if(!decoded ){
        return res.status(401).json({
            success:false,
            message: "You are not logged in"
        })
    } else {
        next()
    }
    
    
}


module.exports = {adminMiddleware,vendorMiddleware,userMiddleware}