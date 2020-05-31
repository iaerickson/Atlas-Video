import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import 'bulma/css/bulma.css'

import './App.css'
import Index from './index'
import Classroom from './classroom'
import Tutoring from './tutoring'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="full">
          <Route exact path="/" component={Index} />
          <Route path="/classroom/:channelname"  component={Classroom} />
          <Route path="/tutoring" component={Tutoring} />
        </div>
      </Router>
    )
  }
}

export default App
