import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authBegin, authSuccess } from "../store/actions";

function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false
      };
    }

    componentDidMount() {
      // const req = new Request("http://localhost:4000/checkToken", {
      // const req = new Request("https://testkhannea.herokuapp.com/checkToken", {
      const req = new Request("/api/checkToken", {
        method: "GET",
        cache: "default",
        credentials: "include"
      });
      fetch(req)
        .then(res => {
          if (res.status === 200) {
            this.props.dispatch(authBegin());
            this.props.dispatch(authSuccess());
            // console.log("React withAuth OK:Reponse 200");
            this.setState({ loading: false });
          } else {
            console.log("React withAuth : Faux");
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.log("React withAuth : Erreur");
          console.log(err);
          this.setState({ loading: false, redirect: true });
        });
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="./AccessError" />;
        // return <Redirect to="/login" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  };
}

export default connect(withAuth);
