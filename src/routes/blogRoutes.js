const express = require('express')
const upload = require('../middlewares/multerMiddleware')
const router = express.Router()
const {
    showBlogs,
    addBlog,
    showSingleBlog,
    updateBlog,
    updateBlogImage,
    deleteBlog,
} = require("../controllers/blogControllers")


router.get("/allblogs", showBlogs)

router.get("/:id", showSingleBlog)
 
router.post("/addblog", upload.single('blogImage'),addBlog)

router.put("/:id",updateBlog)
router.put("/updateImage/:id",upload.single('blogImage'),updateBlogImage)


router.delete("/:id", deleteBlog)


module.exports = router