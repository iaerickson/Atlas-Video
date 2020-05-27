import axios from "axios";

export default {
	// Gets user by id or email
	getUserByID: function (id) {
		return axios.get(`/api/users/${id}`);
	},
	getUserByEmail: function (email) {
		return axios.get(`/api/users/${email}`);
	},

	// Deletes User
	deleteUser: function (id) {
		return axios.delete(`/api/users/${id}`);
	},
	//Updates User
	updateUser: function (id) {
		return axios.put(`/api/users/${id}`);
	},
	// Logs in with User
	logIn: function (req, res) {
		return axios.post("/login", (req, res));
	},
	//Signs up Users
	signUp: function (req, res) {
		return axios.post("/signUp", (req, res));
	},
};
