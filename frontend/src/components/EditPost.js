import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
// import './EditPost.css'

export default class EditPost extends Component {
  constructor(id) {
    super();
    this.state = {
      texte: ""
    };
  }

  componentDidMount() {
    this.loadedit(this.props.id);
  }

  componentDidUpdate(nextProps) {
    console.log("next: " + nextProps.id);
    console.log("props.id: " + this.props.id);
    if (nextProps.id !== this.props.id) {
      this.loadedit(this.props.id);
    }
  }

  // componentWillUpdate() {
  //   this.loadedit();
  // }

  loadedit = loadId => {
    // let url = "http://localhost:4000/post/" + this.id;
    // let url = "    https://testkhannea.herokuapp.com/post/" + this.id;
    let url = "/api/post/" + loadId;
    fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status === 401) {
          console.log("Probleme de editPost");
        } else {
          return response.json();
        }
      })
      .then(data => {
        this.setState(
          {
            texte: data[0].texte
          },
          () => {
            console.log(data[0].texte);
          }
        );
      })
      .catch(error => console.error("Error:", error));
  };

  onSubmit = event => {
    event.preventDefault();
    // fetch("http://localhost:4000/editpost", {
    fetch("/api/editpost", {
      method: "POST",
      body: JSON.stringify({ id: this.props.id, texte: this.state.texte }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status === 401) {
          console.log("Probleme de EditPOst Submit");
        } else {
          console.log("je refresh dans EditPost");
          this.props.refresh();
          this.annuler();
        }
      })
      .catch(error => console.error("Error:", error));
  };

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  annuler = () => {
    this.props.cancelEdit();
  };

  render() {
    return (
      <div className="m-4">
        <Form onSubmit={this.returnFalse}>
          <Form.Group>
            <Form.Label>Message:</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="texte"
              value={this.state.texte}
              placeholder={this.state.texte}
              onChange={this.handleInputChange}
              onSubmit={this.returnFalse}
            />
          </Form.Group>
          <Form.Group controlId="formBasicChecbox">
            <Form.Check
              type="checkbox"
              label="Vous avez relu votre message et êtes prêt a l'envoyé."
            />
          </Form.Group>
          <Button
            variant="primary"
            type="button"
            className="mr-2"
            onClick={this.onSubmit}
          >
            Editer
          </Button>
          <Button variant="primary" type="button" onClick={this.annuler}>
            Annuler
          </Button>
        </Form>
      </div>
    );
  }
}
