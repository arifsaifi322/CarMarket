const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookings");
const { isLoggedIn } = require("../middleware");
const wrapAsync = require("../models/wrapAsync");

router.route("/:id/book")
    .get(isLoggedIn, wrapAsync(bookingController.bookingForm))
    .post(isLoggedIn, wrapAsync(bookingController.createBooking));

module.exports = router;
