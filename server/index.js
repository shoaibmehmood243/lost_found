const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDb = require("./mongodb/dbConn.js");

const postRoutes = require("./routes/postRoutes.js")

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

app.get('/', async (req, res) => {
    res.send("Hello DALL-E 2.0");
});

app.use('/api/v1/post', postRoutes);

const startServer = async () => {
    try {
        connectDb(process.env.MONGODB_URL);
        app.listen(8080, () => console.log("Server running on port:8080"));
    } catch (error) {
        console.log(error);
    }
}

startServer();