const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../models/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");
const userController = require("../controllers/user.js");
const bookingController = require("../controllers/bookings");




// <====================================(signup)=================================================>
router.route("/signup")
.get(userController.signupLink)
.post(wrapAsync( userController.signup));

// <====================================(login)===========================================>
router.route("/login")
.get(userController.loginLink)
.post(saveRedirectUrl,
    passport.authenticate("local",{failureRedirect : "/login",failureFlash : true,}),
    userController.login);

// <=========================(logOut)===================================>
router.get("/logout",userController.logout);

// <=========================(My Bookings)===================================>
router.get("/mybookings", isLoggedIn, wrapAsync(bookingController.myBookings));
router.delete("/booking/:id/cancel", isLoggedIn, wrapAsync(bookingController.cancelBooking));

module.exports = router;