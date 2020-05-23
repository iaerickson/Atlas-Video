const router = require("express").Router();
// var passport = require("../config/passport");
const usersController = require("../../controllers/usersController");
const db = require("../models");

// Matches with "/api/users"
router.route("/").get(usersController.findAll).post(usersController.create);

// Matches with "/api/users/:id"
router
	.route("/:id")
	.get(usersController.findById)
	.put(usersController.update)
	.delete(usersController.remove);

module.exports = router;
