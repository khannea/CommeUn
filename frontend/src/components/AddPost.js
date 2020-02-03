import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "./AddPost.css";

export default class AddPost extends Component {
  constructor(id) {
    super();
    this.state = {
      texte: ""
    };
  }

  onSubmit = event => {
    event.preventDefault();
    // fetch("http://localhost:4000/addPost", {
    // fetch("https://testkhannea.herokuapp.com/addPost", {
    fetch("/api/addPost", {
      method: "POST",
      body: JSON.stringify({
        texte: this.state.texte,
        originId: this.props.id
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status === 401) {
          console.log("Probleme de AddPost");
        } else {
          this.props.addpost_submit();
          this.setState({ texte: "..." });
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

  returnFalse = event => {
    event.preventDefault();
    return false;
  };

  render() {
    return (
      <div className="addpost m-4">
        <Form onSubmit={this.returnFalse}>
          <Form.Group>
            <Form.Label>Message:</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="texte"
              value={this.state.texte}
              placeholder="..."
              onChange={this.handleInputChange}
              onSubmit={this.returnFalse}
            />
          </Form.Group>
          <Form.Group controlId="formBasicChecbox">
            {/* <Form.Check
              type="checkbox"
              label="Vous avez relu votre message et êtes prêt a l'envoyé."
            /> */}
          </Form.Group>
          <Button
            variant="primary"
            type="button"
            onClick={this.onSubmit}
            onSubmit={this.returnFalse}
          >
            Envoyé
          </Button>
        </Form>
      </div>
    );
  }
}
