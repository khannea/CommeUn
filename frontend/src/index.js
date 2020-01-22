import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import "bootstrap/dist/css/bootstrap.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import theme from "./Theme";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

import Layout from "./layouts/Layout.js";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { authReducer } from "./store/reducers";

const store = createStore(authReducer);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router>
        <Redirect to="/Layout" />
        <Switch>
          <Route path="/Layout" component={Layout} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
