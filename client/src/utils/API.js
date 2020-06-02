import axios from "axios";

export default {
	createNewUser: function (userData) {
		return axios.post(`/api/users/signup`, userData);
	},
	getUser: function (userData) {
		return axios.get(`/api/users`, userData);
	},
	logIn: function (userData) {
		return axios.post("/login", userData);
	},
	signUp: function (userData) {
		return axios.post("/signUp", userData);
	},
};
