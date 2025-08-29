const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
    }, 
    role: {
        type: String,
        default: 'user',
    },
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
    // accessToken:{
    //     type:String,
    // }

}, { timeseries: true }); 




const User = mongoose.model('User', userSchema);

module.exports = User;
