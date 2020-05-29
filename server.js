const express = require("express");
var cors = require("cors");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Error handling
app.use(function (err, req, res, next) {
	if (err.name === "UnauthorizedError") {
		// Send the error rather than to show it on the console
		res.status(401).send(err);
	} else {
		next(err);
	}
});

// Connect to the Mongo DB on heroku
mongoose.connect(
	process.env.MONGODB_URI ||
		"mongodb://TIL-NU:banana333@ds159651.mlab.com:59651/heroku_76wd45xm"
);

// //Connect to local Mongo Test
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/atlas", {
// 	useNewUrlParser: true,
// });

// Start the API server
app.listen(PORT, function () {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
