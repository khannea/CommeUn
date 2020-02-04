import React, { Component } from "react";
import { Row, Col, Image } from "react-bootstrap";
import "./MainTopic.css";
import { Card, CardHeader, CardContent } from "@material-ui/core";

class MainTopic extends Component {
  state = {
    id: null,
    data: null
  };

  componentDidMount() {
    console.log("yoooo");
    this.setState(
      { id: this.props.location.pathname.split("/")[3] },
      this.getDataFromDb()
    );
  }

  getDataFromDb = () => {
    let url = "/api/topic/" + this.state.id;
    let req = new Request(url, {
      method: "GET",
      cache: "default",
      credentials: "include"
    });
    fetch(req)
      .then(res => {
        if (res.status === 401) {
          console.log("getDataFromDb n'a pas recu les topics.");
        } else {
          return res.json();
        }
      })
      .then(data => {
        this.setState({
          data: data
        });
      });
  };

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
        <Row>
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
        </Row>
      </div>
    );
  };

  render() {
    let { data, id } = this.state;
    // .split("\n")
    // .map((item, i) => <p key={i}>{item}</p>);

    return (
      <Card className="mx-4 my-2" elevation="0">
        {data && data.length > 0 && (
          <CardContent>
            <Row>
              {/* <Col id="avatar_wrapper" className="col-auto">
              <Avatar src="/broken-image.jpg" />
            </Col> */}
              <Col className="border-right col1st  col-auto">
                <Row className="h-100">
                  <Col id="like_dislike_wrapper">
                    {/* {this.renderLikeDislike(data)} */}
                  </Col>
                </Row>
              </Col>
              <Col id="post_content_wrapper" className="border-dark">
                <CardHeader title={data[0].user + " " + data[0].date} />
                {data[0].texte}
              </Col>
            </Row>
          </CardContent>
        )}
      </Card>
    );
  }
}

export default MainTopic;
