import jwt from 'jsonwebtoken';

// check authorization of user & after varification catch their id and send in req body to next fucntion
const authUser = async (req, res, next)=> {
    const { token } = req.headers;

    if(!token){
        return res.json({success: false, message: 'Not authorized login please'});
    } 

    try{
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error){
        console.log(error);
        // Provide specific error messages for token issues
        if (error.name === 'TokenExpiredError') {
            return res.json({success: false, message: 'Token expired, please login again'});
        } else if (error.name === 'JsonWebTokenError') {
            return res.json({success: false, message: 'Invalid token, please login again'});
        }
        return res.json({success: false, message: 'Authentication failed'});
    }
}

export default authUser;