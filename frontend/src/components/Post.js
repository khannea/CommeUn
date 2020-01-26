import React, { Component } from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import DefaultImg from "./default-user-avatar.png";
import DeletePost from "./DeletePost";
import "./Post.css";
import Cookies from "universal-cookie";
import Hidden from "@material-ui/core/Hidden";
const cookies = new Cookies();

class Post extends Component {
  constructor(msgId) {
    super();
    // this.goToAnswer = this.goToAnswer.bind(this);
    this.user = cookies.get("user");
  }

  // goToAnswer = () => {
  //   let path = `/Layout/Topic/` + this.props.id;
  //   this.props.history.push(path);
  // };

  onClickLike = () => {
    // fetch("https://testkhannea.herokuapp.com/likepost", {
    fetch("/api/likepost", {
      method: "POST",
      body: JSON.stringify({ msgId: this.props.id, user: this.user }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status === 401) {
          console.log("Probleme de like");
        } else {
          this.props.refresh();
        }
      })
      .catch(error => console.error("Error:", error));
  };

  onClickDislike = () => {
    //     fetch("https://testkhannea.herokuapp.com/dislikepost", {
    fetch("/api/dislikepost", {
      method: "POST",
      body: JSON.stringify({ msgId: this.props.id, user: this.user }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status === 401) {
          console.log("Probleme de dislike");
        } else {
          this.props.refresh();
        }
      })
      .catch(error => console.error("Error:", error));
  };

  render() {
    let newText = this.props.texte
      .split("\n")
      .map((item, i) => <p key={i}>{item}</p>);
    let success = false;
    if (this.props.likes > this.props.dislikes) {
      success = true;
    }
    return (
      <Card className="m-4">
        <div
          className={
            "card-header border " + (success ? "bg-success" : "bg-secondary")
          }
        >
          <div className="row">
            <div className="col">
              <i>{this.props.user}</i>
            </div>
            <div className="col">{this.props.date}</div>
          </div>
        </div>
        <Card.Body>
          <Row>
            <Col className="border-right col1st  col-auto">
              <Row className="h-100">
                <Col id="like_dislike_wrapper">
                  <div>
                    <div>
                      <Col>
                        <Image
                          className="banniere"
                          src={require("./like.png")}
                          width="20px"
                          height="20px"
                          style={{ cursor: "pointer" }}
                          onClick={this.onClickLike}
                        />
                      </Col>
                      <Col>
                        <b>&nbsp;{this.props.likes}</b>
                      </Col>
                    </div>
                    <div>
                      <Col>
                        <Image
                          className="banniere"
                          src={require("./dislike.png")}
                          width="20px"
                          height="20px"
                          style={{ cursor: "pointer" }}
                          onClick={this.onClickDislike}
                        />
                      </Col>
                      <Col>
                        <b>&nbsp;{this.props.dislikes}</b>
                      </Col>
                    </div>
                  </div>
                </Col>
                <Hidden smDown implementation="css">
                  <Col>
                    <div className="defaultuser img mx-auto">
                      <img src={DefaultImg} alt="Rien" />
                    </div>
                  </Col>
                </Hidden>
              </Row>
            </Col>
            <Col id="post_content_wrapper" className="border-dark">
              {newText}
              {this.props.user === localStorage.getItem("pseudo") && (
                <Col id="delete_wrapper" className="p-2 border-dark delete">
                  <DeletePost
                    id={this.props.id}
                    refresh={this.props.refresh}
                    editfunction={this.props.editfunction}
                    width="50%"
                  />
                </Col>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default Post;
