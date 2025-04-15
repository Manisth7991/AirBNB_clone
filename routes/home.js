// routes/home.js
const express = require("express");
const router = express.Router();
const Listing = require("../models/listing"); // make sure the path is correct

router.get("/", async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.render("home", { allListings }); // pass it to the template
    } catch (err) {
        console.error("Error fetching listings:", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
