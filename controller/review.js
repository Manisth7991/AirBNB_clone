const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

// Create  Review ROUTE
module.exports.createReview=async (req,res) =>{
    let listing=await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author=req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New Review created");

    res.redirect(`/listings/${listing._id}`);
};

// UPDATE REVIEW ROUTE
module.exports.updateReview = async (req, res) => {
    const { id, reviewId } = req.params;
    const { comment, rating } = req.body.review;

    const updatedReview = await Review.findByIdAndUpdate(
        reviewId,
        { comment, rating },
        { new: true, runValidators: true }
    );

    req.flash("success", "Review updated");
    res.redirect(`/listings/${id}`);
};


// DELETE REVIEW ROUTE

module.exports.deleteReview=async(req,res) =>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(id);
    req.flash("success","Review deleted");
    res.redirect(`/listings/${id}`);
};
