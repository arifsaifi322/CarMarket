const Booking = require("../models/bookings");
const List = require("../models/lists");

module.exports.bookingForm = async(req, res) => {
    try {
        let listing = await List.findById(req.params.id);
        res.render("listings/book.ejs", { listing });
    } catch (error) {
        req.flash("errorr", "Something went wrong!");
        res.redirect("/home");
    }
};

module.exports.createBooking = async(req, res) => {
    try {
        let listing = await List.findById(req.params.id);
        
        let { firstName, lastName, email, phone, quantity, address } = req.body;
        
        const totalPrice = listing.price;
        
        let newBooking = new Booking({
            listing: listing._id,
            user: req.user._id,
            firstName,
            lastName,
            email,
            phone,
            quantity,
            address,
            totalPrice
        });
        
        await newBooking.save();
        req.flash("success", "Your booking is successful!");
        res.redirect("/home");
    } catch (error) {
        console.log(error);
        req.flash("errorr", "Error creating booking!");
        res.redirect(`/home/${req.params.id}`);
    }
};

module.exports.myBookings = async(req, res) => {
    try {
        let bookings = await Booking.find({ user: req.user._id })
            .populate("listing")
            .sort({ createdAt: -1 });
        res.render("users/mybookings.ejs", { bookings });
    } catch (error) {
        req.flash("errorr", "Error fetching bookings!");
        res.redirect("/home");
    }
};

module.exports.cancelBooking = async(req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        req.flash("success", "Booking cancelled successfully!");
        res.redirect("/mybookings");
    } catch (error) {
        req.flash("errorr", "Error cancelling booking!");
        res.redirect("/mybookings");
    }
};
