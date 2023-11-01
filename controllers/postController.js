const Post = require("../models/postModel");
const post_creat = async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            date: req.body.date, // Assuming 'date' should be stored in the 'data' field
            image: req.file.filename // Corrected 'filname' to 'filename'
        });

        const postData = await newPost.save();
        res.status(201).send({ success: true, msg: "Post Data", data: postData });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    } 
     }
    const path = require('path');

    const getimage = async (req, res) => {
        try {
            const image = req.params.image;
    
            const getImagePath = (imageName) => {
                // Construct the path to the image in the 'public/productImages' directory
                const imagePath = path.join(__dirname, '..', 'public', 'postImages', imageName);
                return imagePath;
            };
    
            const imageName = image;
            const imagePath = getImagePath(imageName);
            res.sendFile(imagePath);
        } catch (error) {
            res.status(500).send('Internal Server Error: ' + error.message);
        }
    };

// frontend gate data 
const getGatedata = async(req,res)=>{
    try {
        const myData = await Post.find();
        const path = require("path");
        const imagepath = myData.map(img => ({

            // imagePath: path.join(__dirname, '..', 'public/postImages', img.image),
            title: img.title,
            date: img.date,
            id: img._id,
            image:img.image
        }))
        res.status(200).json(imagepath); 
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    };
};



module.exports = {
    post_creat,
    getGatedata,
    getimage
};
