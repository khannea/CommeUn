import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
// import './EditPost.css'

export default class EditPost extends Component {
  constructor(id) {
    super(id);
    this.id = id.id;
    this.state = {
      texte: ""
    };
  }

  componentDidMount() {
    this.loadedit();
  }

  loadedit = () => {
    // let url = "http://localhost:4000/post/" + this.id;
    // let url = "    https://testkhannea.herokuapp.com/post/" + this.id;
    let url = "/api/post/" + this.id;
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
        console.log(data);
        this.setState({
          texte: data[0].texte
        });
        console.log(data[0].texte);
      })
      .catch(error => console.error("Error:", error));
  };

  onSubmit = event => {
    event.preventDefault();
    // fetch("http://localhost:4000/editpost", {
    fetch("/api/editpost", {
      method: "POST",
      body: JSON.stringify({ id: this.id, texte: this.state.texte }),
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
