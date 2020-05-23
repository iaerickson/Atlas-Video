const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
//var bcrypt = require("bcryptjs");

const userSchema = new Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	isHost: { type: Boolean },
	//currentRoom:
	//VidChatToken
});

const User = mongoose.model("User", userSchema);

// Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
// User.prototype.validPassword = function (password) {
// 	return bcrypt.compareSync(password, this.password);
// };
//potenially add prototype-validate password and add hook
module.exports = User;
