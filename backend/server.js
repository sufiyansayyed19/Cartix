import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import connectDB from './config/mongodb.js';
import mongoose from 'mongoose';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

//App config
const app = express()
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Security Middleware
// Set security HTTP headers
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow images from Cloudinary
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
        },
    },
}));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10mb' })); // Limit body size to prevent DOS

// Enable CORS with specific origins for production security
const allowedOrigins = process.env.FRONTEND_URL 
    ? process.env.FRONTEND_URL.split(',') 
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // In development, allow any localhost origin
        if (origin && origin.startsWith('http://localhost:')) {
            return callback(null, true);
        }
        
        // In production, check against allowed origins
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    optionsSuccessStatus: 200
}));

// api routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order', orderRouter)



app.listen(port, ()=> {
    console.log(`Server started at port:${port}`)
    
});
 


//TEST DB
// app.get('/test-db', async (req, res) => {
//     try {
//         // Query the `sample_mflix` collection for documents with a users schema
//         const users = await mongoose.connection.db.collection('sample_mflix')
//             .find({}, { projection: { name: 1, email: 1 } }) // Select only 'name' and 'email'
//             .limit(5)
//             .toArray();

//         if (users.length === 0) {
//             return res.status(200).json({ message: "No users found in sample_mflix collection" });
//         }

//         res.status(200).json({
//             message: "Users fetched successfully",
//             users: users
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "Error fetching users",
//             error: error.message
//         });
//     }
// });