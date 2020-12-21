const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const expressEjsLayout = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require("passport");
const methodOverride = require("method-override");
require("./config/passport")(passport);
//mongoose

mongoose.connect("mongodb+srv://geraldo1:a@cluster0.fgzgp.mongodb.net/passportAuth?retryWrites=true&w=majority", {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(() => console.log("connected... 3000"))
    .catch((err) => console.log(err));
//Ejs
app.set("view engine", "ejs");
app.use(expressEjsLayout);
//BodyParser
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));
//express session
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//use flash
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
})
//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.listen(3000);