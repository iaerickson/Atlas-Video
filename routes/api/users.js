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

//SignUp
router.route("/signup").post((req, res) => {
	usersController.signUp(req, res);
});

// Matches with "/api/users/:id" as long as it is authenticated with valid token
//authenticated in controller function

// router
// 	.route("/:id")
// 	.get(isAuthenticated, (req, res) => {
// 		usersController.findById;
// 	})
// 	.put(isAuthenticated, (req, res) => {
// 		usersController.update;
// 	})
// 	.delete(isAuthenticated, (req, res) => {
// 		usersController.remove;
// 	});

//Non-Authenticated routes
//router.route("/:id").get(usersController.findById(req, res));

// 	.put(usersController.update)
// 	.delete(usersController.remove);

//WORKS
router.route("/newUser").post((req, res) => {
	usersController.create(req, res);
});
//no way for routing to know whats what
router.route("/firstName/:firstName").get(usersController.findByFirstName);
//send in body
router.route("/email/:email").get(usersController.findByEmail);

module.exports = router;
