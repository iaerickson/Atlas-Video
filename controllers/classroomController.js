const db = require("../models");

module.exports = {
	create: function (req, res) {
		console.log(req.body);
		db.Classroom.create(req.body)
			.then((data) => res.json(data))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
	update: function (req, res) {
		db.Classroom.findOneAndUpdate({ _id: req.params.id }, req.body)
			.then((dbClass) => res.json(dbClass))
			.catch((err) => res.status(422).json(err));
	},
	remove: function (req, res) {
		db.Classroom.findById({ _id: req.params.id })
			.then((dbClass) => dbClass.remove())
			.then((dbClass) => res.json(dbClass))
			.catch((err) => res.status(422).json(err));
	},
};

//https://docs.agora.io/en/Video/API%20Reference/web/index.html for class functionality
