// const { findById } = require("./models/user");

const List = require("./models/lists");
const Review = require("./models/reviews");

module.exports.isLoggedIn = (req,res,next)=>{
    
    // console.log(req.path,"..",req.originalUrl );

    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("errorr","you must login first ! ");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req,res,next) => {
    let {id} = req.params;
    let listing = await List.findById(id);
    if (res.locals.currUser && !listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("errorr","You are not the Owner of this list");
        return res.redirect(`/home/${id}`);
    }
    next();
}

module.exports.isOwnerReview  = async (req,res,next) => {
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if (!review) {
        req.flash("errorr","Review not found!");
        return res.redirect(`/home/${id}`);
    }
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("errorr","You are not the Owner of this review");
        return res.redirect(`/home/${id}`);
    }
    next();
}