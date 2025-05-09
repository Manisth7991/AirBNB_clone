const Listing = require("../models/listing.js");



// ALL FOR CALLBACK

// index
// index route with category filter
module.exports.index = async (req, res) => {
    try {
        const { category } = req.query; // Extract category from the query params
        let filter = {}; // Default filter (show all listings)

        // If category is provided, update the filter to match the category
        if (category) {
            filter.category = category; 
        }

        // Fetch listings based on the filter
        const allListings = await Listing.find(filter); 

        // Pass the filtered listings and the category to the EJS view
        res.render("listings/index.ejs", { allListings, category });
    } catch (err) {
        req.flash("error", "Something went wrong while fetching listings.");
        res.redirect("/listings");
    }
};


// new route

module.exports.renderNewForm=(req, res) => {
    res.render("listings/new.ejs");
};

// show route

module.exports.showListing=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author"
        },
    })
    .populate("owner");
    if(!listing){
        req.flash("error","The listing you requested does not exist");
        res.redirect("/listings");
    } 
    console.log(listing);
    res.render("listings/show.ejs", { listing });
};


//create route

module.exports.createListing=async (req, res, next) => {
    let url=req.file.path;
    let filename=req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner= req.user._id;
    newListing.image={url,filename};
    await newListing.save();
    req.flash("success","New listing created");
    res.redirect("/listings");
};

// edit route

module.exports.renderEditForm=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","The listing you requested does not exist");
        res.redirect("/listings");
    } 
    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250")
    res.render("listings/edit.ejs", { listing,originalImageUrl });
};

//update route

module.exports.updateListing=async (req, res) => {
    let { id } = req.params;
    let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    // isase ham edit ke time par update kar payenge with new file
    if(typeof req.file !== "undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
    
    req.flash("success","Listing updated");
    res.redirect(`/listings/${id}`);
};

// delete listing

module.exports.deleteListing=async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing deleted");
    res.redirect("/listings");
};


// search route

// Escape regex special characters in user input
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

module.exports.index = async (req, res) => {
    try {
        const { search, category, minPrice, maxPrice } = req.query;
        const filters = [];

        if (search) {
            const regex = new RegExp(escapeRegex(search), 'i');
            filters.push({
                $or: [
                    { title: regex },
                    { location: regex },
                    { description: regex },
                    { category: regex } // ✅ Now category is included in search
                ]
            });
        }

        if (category) {
            filters.push({ category: category });
        }

        if (minPrice || maxPrice) {
            const priceFilter = {};
            if (minPrice) priceFilter.$gte = minPrice;
            if (maxPrice) priceFilter.$lte = maxPrice;
            filters.push({ price: priceFilter });
        }

        const queryObj = filters.length > 0 ? { $and: filters } : {};

        const allListings = await Listing.find(queryObj);
        res.render("listings/index.ejs", { allListings, category, search, minPrice, maxPrice });
    } catch (err) {
        console.error(err);
        req.flash("error", "Something went wrong while fetching listings.");
        res.redirect("/listings");
    }
};
