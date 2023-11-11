const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    serviceNo: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    trade: {
        type: String,
    },
    lastPosting: {
        type: String,
    },
    phoneNo: {
        type: String,
    },
    company: {
        type: String,
    },
    designation: {
        type: String,
    },
    workPlace: {
        type: String,
    },
    wifeName: {
        type: String,
    },
    children: {
        type: String,
    },
    homeTown: {
        type: String,
    },
    address: {
        type: String,
    },
    dod: {
        type: Date,
    },
    dob: {
        type: Date,
    },
    dom: {
        type: Date,
    },
    oldImage: {
        type: String,
    },
    newImage: { type: String },
    password: {
        type: String,
    },
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
