const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    quantity: Joi.number().min(1),
    image: Joi.string().allow("", null), 
  }).required(),
});


module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating : Joi.number().required(),
        comment : Joi.string().required()
    }).required()
})

module.exports.bookingSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    quantity: Joi.number().min(1).required(),
    address: Joi.string().required()
});


