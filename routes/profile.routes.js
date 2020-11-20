const { authJwt } = require("../middleware");
const controller = require("../controllers/profile.controller");

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.get("/api/profile/points", [authJwt.verifyToken], controller.getPoints );
	app.get("/api/profile", [authJwt.verifyToken], controller.getProfile );
	app.patch("/api/profile", [authJwt.verifyToken], controller.saveProfile );
};
