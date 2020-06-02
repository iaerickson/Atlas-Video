const express = require("express");
var cors = require("cors");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}

app.use(routes);

app.use(function (err, req, res, next) {
	if (err.name === "UnauthorizedError") {
		res.status(401).send(err);
	} else {
		next(err);
	}
});

mongoose.connect(
	process.env.MONGODB_URI ||
		"mongodb://TIL-NU:banana333@ds159651.mlab.com:59651/heroku_76wd45xm"
);

app.listen(PORT, function () {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
