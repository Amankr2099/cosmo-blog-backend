const express = require('express')
const upload = require('../middlewares/multerMiddleware')


const router = express.Router()
const {
    getProfile,
    getAllUsers,
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    updateProfilePic
} = require('../controllers/userContollers')


//signup
router.post("/register", upload.single('profilePic'), registerUser)

//get all users
router.get('/getUsers',getAllUsers) 

//login
router.post("/login", loginUser)

// update profile
router.put("/:id", updateUser)

//update profile pic
router.put("/profilePic/:id",upload.single('profilePic'), updateProfilePic)

//get user profile
router.get('/:id',getProfile)

//delete
router.delete("/:id", deleteUser)



module.exports = router