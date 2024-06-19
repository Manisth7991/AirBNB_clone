const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const User=require("../models/user.js");
const passport=require("passport");
const {saveRedirectUrl} = require("../middleware.js");

const userController= require("../controller/user.js");

// By router.route method we can combine same path route like index and create route

// Signup
router.route("/signup")
.get(userController.renderSignupForm)
.post(userController.signUp);

//Login
router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate("local", { failureRedirect: "/login",failureFlash:true }),userController.login);

//Log Out
router.get("/logout",userController.logOut);
module.exports=router;