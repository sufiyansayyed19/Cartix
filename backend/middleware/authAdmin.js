import jwt from 'jsonwebtoken';

// Middleware to authenticate admin users
const authAdmin = async (req, res, next) => {
    try {
        // Extract the token from the request headers
        const { token } = req.headers;

        // If no token is provided, return an unauthorized response
        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized. Please login again." });
        }

        // Verify the token using the secret key
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(token_decode);

        // Check if the email from the decoded token matches the admin email in the environment variables
        if (token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({ success: false, message: "Not Authorized. Please login again." });
        }

        // If authentication is successful, proceed to the next middleware or route handler
        console.log('Admin authenticated');
        next();
    } catch (error) {
        // Catch any errors (e.g., invalid token) and return an error response
        console.log("Error: ", error);
        
        // Provide specific error messages for token issues
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expired, please login again' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token, please login again' });
        }
        
        res.status(500).json({ success: false, message: 'Authentication failed' });
    }
};

export default authAdmin;
