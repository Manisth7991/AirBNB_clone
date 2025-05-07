const Joi = require('joi');

const alphaRegex = /^[A-Za-z\s(),]+$/;

const categories = [
    "Trending", "Farms", "Lakefront", "OMG!", "Top cities",
    "Cabins", "Caves", "Amazing pools", "Beach front", "Ryokans",
    "Earth homes", "Rooms", "Castles"
];

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().regex(alphaRegex).required().messages({
            "string.pattern.base": "Location should contain only letters, spaces, commas, or parentheses.",
        }),
        country: Joi.string().regex(alphaRegex).required().messages({
            "string.pattern.base": "Country should contain only letters, spaces, commas, or parentheses.",
        }),
        price: Joi.number().required().min(0),
        category: Joi.string()
            .valid(...categories)
            .required()
            .messages({
                "any.only": "Category must be one of the predefined options.",
                "any.required": "Category is required."
            }),
        image: Joi.string().allow("", null),
    }).required()
});



module.exports.reviewSchema = Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required(),
});