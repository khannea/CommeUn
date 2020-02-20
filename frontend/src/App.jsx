import React, { Component } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import theme from "./Theme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import Letter from "./Letter";
import Next from "./Next";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <Redirect to="/Letter" />

            <div className="titre_site">
              <span className="titre_part1">Comme</span>
              <span className="titre_part2">Un</span>
            </div>

            <Switch>
              <Route path="/Letter" component={Letter} />
              <Route path="/Next" component={Next} />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
