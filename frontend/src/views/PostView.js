import React, { Component } from "react";
import "./PostView.css";
import Post from "../components/Post";
import Button from "@material-ui/core/Button";

import { Card, CardHeader, CardContent, Avatar, Grid } from "@material-ui/core";
import AddPost from "../components/AddPost";

class PostView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "best",
      data: null,
      answer: false,
      sent: false
    };
    this.props = props;
  }

  componentDidMount() {
    if (!this.props.origin_id) {
      this.props.origin_id = this.props.location.pathname.split("/")[3];
      this.setState({ type: "all" });
    }
    this.getDataFromDb();
  }

  componentDidUpdate(nextProps) {
    if (nextProps.origin_id !== this.props.origin_id) {
      this.getDataFromDb();
    }
  }

  getDataFromDb = () => {
    let url = "/api/origin_posts/" + this.props.origin_id;
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

  addpost_submit = () => {
    this.setState({ answer: false, type: "all", sent: true });
    this.getDataFromDb();
  };

  compareValues = (key, order = "asc") => {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  };

  switchType = () => {
    if (this.state.type == "best" || this.state.type == "none") {
      this.setState({ type: "all" });
    } else {
      this.setState({ type: "best" });
    }
  };

  render() {
    let { data, answer, type, sent } = this.state;

    if (data) {
      data.sort(this.compareValues("likes", "desc"));
    }

    return (
      <div className="post_wrapper">
        {sent && (
          <div className="alert alert-success m-0" role="alert">
            Message envoyé.
          </div>
        )}
        {!answer && (
          <Button
            color="primary"
            size="small"
            onClick={() => {
              if (answer === false) {
                this.setState({ answer: true });
              } else {
                this.setState({ answer: false });
              }
            }}
          >
            Répondre
          </Button>
        )}
        {answer && (
          <Card className="m-4 w-100">
            <CardContent>
              <AddPost
                id={this.props.origin_id}
                addpost_submit={this.addpost_submit}
              />
            </CardContent>
          </Card>
        )}
        {data && type !== "none" && data.length > 0 && (
          <Post
            user={data[0].user}
            texte={data[0].texte}
            date={data[0].date}
            key={data[0].index}
            id={data[0].id}
            likes={data[0].likes}
            dislikes={data[0].dislikes}
            refresh={this.getDataFromDb}
            origin_id={data[0].id}
          />
        )}

        {data &&
          type === "all" &&
          data.map(
            ({ user, texte, date, id, likes, dislikes }, index) =>
              index !== 0 && (
                <div key={index}>
                  <Post
                    user={user}
                    texte={texte}
                    date={date}
                    key={index}
                    id={id}
                    likes={likes}
                    dislikes={dislikes}
                    refresh={this.getDataFromDb}
                    origin_id={id}
                  />
                </div>
              )
          )}

        {this.state.type === "all" && (
          <Button
            onClick={() => {
              this.switchType();
            }}
          >
            Rétracter
          </Button>
        )}

        {data && data.length > 1 && type !== "all" && (
          <div>
            <Button
              variant="reponse"
              onClick={() => {
                this.switchType();
              }}
            >
              ...{data.length - 1} réponses
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default PostView;
