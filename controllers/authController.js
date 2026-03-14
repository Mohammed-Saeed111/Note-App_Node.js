const User = require("../models/User");
const {registerSchema, loginSchema} = require("./validation/authValidation");

const bcrypt = require("bcrypt");

const register = async (req , res) => {
    try{
        const {error, value} = registerSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        })
        if (error) {
            return res.status(400).json({
                msg: error.details.map((err) => err.message),
            });
        }

        // Get Data From Value
        const {username, email, password} = value;
        // User  Found Or No
        const existUser = await User.findOne({email});
        if (existUser) return res.status(400).json({msg: "User Already Exist"});
        // Hash Password
        const hashPassword = await bcrypt.hash(password, 10);
        // Insert Into DB
        const newUser = await User.create({
            username,
            email,
            password: hashPassword   
        })
        // Respons
        res.status(201).json({
            msg: "Done Create Account"
        });

    }catch (error){ 
        res.status(500).json({
            msg: "Server Error",
        });
    }
    
};

const login = async (req, res) => {
    try {
         const {error, value} = loginSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        })

    }catch (error) {}
    
};

const logout = async (req , res) => {
    try {

    } catch (error) {}
};

module.exports = {
    register,
    login,
    logout,
};