import userModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '7d' // Token expires in 7 days
    });
}





//NOTE: .status(value) is reomved due to complications in grabing error message and success status in frontend

//Route for user Login
const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Please provide both email and password" });
        }

        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success: false, message: "Invalid credentials"});
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch){
            return res.json({success: false, message: "Invalid credentials"});
        }

        const token = createToken(user.id);
        return res.json({ success:true, token})


    } catch (error){
        console.log("Error: ", error);
        res.json({ success:false, message: "Invalid credentials"});
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
            return res.json({success: false, message: "User already exists"});
        }

        // validation email & password
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email"});
        }

        // Strong password validation
        if (password.length < 8) {
            return res.json({success:false, message: "Password must be at least 8 characters long"});
        }
        
        if (!validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })) {
            return res.json({
                success: false, 
                message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            });
        }

        // salt to hash user password
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashedPassword = await bcrypt.hash(password, salt);

        // creating new user
        const newUser = new userModel ({
            name,
            email,
            password: hashedPassword,
        })

        const user = await newUser.save();

        const token = createToken(user._id);
        
        return res.json({ success:true, token})
        

    } catch(error){
        console.log("Error: ", error);
        res.json({ success:false, message: error.message});
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
            return res.json({success: true, token});
        } else {
            return res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log("Error: ", error);
        res.json({ success:false, message: error.message});
    }



    // res.json({msg: "adminLogin is also working"})
}

// Route to get user profile
const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.body; // userId comes from authUser middleware
        
        const user = await userModel.findById(userId).select('-password'); // Exclude password
        
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        
        return res.json({ 
            success: true, 
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone || '',
                address: user.address || '',
                createdAt: user.createdAt
            }
        });
        
    } catch (error) {
        console.log("Error: ", error);
        res.json({ success: false, message: error.message });
    }
}

// Route to update user profile
const updateUserProfile = async (req, res) => {
    try {
        const { userId, name, phone, address } = req.body; // userId comes from authUser middleware
        
        // Find user
        const user = await userModel.findById(userId);
        
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        
        // Update user fields
        if (name) user.name = name;
        if (phone !== undefined) user.phone = phone;
        if (address !== undefined) user.address = address;
        
        await user.save();
        
        return res.json({ 
            success: true, 
            message: "Profile updated successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            }
        });
        
    } catch (error) {
        console.log("Error: ", error);
        res.json({ success: false, message: error.message });
    }
}

export { loginUser, registerUser, adminLogin, getUserProfile, updateUserProfile };