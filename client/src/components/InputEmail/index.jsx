import React from "react";
import Validator from "../../utils/Validator";

class InputEmail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			errorMsg: "",
			state: "",
		};
	}

	validate = (val) => {
		this.setState({
			state: "",
			errorMsg: "",
		});
		if (Validator.isNonEmpty(val.trim())) {
			this.setState({
				errorMsg: "Cannot be empty!",
				state: "is-danger",
			});
			return false;
		} else if (Validator.minLength(val.trim(), 1)) {
			this.setState({
				errorMsg: "No shorter than 1!",
				state: "is-danger",
			});
			return false;
		} else {
			this.setState({
				state: "is-success",
			});
			return true;
		}
	};

	handleChange = (e) => {
		let state = this.validate(e.target.value);
		this.props.handleInput(e.target.value, e.target.name, state);
	};

	render() {
		let validateIcon = "";
		switch (this.state.state) {
			default:
			case "":
				validateIcon = "";
				break;
			case "is-success":
				validateIcon = <i className='ag-icon ag-icon-valid'></i>;
				break;
			case "is-danger":
				validateIcon = <i className='ag-icon ag-icon-invalid'></i>;
				break;
		}

		return (
			<div className='channel-wrapper control has-icons-left'>
				<input
					onInput={this.handleChange}
					id='email'
					name='email'
					className={"ag-rounded input " + this.state.state}
					type='email'
					placeholder='example@email.com'
				/>
				<span className='icon is-small is-left'>
					<i className='fas fa-envelope-square'></i>
				</span>
				<span className='validate-icon'>{validateIcon}</span>
				<div className='validate-msg'>{this.state.errorMsg}</div>
			</div>
		);
	}
}

export default InputEmail;
