import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "./AddPost.css";

export default class AddPost extends Component {
  constructor(id) {
    super();
    this.state = {
      titre: null
    };
  }

  onSubmit = event => {
    event.preventDefault();
    fetch("/api/addTopic", {
      method: "POST",
      body: JSON.stringify({ titre: this.state.titre }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status === 401) {
          console.log("Probleme de AddTopic");
        } else {
          this.props.refresh();
          this.setState({ sent: true, titre: "..." });
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

  // handleKeyPress(target) {
  //   if(target.charCode==13){
  //     alert('Enter clicked!!!');
  //   }

  render() {
    return (
      <div className="addpost m-4">
        {this.state.sent && (
          <div className="alert alert-success m-0" role="alert">
            Topic créé.
          </div>
        )}
        <Form onSubmit={this.returnFalse}>
          <Form.Group>
            <Form.Label>Titre:</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="titre"
              value={this.state.titre}
              placeholder="..."
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
