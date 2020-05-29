const router = require("express").Router();
const userRoutes = require("./users");
const classRoutes = require("./classroom");

// User routes
router.use("/users", userRoutes);

// Classroom Routes (comment out when implemented)
//router.use("/classroom", classRoutes);

// For anything else, render the html page
router.use(function (req, res) {
	res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
