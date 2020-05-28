const db = require("../models");
const isAuthenticated = require("../config/isAuthenticated");

// Defining methods for the usersController
module.exports = {
	signUp: function (req, res) {
		console.log(req.body);
		db.User.create(req.body)
			.then((data) => res.json(data))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
		//possibly log in
	},

	findById: function (req, res) {
		db.User.findById(req.params.id)
			.then((data) => {
				if (data) {
					// res.json(data);
					console.log("found the user");
				} else {
					res.status(404).send({ success: false, message: "No user found" });
				}
			})
			.catch((err) => res.status(400).send(err));
	},

	update: function (req, res) {
		db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
			.then((dbUser) => res.json(dbUser))
			.catch((err) => res.status(422).json(err));
	},
	create: function (req, res) {
		console.log(req.body);
		db.User.create(req.body)
			.then((data) => res.json(data))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	remove: function (req, res) {
		db.User.findById({ _id: req.params.id })
			.then((dbUser) => dbUser.remove())
			.then((dbUser) => res.json(dbUser))
			.catch((err) => res.status(422).json(err));
	},

	findByEmail: function (req, res) {
		db.User.findOne({ email: req.params.email })
			.then((data) => {
				if (data) {
					res.json(data);
				} else {
					res.status(404).send({ success: false, message: "No user found" });
				}
			})
			.catch((err) => res.status(400).send(err));
	},
	findByFirstName: function (req, res) {
		console.log(req.params);
		db.User.findOne({ firstName: req.params.firstName })
			.then((data) => {
				if (data) {
					// res.json(data);
					res.status(200).send({ success: true, message: "Found User Ian" });
				} else {
					res.s;
					tatus(404).send({ success: false, message: "No user found" });
				}
			})
			.catch((err) => res.status(400).send(err));
	},
};
