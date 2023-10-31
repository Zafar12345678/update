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
};
// const path = require('path');

// const get_image = async (req, res) => {
//     try {
//         const imageName = req.params.images;
//         const imagePath = path.join(__dirname, '..', 'public', 'postimages', imageName);
//         res.sendFile(imagePath);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// }

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
    }
}


module.exports = {
    post_creat,
    getGatedata,
    // get_image 
};
