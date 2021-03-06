import React, { Component } from "react";

import Post from "../components/Post";
import OriginPost from "../components/OriginPost";

import AddPost from "../components/AddPost";
import EditPost from "../components/EditPost";
import "./TopicView.css";

import Cookies from "universal-cookie";

const cookies = new Cookies();

class MessageView extends Component {
  state = {
    data: null,
    user: cookies.get("user"),
    editId: null,
    dataOrigin: null
  };
  constructor(props) {
    super(props);
    this.props = props;
    this.id = props.location.pathname.split("/")[3];
    this.goToAnswer = this.goToAnswer.bind(this);
  }

  goToAnswer = id => {
    let path = `/Layout/Message/` + id;
    this.props.history.push(path);
    this.id = this.props.location.pathname.split("/")[3];
  };

  componentDidMount() {
    this.getDataFromDb();
    this.getOriginFromDb();
  }

  componentDidUpdate(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.id = this.props.location.pathname.split("/")[3];
      this.getDataFromDb();
      this.getOriginFromDb();
    }
  }

  getOriginFromDb = () => {
    // let url = "http://localhost:4000/topics/" + this.id;
    // let url = "https://testkhannea.herokuapp.com/topics/" + this.id;
    let url = "/api/post/" + this.id;
    let req = new Request(url, {
      method: "GET",
      cache: "default",
      credentials: "include"
    });
    fetch(req)
      .then(res => {
        if (res.status === 401) {
          console.log("TopicView n'a pas recu les topics.");
        } else {
          // console.log("TopicView  a bien recu les topics.");
          return res.json();
        }
      })
      .then(dataOrigin => {
        if (dataOrigin.length > 0) {
          this.setState({
            dataOrigin: dataOrigin[0]
          });
        }
      });
  };

  getDataFromDb = () => {
    // let url = "http://localhost:4000/topics/" + this.id;
    // let url = "https://testkhannea.herokuapp.com/topics/" + this.id;
    let url = "/api/origin_posts/" + this.id;
    let req = new Request(url, {
      method: "GET",
      cache: "default",
      credentials: "include"
    });
    fetch(req)
      .then(res => {
        if (res.status === 401) {
          console.log("MessageView n'a pas recu les topics.");
        } else {
          // console.log("MessageView  a bien recu les topics.");
          return res.json();
        }
      })
      .then(data => {
        this.setState({
          data: data
        });
      });
  };

  goOnEdit = id => {
    this.setState({
      editId: id
    });
  };

  goOncancelEdit = () => {
    this.setState({
      editId: null
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

  render() {
    let myid = this.id;
    let { data, dataOrigin } = this.state;

    if (data) {
      data.sort(this.compareValues("likes", "desc"));
    }
    return (
      <div className="topicview">
        <div className="posts_box">
          {dataOrigin && (
            <OriginPost
              user={dataOrigin.user}
              texte={dataOrigin.texte}
              date={dataOrigin.date}
              // id={dataOrigin.id}
              // likes={dataOrigin.likes}
              // dislikes={dataOrigin.dislikes}
            />
          )}
          {data &&
            data.map(({ user, texte, date, id, likes, dislikes }, index) => (
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
                  editfunction={this.goOnEdit}
                  onMessageClick={this.goToAnswer}
                />
              </div>
            ))}
        </div>
        {!this.state.editId && (
          <div className="border-top">
            <AddPost id={myid} refresh={this.getDataFromDb} />
          </div>
        )}
        {this.state.editId && (
          <div className="border-top border-light">
            <EditPost
              editId={this.state.editId}
              cancelEdit={this.goOncancelEdit}
              refresh={this.getDataFromDb}
            />
          </div>
        )}
      </div>
    );
  }
}

export default MessageView;
