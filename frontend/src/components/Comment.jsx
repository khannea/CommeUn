import React, { Component } from "react";
import { Row, Col, Image } from "react-bootstrap";
import DefaultImg from "./default-user-avatar.png";
import DeletePost from "./DeletePost";
import PostView from "../views/PostView";
import "./Post.css";
import Cookies from "universal-cookie";
import Button from "@material-ui/core/Button";
import { Card, CardHeader, CardContent, Avatar, Grid } from "@material-ui/core";

import AddPost from "./AddPost";

const cookies = new Cookies();

class Post extends Component {
  state = {
    answer: false
  };

  constructor(props) {
    super(props);
    this.user = cookies.get("user");
  }

  onClickLike = () => {
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

  renderLikeDislike = () => {
    return (
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
    );
  };

  render() {
    let texte = this.props.texte
      .split("\n")
      .map((item, i) => <p key={i}>{item}</p>);
    let success = false;
    let answer = this.state.answer;

    if (this.props.likes > this.props.dislikes) {
      success = true;
    }

    return (
      <Card className="m-2">
        <CardContent>
          <Row>
            <Col id="avatar_wrapper" className="col-auto">
              <Avatar src="/broken-image.jpg" />
            </Col>
            <Col className="border-right col1st  col-auto">
              <Row className="h-100">
                <Col id="like_dislike_wrapper">{this.renderLikeDislike()}</Col>
              </Row>
            </Col>
            <Col id="post_content_wrapper" className="border-dark">
              <CardHeader title={this.props.user + " " + this.props.date} />
              {texte}
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
          <PostView origin_id={this.props.origin_id} />
        </CardContent>
      </Card>
    );
  }
}

export default Post;
