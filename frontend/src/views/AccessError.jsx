import React, { Component } from "react";
import "./AccessError.css";

class AccessError extends Component {
  render() {
    return (
      <div className="alert alert-danger">Vous n'avez pas l'autorisation</div>
    );
  }
}

export default AccessError;
