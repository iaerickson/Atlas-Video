import React from "react";
import InputEmail from "../InputEmail";
import InputPassword from "../InputPassword";
import "bulma/css/bulma.css";

class LoginForm extends React.Component {
	render() {
		return (
			<form>
				<div className='field'>
					<label className='label'>Email</label>
					<InputEmail handleInput={this.props.handleInput} />
				</div>
				<div className='field'>
					<label className='label'>Password</label>
					<InputPassword handleInput={this.props.handleInput} />
				</div>
				<div className='login-footer'>
					<button
						id='joinBtn'
						onClick={this.props.handleFormSubmit}
						type='submit'
						className='ag-rounded button is-info'
					>
						Login
					</button>
				</div>
			</form>
		);
	}
}

export default LoginForm;
