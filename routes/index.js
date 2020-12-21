const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/Auth.js");
const User = require("../models/user.js");
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
        console.log(req.user + "user" + req.user.email);
        console.log(doc + "doc");
        res.render("dashboard", { user: req.user, doc: doc });
    })
    
    
})
module.exports = router;