const mongoose = require("mongoose");

const ContactUs = mongoose.model(
    "ContactUs",
    new mongoose.Schema({
        name: String,
        email: String,
        query: String,
        created_on: String,
        updated_on: String, 
        isDeleted: { type: Boolean, defaults: false }
    })
);

module.exports = ContactUs;