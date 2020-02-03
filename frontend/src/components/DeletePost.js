import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./DeletePost.css";

export default class DeletePost extends Component {
  constructor(id) {
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
    this.props.editFunction();
  };

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          size="medium"
          onClick={this.delete}
        >
          Supprimer
        </Button>
        {!this.state.edit && (
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={this.loadedit}
          >
            Editer
          </Button>
        )}
      </div>
    );
  }
}
