const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Posts collection and inserts the books below
//test
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/atlas", {
	useNewUrlParser: true,
});

const userSeed = [
	{
		email: "ian@mail.com",
		password: "password",
		userCreated: new Date(Date.now()),
		firstName: "Ian",
		lastName: "Erickson",
	},
	{
		email: "ted@mail.com",
		password: "tedpassword",
		userCreated: new Date(Date.now()),
		firstName: "Ted",
		lastName: "Irland",
	},
	{
		email: "leight@mail.com",
		password: "banana",
		userCreated: new Date(Date.now()),
		firstName: "Leighton",
		lastName: "Shallenberger",
	},
];

db.User.remove({})
	.then(() => db.User.collection.insertMany(userSeed))
	.then((data) => {
		console.log(data.result.n + " records inserted!");
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
