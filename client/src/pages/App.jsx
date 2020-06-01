import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "bulma/css/bulma.css";

import "./App.css";
import Index from "./index";
import Classroom from "./classroom";
import Tutoring from "./tutoring";
import Login from "./login";
import SignUp from "./signup";

class App extends Component {

	render() {
		return (
			<Router>
				<div className='full'>
					<Route exact path='/' component={Index} />
					<Route path='/classroom' component={Classroom} />
					<Route path='/tutoring' component={Tutoring} />
					<Route path='/login' component={Login} />
					<Route path='/signup' component={SignUp} />
				</div>
			</Router>
		);
	}

}

export default App;
