import userModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}







//Route for user Login
const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please provide both email and password" });
        }

        const user = await userModel.findOne({email});

        if (!user) {
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch){
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }

        const token = createToken(user.id);
        return res.status(200).json({ success:true, token})


    } catch (error){
        console.log("Error: ", error);
        res.status(500).json({ success:false, Message: error.message});
    }
}

// Route for user registration
const registerUser = async (req, res) => {
    try{
        // destructuring fileds coming from forntend
        const { name, email, password } = req.body;

        // checking if user already exist

        const userExist = await userModel.findOne({email});
        if (userExist){
            return res.status(400).json({success: false, message: "User already exists"});
        }

        // validation email & password
        if (!validator.isEmail(email)) {
            return res.status(400).json({success: false, message: "Please enter a valid email"});
        }

        if (password.length < 8) {
            return res.status(400).json({success:false, message: "At least 8 characters passwrod are required"});
        }

        // salt to hash user password
        const salt = await bycrypt.genSalt(10);

        // hash password
        const hashedPassword = await bycrypt.hash(password, salt);

        // creating new user
        const newUser = new userModel ({
            name,
            email,
            password: hashedPassword,
        })

        const user = await newUser.save();

        const token = createToken(user._id);
        
        return res.status(201).json({ success:true, token})
        

    } catch(error){
        console.log("Error: ", error);
        res.status(500).json({ success:false, Message: error.message});
    }



    res.json({msg: "register APi is working"})
}

// Route for admin Login
const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '2d' });

            // console.log('Token generated')
            return res.status(200).json({success: true, token});
        } else {
            return res.status(401).json({ success: false, Message: "Invalid credentials" });
        }
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ success:false, Message: error.message});
    }



    // res.json({msg: "adminLogin is also working"})
}

export { loginUser, registerUser, adminLogin };