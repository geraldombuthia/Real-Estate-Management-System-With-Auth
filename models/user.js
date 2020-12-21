const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    }, dateOfJoin : {
        type: Date,
        default: Date.now
    }, bio: {
        type: String,
        required: false,
        default: null
    }, web: {
        type: String,
        required: false,
        default: null
    }, location: {
        type: String,
        required: false,
        default: null
    }, housePosted: {
        type: Number,
        required: false,
        default: 0
    }
});
const User = mongoose.model("User", UserSchema);

module.exports = User;