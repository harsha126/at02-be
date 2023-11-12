const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
let corsOptions = {
    origin: ["http://localhost:5550", "http://localhost:3000"],
};
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());


const mongoURL = "mongodb://localhost:27017/at02";
const upstreamUrl =
    "mongodb+srv://admin:5tvzRAqHfR3ujCIV@nodecluster.kufpkfs.mongodb.net/?retryWrites=true&w=majority";

const port = 8000;
app.listen(port, () => {
    console.log("We are live on " + port);
});

const mongoose = require("mongoose");
mongoose
    .connect(upstreamUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
const routes = require("./app/routes/index");

app.use("/api", routes);
