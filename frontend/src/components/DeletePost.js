import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./DeletePost.css";

export default class DeletePost extends Component {
  constructor() {
    super();
    this.state = {
      texte: "",
      edit: false
    };
  }

  delete = event => {
    event.preventDefault();
    // let url = "http://localhost:4000/deletePost/" + this.props.id;
    // let url = "https://testkhannea.herokuapp.com/deletePost/" + this.props.id;
    let url = "/api/deletePost/" + this.props.id;
    fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status === 401) {
          console.log("Probleme de DeletePost");
        } else {
          console.log("resfresh");
          this.props.refresh();
        }
      })
      .catch(error => console.error("Error:", error));
  };

  loadedit = () => {
    console.log("DEletePost edit Id: " + this.id);
    this.props.editfunction(this.id);
  };

  render() {
    return (
      <div>
        <Button
          variant="primary"
          type="button"
          className="border-0 bg-light mr-2"
          onClick={this.delete}
        >
          Supprimer
        </Button>
        {!this.state.edit && (
          <Button
            variant="primary"
            type="button"
            className="border-0 bg-light"
            onClick={this.loadedit}
          >
            Editer
          </Button>
        )}
      </div>
    );
  }
}
