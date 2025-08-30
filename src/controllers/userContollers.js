const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const uploadOnCloudinary = require('../utils/fileUploading')


//get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error)
    }
}

const registerUser = async (req, res) => { 
    const profilePicPath = req.file?.path;
    const fileUploaded = await uploadOnCloudinary(profilePicPath);
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    
    try {
        const user = new User({
            fullName: req.body.fullName,
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
            profilePic: fileUploaded?.url || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        });

        await user.save();

        // console.log("registered User");
        res.status(200).json(user);
    } catch (error) {
        // Check for specific error types and respond accordingly
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: "Validation error occurred. Please check your input fields." });
        }
        res.status(500).json({ error: "An error occurred while registering the user." });
    }
}

const getProfile = async(req, res)=>{
    
    try {
        const user = await User.findById(req.params.id)
        // const user = await User.findById(req.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//login
const loginUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const enteredUser = await User.findOne({
            $or: [{ username }, { email }]
        })
        if (!enteredUser) {
            return res.status(400).json({ error: "Your email or username doesn't exists" });
        }
        const entredPassword = await bcrypt.compare(password, enteredUser.password)
        if (!entredPassword) {
            return res.status(400).json({ error: "Wrong Password" });
        }

        // console.log("logged User");
        res.status(200).json(enteredUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//update user
const updateUser = async (req, res) => {
    
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
    }

    try {
        await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        res.status(200).json("updated user")
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateProfilePic = async(req,res)=>{
    const profilePicPath = req.file?.path;
    console.log(profilePicPath);
    
    const fileUploaded = await uploadOnCloudinary(profilePicPath);
    console.log(fileUploaded.url);
    
    try {
        const r = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                profilePic:fileUploaded?.url || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
        }, {new: true})
        
        res.status(200).json("updated profle pic")
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//delete users
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("deleted user")
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    getProfile,
    getAllUsers,
    registerUser,
    loginUser, 
    updateUser,
    updateProfilePic,
    deleteUser
}