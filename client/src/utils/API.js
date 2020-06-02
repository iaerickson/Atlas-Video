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
	logIn: function (userData) {
		return axios.post("/login", userData);
	},
	//Signs up Users
	signUp: function (userData) {
		return axios.post("/signUp", userData);
	},
};
