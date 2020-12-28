const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/Auth.js");
const User = require("../models/user.js");
const House = require("../models/house");
// welcome Page
router.get("/", (req, res) => {
    res.render("welcome");
})
//register page
router.get("/register", (req, res) => {
    res.render("register");
})
router.get("/dashboard", ensureAuthenticated, (req, res) => {
    User.findOne({ email: req.user.email }, (err, doc) => {
        if (err) throw err;
        House.find({ sellerId: req.user._id }, (err, home) => {
            if (err) throw err;
            res.render("dashboard", { user: req.user, doc: doc, houses: home });
        })
        
    })
    
    
})
router.get("/home", (req, res) => {
    House.find({}, (err, doc) => {
        if (err) throw err;
        console.log(doc);
        res.render("./home", {houses: doc})
    })
})
module.exports = router;