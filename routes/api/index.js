const router = require("express").Router();
const userRoutes = require("./users");
const classRoutes = require("./classroom");

// User routes
router.use("/users", userRoutes);

// Classroom Routes (comment out when implemented)
//router.use("/classroom", classRoutes);

module.exports = router;
