const express = require("express");
const route = express.Router({ mergeParams: true });
const wrapAsync = require("../models/wrapAsync.js");
const { reviewSchema } = require("../schema.js");
const { isLoggedIn, isOwnerReview: isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

// ✅ validateReview middleware
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map(el => el.message).join(",");
    // If you want to use ExpressError, import it first
    // const ExpressError = require("../modules/ExpressError.js");
    // throw new ExpressError(400, errMsg);
    req.flash("errorr", errMsg);
    return res.redirect("back");
  }
  next();
};

// <================================== Reviews ===================================>

// ✅ Add review
route.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.addReview)
);

// ✅ Delete review
route.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview)
);

module.exports = route;



// const express = require("express");
// const route = express.Router({ mergeParams: true });
// const wrapAsync = require("../modules/wrapAsync.js");
// const { reviewSchema } = require("../schema.js");
// // const ExpressError = require("../modules/ExpressError.js");

// const { isLoggedIn, isOwner, isOwnerReview: isReviewAuthor } = require("../middleware.js");
// const reviewControllor = require("../controllers/reviews.js");

// // ✅ Middleware to validate review
// const validateReview = (req, res, next) => {
//   let { error } = reviewSchema.validate(req.body);

//   if (error) {
//     let errMsg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(400, errMsg);
//   } else {
//     next();
//   }
// };

// // <================================== Reviews Routes ===================================>

// // Add review by listing id
// route.post(
//   "/",
//   isLoggedIn,
//   validateReview,
//   wrapAsync(reviewControllor.addReview)
// );

// // Delete review
// route.delete(
//   "/:reviewId",
//   isLoggedIn,
//   isReviewAuthor,   // ✅ fixed naming issue
//   wrapAsync(reviewControllor.deleteReview)
// );

// // ✅ Error handling middleware for this router
// route.use((err, req, res, next) => {
//   console.log("This is error: ", err);
//   req.flash("errorr", err.message);
//   res.redirect("back"); // or res.send("Something went wrong");
// });

// module.exports = route;




// // const express = require("express");
// // const route = express.Router({mergeParams : true});
// // const wrapAsync = require("../modules/wrapAsync.js");
// // const { reviewSchema} = require("../schema.js");
// // // const ExpressError = require("../modules/ExpressError.js"); 

// // const { isLoggedIn, isOwner, isOwnerReview : isReviewAuthor} = require("../middleware.js");
// // const reviewControllor = require("../controllers/reviews.js");


// // const validateReview = (req, res, next) => {
// //   let { error } = reviewSchema .validate(req.body);  

// //   if (error) {
// //     let errMsg = error.details.map(el => el.message).join(",");
// //     throw new ExpressError(400, errMsg);  
// //   } else {
// //     next();  
// //   }
// // };

// // // Error handeling 
// // route.use((err,req,res,next)=>{
// //     console.log("This is error  : ",err);
// //     req.flash("errorr",err.message);
// //     // res.send("something went wrong");
// // })

// // // <==================================Reviews===================================>

// // // add review by list id
// // route.post("/",isLoggedIn, reviewControllor.addReview);
// // // delete
// // route.delete("/:reviewId",isLoggedIn,isOwnerReview ,reviewControllor.deleteReview);

// // module.exports = route;



