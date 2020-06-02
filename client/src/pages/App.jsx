import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "bulma/css/bulma.css";

import "./App.css";
import Channel from "./channel";
import Classroom from "./classroom";
import Tutoring from "./tutoring";
import Login from "./login";
import SignUp from "./signup";

class App extends Component {
	render() {
		return (
			<Router>
				<div className='full'>
					<Route exact path='/' component={Login} />
					<Route path='/classroom' component={Classroom} />
					<Route path='/tutoring' component={Tutoring} />
					<Route path='/channel' component={Channel} />
					<Route path='/signup' component={SignUp} />
					<Route path='/login' component={Login} />
				</div>
			</Router>
		);
	}
}

export default App;
