const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/WrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js"); // Your middleware with Joi validation
const listingController = require("../controller/listings.js");
const multer = require('multer');
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

// By router.route method we can combine same path route like index and create route
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single("listing[image]"), // Handles image upload
        validateListing, // Validate the listing data using Joi
        wrapAsync(listingController.createListing)
    );

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"), // Handles image upload for edit
        validateListing, // Validate listing data before updating
        wrapAsync(listingController.updateListing)
    )
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
