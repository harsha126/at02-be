const express = require("express");
const UserModel = require("../../models/user");
const { send } = require("express/lib/response");

const router = express.Router();

module.exports = router;

router.post("/addUser", async (req, res) => {
    const newUser = new UserModel({ ...req.body });
    newUser
        .save()
        .then((result) => console.log(result.oldImage.length))
        .catch((err) => console.log(err));
    res.json({ result: "done" });
});

router.get("/getAll", (req, res) => {
    res.send({ hello: "Get All API" });
});

router.post("/getOne/", async (req, res) => {
    const { serviceNo, password } = req.body;
    UserModel.findOne({ serviceNo, password })
        .then((val) => {
            if (val === null) {
                res.status(404).json({ message: "No user found" });
            } else {
                res.json(val);
            }
        })
        .catch((err) => res.status(500).send("Internal server error"));
});

router.post("/editOne/", async (req, res) => {
    const data = req.body;
    console.log(data.password);
    UserModel.findOneAndUpdate(
        { serviceNo: data.serviceNo },
        { ...data },
        { new: true }
    )
        .then((out) => {
            console.log(out.password);
            res.json(out);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Internal server error");
        });
});

router.patch("/update/:id", (req, res) => {
    res.send("Update by ID API");
});

router.delete("/delete/:id", (req, res) => {
    res.send("Delete by ID API");
});
