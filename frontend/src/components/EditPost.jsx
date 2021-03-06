import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
// import './EditPost.css'

export default class EditPost extends Component {
  state = {
    texte: ""
  };

  componentDidMount() {
    this.loadedit();
  }

  componentDidUpdate(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.loadedit();
    }
  }

  loadedit = () => {
    let url = "/api/post/" + this.props.id;
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
        this.setState({
          texte: data[0].texte
        });
      })
      .catch(error => console.error("Error:", error));
  };

  onSubmit = event => {
    event.preventDefault();
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
          this.props.cancelEdit();
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

  render() {
    return (
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
        <Button
          variant="primary"
          type="button"
          className="mr-2"
          onClick={this.onSubmit}
        >
          Editer
        </Button>
        <Button variant="primary" type="button" onClick={this.props.cancelEdit}>
          Annuler
        </Button>
      </Form>
    );
  }
}
