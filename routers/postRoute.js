const express = require("express");
const post_route = express.Router();  // Create an Express Router instance
const bodyparser = require("body-parser");
const multer = require("multer");
const path = require("path");
const config = require("../config/config");
// const jsonwebtoken = require("jsonwebtoken");


post_route.use(bodyparser.json());
post_route.use(bodyparser.urlencoded({extended:true}));

post_route.use(express.static("public"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/postImages"));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + "-" + file.originalname;
        cb(null, name);
    }
});

const upload = multer({ storage: storage });
// const auth = require("../middleware/auth");
const post_controllers = require("../controllers/postController");
post_route.post("/post-route",upload.single("image"), post_controllers.post_creat);
post_route.get("/gate-route",post_controllers.getGatedata);
post_route.get('/get-image/:image', post_controllers.getimage);

module.exports = post_route;  // Export the router instance
