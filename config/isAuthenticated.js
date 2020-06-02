const exjwt = require("express-jwt");
require("dotenv").config();
const isAuthenticated = exjwt({
	secret: process.env.SERVER_SECRET,
});

module.exports = isAuthenticated;
