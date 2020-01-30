import React, { Component } from "react";
import "./PostView.css";
import Post from "../components/Post";
import Button from "@material-ui/core/Button";

class PostView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "best",
      data: null
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
    if (nextProps.id !== this.props.id) {
      this.getAnswerFromDb();
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

  compareValues = (key, order = "asc") => {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
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
    if (this.state.type == "best") {
      this.setState({ type: "all" });
    } else {
      this.setState({ type: "best" });
    }
  };

  render() {
    let { data, type } = this.state;

    if (data) {
      data.sort(this.compareValues("likes", "desc"));
    }

    return (
      <div className="post_wrapper">
        {data && this.state.type === "all" && (
          <div>
            data.map(({(user, texte, date, id, likes, dislikes)}, index) => (
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
            ))
            <Button
              onClick={() => {
                this.switchType();
              }}
            >
              Rétracter
            </Button>
          </div>
        )}

        {data && data.length > 0 && this.state.type === "best" && (
          <div>
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
            <Button
              onClick={() => {
                this.switchType();
              }}
            >
              ...
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default PostView;
