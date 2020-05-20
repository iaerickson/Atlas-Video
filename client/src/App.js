import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Video from "./pages/Video";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import AgoraRTC from 'agora-rtc-sdk'




function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/video" component={Video} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
