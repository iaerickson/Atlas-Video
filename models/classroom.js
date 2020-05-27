const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassroomSchema = new Schema({
	token: { type: String, unique: true },
	className: { type: String, unique: true, required: true },
	teacher: { type: Schema.Types.ObjectId, ref: "User" },
	assistant: { type: Schema.Types.ObjectId, ref: "User" },
	classList: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	],
});

//teacher and assistant specific methods

const Classroom = mongoose.model("Classroom", ClassroomSchema);

module.exports = Classroom;
