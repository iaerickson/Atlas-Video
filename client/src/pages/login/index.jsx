import React from "react";
import { Link, Redirect } from "react-router-dom";
import "../../assets/fonts/css/icons.css";
import "./login.css";
import LoginForm from "../../components/LoginForm";
import API from "../../utils/API";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			passwordIsMatch: false,
			error: "",
			joinBtn: false,
			loggedIn: false,
		};
	}

	componentDidMount() {
		this.setState({ email: "", password: "" });
	}
	handleInput = (val, name, state) => {
		this.setState({
			[name]: val,
			joinBtn: state,
			//console.log(name)
		});
	};

	handleFormSubmit = (event) => {
		API.logIn(this.state)
			.then((res) => {
				this.setState({ email: res.data.email, loggedIn: true });
			})
			.catch((err) => this.setState({ error: err.message }));
		event.preventDefault();

		// if (this.state.passwordIsMatch === false) {
		// 	console.log("passwords do not match");
		// 	return false;
		// }
	};
	render() {
		const loggedIn = this.state.loggedIn;
		if (loggedIn === true) {
			return (
				<Redirect
					to={{
						pathname: "/channel",
						state: {
							email: this.state.email,
						},
					}}
				/>
			);
		}
		return (
			<div className='wrapper index'>
				<div className='ag-header'></div>
				<div className='ag-main'>
					<div className='p p-1'></div>
					<div className='p p-2'></div>
					<div className='p p-3'></div>
					<div className='p p-4'></div>
					<div className='p p-5'></div>
					<div className='p p-6'></div>
					<section className='login-wrapper'>
						<div className='login-header'>
							{/* <img src={require('../../assets/images/ag-logo.png')} alt="" /> */}
							<p className='login-title'>Log in to Atlas Video</p>
							<p className='login-subtitle'>
								How Would You Like To Learn Today?
							</p>
						</div>
						<div className='login-body'>
							<div className='columns'>
								<div className='column is-12'>
									<LoginForm
										handleInput={this.handleInput}
										handleFormSubmit={this.handleFormSubmit}
										disabled={!this.state.joinBtn}
									/>
								</div>
							</div>
							<div className='columns'>
								<div className='column is-7'></div>
								<div className='column is-5'></div>
							</div>
							<div className='columns'>
								<div className='column'>
									<span>Don't have an account? </span>
									<Link to='/signup'>Sign Up Here</Link>
								</div>
							</div>
						</div>
					</section>
				</div>
				<div className='ag-footer'>
					<div>
						<span> </span>
						<span className='ag-contact'></span>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
