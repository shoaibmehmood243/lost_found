const express =  require("express");
const cloudinary =  require("cloudinary");
const dotenv =  require("dotenv");
const Post = require("../mongodb/models/post.js");

dotenv.config();
const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

router.route('/').get(async(req, res)=> {
    try {
        const posts = await Post.find({});

        res.status(200).json({success: true, data: posts});
    } catch (error) {
        res.status(500).json({success: false, data: error});
    }
})

router.route('/').post(async (req, res)=> {
    console.log(req.body);
    try {
        const { name, rollNumber, description} = req.body.form;
        // const photoUrl = await cloudinary.v2.uploader.upload(photo);

        const newPost = await Post.create({
            name,
            rollNumber, description
        })

        res.status(201).json({ success: true, message: "New post created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error });
    }
})

module.exports = router;