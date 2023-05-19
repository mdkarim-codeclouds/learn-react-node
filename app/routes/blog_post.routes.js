const { authJwt } = require("../middlewares");
const controller = require("../controllers/blog_post.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/blog_posts", 
        controller.fetch
    );

    app.post(
        "/api/blog_posts", 
        [authJwt.verifyToken, authJwt.isAdmin], 
        controller.insert
    );

    app.put(
        "/api/blog_posts",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.update
    );

    app.delete(
        "/api/blog_posts",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.delete
    );
};