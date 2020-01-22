import React, { Component } from "react";
import "./Logout.css";
import { connect } from "react-redux";
import { logoutSuccess } from "../store/actions";
import Button from "@material-ui/core/Button";

class Logout extends Component {
  handleClick = () => {
    // fetch("http://localhost:4000/unsetToken", {
    fetch("https://testkhannea.herokuapp.com/unsetToken", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        // this.setState({
        //   connected: false
        // });
        this.props.dispatch(logoutSuccess());
        localStorage.clear();
      })
      .catch(error => console.error("Error:", error))
      .then(() => {
        this.props.action();
      });
  };

  onClick = event => {
    this.handleClick();
  };
  render() {
    return (
      <div>
        <Button type="button" onClick={this.onClick}>
          Déconnexion
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  loading: state.loading,
  error: state.error
});

export default connect(mapStateToProps)(Logout);
