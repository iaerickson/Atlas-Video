const db = require("../models");
const isAuthenticated = require("../config/isAuthenticated");

module.exports = {
	create: function (req, res) {
		db.User.create(req.body)
			.then((data) => res.json(data))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
	findByEmail: function (req, res) {
		db.User.findOne({ email: req.body.email })
			.then((data) => {
				if (data) {
					res.json(data);
				} else {
					res.status(404).send({ success: false, message: "No user found" });
				}
			})
			.catch((err) => res.status(400).send(err));
	},
};
