const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.blog_post = require("./blog_post.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;