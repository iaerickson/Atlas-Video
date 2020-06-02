import React from "react";
import { Link } from "react-router-dom";
import "../../assets/fonts/css/icons.css";

import "bulma/css/bulma.css";
import "./signup.css";
import SignUpForm from "../../components/SignUpForm";
import API from "../../utils/API";

class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			confirm: "",
			error: "",
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
		event.preventDefault();
		console.log(this.state.password);
		console.log(this.state.confirm);
		if (this.state.password !== this.state.confirm) {
			console.log("passwords do not match");
			return false;
		}
		API.createNewUser(this.state)
			.then((res) => {
				if (res.data.status === "error") {
					throw new Error(res.data.message);
				}
				this.setState({ results: res.data.message, error: "" });
			})
			.catch((err) => this.setState({ error: err.message }));
	};
	render() {
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
							<p className='login-title'>Sign up for Atlas Video</p>
							<p className='login-subtitle'>
								How Would You Like To Learn Today?
							</p>
						</div>
						<div className='login-body'>
							<div className='columns'>
								<div className='column is-12'>
									<SignUpForm
										handleInput={this.handleInput}
										handleFormSubmit={this.handleFormSubmit}
									/>
								</div>
							</div>
							<div className='columns'>
								<div className='column is-7'></div>
								<div className='column is-5'></div>
							</div>
							<div className='columns'>
								<div className='column'>
									<span>Already have an account? </span>
									<Link to='/login'>Log In Here</Link>
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

export default SignUp;