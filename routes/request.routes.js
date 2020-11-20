const { authJwt } = require("../middleware");
const controller = require("../controllers/request.controller");

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.post("/api/request", [authJwt.verifyToken], controller.makeRequest );
	app.post("/api/request/filter", [authJwt.verifyToken], controller.getRequests );
	app.get("/api/request/count", [authJwt.verifyToken], controller.getRequestCount );
	app.post("/api/request/approve", [authJwt.verifyToken], controller.approveRequest );
	app.post("/api/request/decline", [authJwt.verifyToken], controller.declineRequest );
};
