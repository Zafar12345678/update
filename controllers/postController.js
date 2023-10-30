const Post = require("../models/postModel");

const post_creat = async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            data: req.body.date, // Assuming 'date' should be stored in the 'data' field
            image: req.file.filename // Corrected 'filname' to 'filename'
        });

        const postData = await newPost.save();
        res.status(201).send({ success: true, msg: "Post Data", data: postData });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
};

module.exports = {
    post_creat
};
