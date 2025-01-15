import mongoose from "mongoose";

const connectDB = async () =>{
    
    mongoose.connection.on('connected', ()=> {
        console.log('DB is connected');
        
    })
    console.log(process.env.MONGODB_URI)
    await mongoose.connect(`${process.env.MONGODB_URI}/cartix_db`)
}

export default connectDB;