const cloudinary = require('cloudinary')
const fs = require('fs')


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localPath) => {
    try {
        if (!localPath) {
            return null;
        }
        const response = await cloudinary.uploader.upload(localPath, {
            resource_type: 'auto'
        })
        if (response) {
            fs.unlinkSync(localPath)
            return response;
        }
    } catch (error) {
        fs.unlinkSync(localPath) //reomves file path
        return null;
    }
}

module.exports = uploadOnCloudinary