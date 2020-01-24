import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "./AddPost.css";

export default class AddPost extends Component {
  constructor(id) {
    super();
    this.state = {
      texte: "",
      sent: false
    };
  }

  onSubmit = event => {
    console.log("Message ID: " + this.props.id);
    event.preventDefault();
    // fetch("http://localhost:4000/addPost", {
    // fetch("https://testkhannea.herokuapp.com/addPost", {
    fetch("/api/addPost", {
      method: "POST",
      body: JSON.stringify({ texte: this.state.texte, topicId: this.props.id }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status === 401) {
          console.log("Probleme de AddPOst");
        } else {
          this.props.refresh();
          this.setState({ sent: true });
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
          <div className="alert alert-sucess m-0" role="alert">
            Message envoyé.
          </div>
        )}
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
