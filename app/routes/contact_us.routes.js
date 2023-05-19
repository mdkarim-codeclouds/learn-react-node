const { authJwt } = require("../middlewares");
const controller = require("../controllers/contact_us.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/contact_us",
        [authJwt.verifyToken, authJwt.isAdmin], 
        controller.fetch
    );

    app.post(
        "/api/contact_us",
        controller.insert
    );
};