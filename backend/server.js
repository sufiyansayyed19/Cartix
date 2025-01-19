import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import mongoose from 'mongoose';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
//App config

const app = express()
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middleware
app.use(express.json());
app.use(cors());

// api routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart',cartRouter);



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