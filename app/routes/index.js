const express = require("express");
const UserModel = require("../../models/user");
const { send } = require("express/lib/response");
const { ObjectId } = require("mongodb");

const router = express.Router();

module.exports = router;

router.post("/addUser", async (req, res) => {
    const newUser = new UserModel({ ...req.body });
    newUser
        .save()
        .then((result) => res.json({_id:result._id}))
        .catch((err) => {
            console.log("Error while adding new user id ",req.body.name ,err)
            res.status(500).json({message:'Internal Server error'})
        });
});

router.get("/getAll", (req, res) => {
    UserModel.find({}).then((out) => {
        res.send(out);
    });
    // res.send({ hello: "Get All API" });
});

router.get("/getById/:id", (req, res) => {
    const { id } = req.params;
    console.log("get user by id : ", id);
    UserModel.findOne({ _id: id })
        .then((out) => {
            if (out === null) {
                console.log("user not found with id :" + id);
                res.status(404).send({ message: "no user found" });
            } else {
                console.log("user found with id :" + id);
                res.send(out);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ message: "Internal server error" });
        });
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
                console.log(val.name, "User found with service no : " + serviceNo);
                res.json(val);
            }
        })
        .catch((err) => res.status(500).send("Internal server error"));
});

router.post("/editOne/", async (req, res) => {
    const data = req.body;
    console.log("User requested for edit", req.name);
    UserModel.findOneAndUpdate(
        { serviceNo: data.serviceNo },
        { ...data },
        { new: true }
    )
        .then((out) => {
            console.log("successfully edited ", out.name);
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
