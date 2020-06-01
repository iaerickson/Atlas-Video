const router = require("express").Router();
const auth = require("../../config/auth");
const usersController = require("../../controllers/usersController");

//Login
router.route("/login").post((req, res) => {
	auth
		.logIn(req.body.email, req.body.password)
		.then((dbUser) => res.json(dbUser))
		.catch((err) => res.status(400).json(err));
});

router.route("/signup").post((req, res) => {
	usersController.create(req, res);
});
router.route("/").get((req, res) => {
	console.log(req.body.email);
	usersController.findByEmail(req, res);
});

module.exports = router;
