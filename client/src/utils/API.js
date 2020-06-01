import axios from "axios";

//can test on ComponentDidMount

export default {
	createNewUser: function (userData) {
		return axios.post(`/api/users/signup`, userData);
	},
	getUser: function (userData) {
		return axios.get(`/api/users`, userData);
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
