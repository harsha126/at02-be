const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json({limit:"50mb"}));
app.use(bodyParser.json());
let corsOptions = {
    origin: ["http://localhost:5550", "http://localhost:3000"],
};

app.use(cors());

const mongoURL = "mongodb://localhost:27017/at02";

const port = 8000;
app.listen(port, () => {
    console.log("We are live on " + port);
});

const mongoose = require("mongoose");
mongoose
    .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
const routes = require("./app/routes/index");

app.use("/api", routes);
