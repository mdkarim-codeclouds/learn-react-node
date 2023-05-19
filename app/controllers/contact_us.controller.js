const db = require("../models");
const moment = require('moment');
const ContactUs = db.contact_us;

exports.insert = (req, res) => {
    const contact_us = new ContactUs({
        name: req.body.name,
        email: req.body.email,
        query: req.body.query,
        created_on: moment().format(),
        updated_on: moment().format(), 
        isDeleted: false
    });

    contact_us.save((err, contact_us) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "Contact form is submitted successfully!" });
        return;
    });
};

exports.fetch = (req, res) => {
    ContactUs.find({
        isDeleted: false,
    })
    .exec((err, contact_us) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!contact_us) {
            return res.status(404).send({ message: "Contact us not found." });
        }

        res.status(200).send({ data: contact_us, message: "Contact us fetched successfully" });
    });
};
