const listModel = require("./../models/lists");
const reviewModel = require("./../models/reviews");

module.exports.addReview = async(req,res)=>{
    let listing = await listModel.findById(req.params.id);
    let newReview = new reviewModel(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","Review created sucessfully!");
    res.redirect(`/home/${req.params.id}`);
}


module.exports.deleteReview = async(req,res)=>{
    let {id,reviewId} = req.params;
    await listModel.findByIdAndUpdate(id,{$pull : {reviews : reviewId}});
    await reviewModel.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted sucessfully!");
    res.redirect(`/home/${id}`);
}