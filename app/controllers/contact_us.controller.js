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
