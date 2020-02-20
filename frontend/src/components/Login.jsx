import React, { Component } from "react";
import Logout from "./Logout";
import "./Login.css";
import { connect } from "react-redux";
import { authBegin, authSuccess } from "../store/actions";
import { withStyles } from "@material-ui/core/styles";
import styles from "./sidebarStyle.jsx";
import Button from "@material-ui/core/Button";
class Login extends Component {
  state = {
    pseudo: "",
    password: "",
    falsePassword: false,
    connected: false
  };

  componentDidMount() {
    this.checkToken();
  }

  checkToken = () => {
    // const req = new Request("https://testkhannea.herokuapp.com/checkToken", {
    const req = new Request("/api/checkToken", {
      method: "GET",
      cache: "default",
      credentials: "include"
    });
    fetch(req)
      .then(res => {
        console.log("checkToken status: " + res.status);
        if (res.status === 200) {
          console.log("Vous etes connecté");
          this.setState({ connected: true, falsePassword: false });

          this.props.dispatch(authBegin());
          this.props.dispatch(authSuccess());
        } else {
          this.setState({ connected: false });
          console.log("Vous n'etes pas connecté");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  register = event => {
    event.preventDefault();
    // fetch("https://testkhannea.herokuapp.com/register", {
    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(this.state),
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status === 401) {
          this.setState({ falsePassword: true });
        }
      })
      .catch(error => console.error("Error:", error));
  };

  onSubmit = event => {
    event.preventDefault();
    // fetch("https://testkhannea.herokuapp.com/authenticate", {
    fetch("/api/authenticate", {
      method: "POST",
      body: JSON.stringify(this.state),
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 401) {
          this.setState({ falsePassword: true });
        } else if (res.status === 404) {
          console.log("Probleme serveur");
        } else {
          // console.log(res.headers.get("pseudo"));
          localStorage.setItem("pseudo", res.headers.get("pseudo"));
          localStorage.setItem("token", res.headers.get("token"));
          localStorage.setItem("budget", res.headers.get("budget"));
        }
        // for(let entry of res.headers.entries()) {
        //   console.log(entry);
        // }
        this.checkToken();
      })
      .catch(error => console.error("Error:", error));
  };

  handler = () => {
    this.checkToken();
  };

  render() {
    const classes = this.props.classes;
    const { falsePassword, connected } = this.state;
    return (
      <div>
        <div className="notification">
          {falsePassword && (
            <div className="alert alert-danger m-0" role="alert">
              Mauvais identifiants.
            </div>
          )}
          {this.props.auth && (
            <div className="alert alert-success m-0" role="alert">
              Vous etes bien connecté!
            </div>
          )}
          {!this.props.auth && !falsePassword && (
            <div className="alert alert-warning m-0 invisible" role="alert">
              Rien
            </div>
          )}
        </div>
        <div id="login_logout_wrapper">
          {/* <div className="login_box"> */}
          {!this.props.auth && (
            <div className="login my-4 mx-5">
              <div className="h2">Connexion:</div>
              <form onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col">
                    <input
                      className="form-control"
                      type="pseudo"
                      name="pseudo"
                      placeholder="Pseudo"
                      value={this.state.pseudo}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>

                  <div className="col">
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="row my-4">
                  <div className="col">
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Se connecter
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={this.register}
                    >
                      S'inscrire
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          )}
          {/* </div> */}

          {this.props.auth && (
            <div className="logout_box">
              <Logout action={this.handler} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  loading: state.loading,
  error: state.error
});

// export default Login;
export default connect(mapStateToProps)(withStyles(styles)(Login));
