const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const House = require("../models/house.js");
const passport = require("passport");
const mongoose = require("mongoose");
//login handle
router.get("/login", (req, res) => {
    res.render("login");
})
router.get("/register", (req, res) => {
    res.render("register")
})
router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/users/login",
        failureFlash: true,
    })(req, res, next);
})
//register handle
router.post("/register", (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
    console.log(' Name ' + name + ' email :' + email + ' pass:' + password);
    //ensure it contains values in inputs
    if (!name || !email || !password || !password2) {
        errors.push({ msg: "Please fill in all fields" })
    }
    if (password !== password2) {
        errors.push({ msg: "Passwords don't match" });
    }
    //check if password is more than 6  characters 
    if (password.length < 6) {
        errors.push({ msg: "password atleast 6 characters" })
    }
    if (errors.length > 0) {
        res.render("register", {
            errors: errors,
            name: name,
            email: email,
            password: password,
            password2: password2
        })

    } else {
        //if validation is passed
        User.findOne({ email: email }).exec((err, user) => {
            if (user) {
                errors.push({ msg: "email already registered" });
                res.render("register", { errors, name, email, password, password2 });
            } else {
                const newUser = new User({
                    name: name,
                    email: email,
                    password: password
                });
                //hash password
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        //save pass to hash
                        newUser.password = hash;
                        //save user
                        newUser.save()
                            .then((value) => {
                                console.log(value)
                                req.flash("success_msg", "You have now registered!")
                                res.redirect("/users/login");
                            })
                            .catch(value => console.log(value));
                    }));
            }
        })
    }
})
//handle bio and user other info
router.get("/editdash/:id", (req, res) => {
    const { id } = req.params;
    User.findById({
        _id: id
    }, (err, doc) => {
        if (err) throw err;
        res.render("./editdash", { doc: doc })
    })

})
router.post("/editdash/:id", (req, res) => {
    const { name, bio, web, location } = req.body;
    const { id } = req.params;
    const newBio = {
        name, bio, web, location
    };
    User.findByIdAndUpdate(id, newBio, (err, doc) => {
        if (err) throw err;
        res.redirect("/dashboard")
    })
})
router.get("/:id/new", (req, res) => {
    const { id } = req.params;
    res.render("./new", {id: id});
})
router.post("/:id/new", (req, res) => {
    const { type, age, price, address, bedrooms, bathrooms, rooms, description } = req.body;
    const { id } = req.params;
    const newHouse = new House({
        type, age, price, address, bedrooms, bathrooms, rooms, description, sellerId: id
    });
    newHouse.save()
        .then((value) => {
        console.log(value + "value")
            req.flash("success_msg", "You have posted your house for sale")
            User.findByIdAndUpdate(id, { $inc: { 'housePosted': 1 } }, (err, doc) => {
                if (err) throw err;

            })
        res.redirect("/dashboard");
    })
        .catch(value => console.log(value));
    
})
//logout
router.get("/logout", (req, res) => {
    req.logout();
    req.flash('success_msg', 'Now logged out');
    res.redirect('/users/login');
})
module.exports = router;