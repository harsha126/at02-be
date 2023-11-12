const express = require("express");
const UserModel = require("../../models/user");
const { send } = require("express/lib/response");

const router = express.Router();

module.exports = router;

router.post("/addUser", async (req, res) => {
    console.log(req);
    const newUser = new UserModel({ ...req.body });
    newUser
        .save()
        .then((result) => console.log(result.oldImage.length))
        .catch((err) => console.log(err));
    res.json({ result: "done" });
});

router.get("/getAll", (req, res) => {
     UserModel.find({}).then((out)=>{
        res.send(out);
    })
    // res.send({ hello: "Get All API" });
});

router.post("/getOne/", async (req, res) => {
    const { serviceNo, password } = req.body;
    console.log(
        "User requested with serviceNo : " +
            serviceNo +
            " password : " +
            password
    );
    UserModel.findOne({ serviceNo, password })
        .then((val) => {
            if (val === null) {
                console.log(
                    val,
                    "No user found with service no : " + serviceNo
                );
                res.status(404).json({ message: "No user found" });
            } else {
                console.log(val, "User found with service no : " + serviceNo);
                res.json(val);
            }
        })
        .catch((err) => res.status(500).send("Internal server error"));
});

router.post("/editOne/", async (req, res) => {
    const data = req.body;
    console.log("User requested for edit", req);
    UserModel.findOneAndUpdate(
        { serviceNo: data.serviceNo },
        { ...data },
        { new: true }
    )
        .then((out) => {
            console.log("successfully edited ", out);
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
