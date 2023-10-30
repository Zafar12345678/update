const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");

mongoose.connect("mongodb+srv://merningday123:merningday123@cluster0.6llqgoh.mongodb.net/software?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "software" // Specify the database name here
});

app.use(cors());

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

const post_route = require("./routers/postRoute");
app.use("/api", post_route);

app.listen(3000, function() {
    console.log("Server is ready on port 3000");
});
