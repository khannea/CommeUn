import React, { Component } from "react";

import Post from "../components/Post";
import AddPost from "../components/AddPost";
import EditPost from "../components/EditPost";
import "./TopicView.css";

import Cookies from "universal-cookie";

// import ReactResizeDetector from "react-resize-detector";

const cookies = new Cookies();

class TopicView extends Component {
  state = {
    data: null,
    user: cookies.get("user"),
    edit: false,
    editId: null
  };
  constructor(id) {
    super(id);
    this.id = id.location.pathname.split("/")[2];
  }

  componentDidMount() {
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    // console.log("Je me refresh");
    // let url = "http://localhost:4000/topics/" + this.id;
    // let url = "https://testkhannea.herokuapp.com/topics/" + this.id;
    let url = "/api/topics/" + this.id;
    let req = new Request(url, {
      method: "GET",
      cache: "default",
      credentials: "include"
    });
    fetch(req)
      .then(res => {
        // console.log(res)
        if (res.status === 401) {
          console.log("TopicView n'a pas recu les topics.");
        } else {
          // console.log("TopicView  a bien recu les topics.");
          return res.json();
        }
      })
      .then(data => {
        // console.log(data);
        this.setState({
          data: data
        });
      });
  };

  goOnEdit = id => {
    this.setState({
      edit: true,
      editId: id
    });
  };

  goOncancelEdit = () => {
    this.setState({
      edit: false,
      editId: null
    });
  };

  render() {
    let myid = this.id;
    let { data } = this.state;
    return (
      <div className="topicview">
        <div className="posts_box">
          {/* <div className="posts_box mx-auto"> */}
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
                />
              </div>
            ))}
        </div>
        {!this.state.edit && (
          <div className="border-top">
            {/* <ReactResizeDetector handleHeight /> */}
            <AddPost id={myid} refresh={this.getDataFromDb} />
          </div>
        )}
        {this.state.edit && (
          <div className="border-top border-light">
            <EditPost
              id={this.state.editId}
              cancelEdit={this.goOncancelEdit}
              refresh={this.getDataFromDb}
            />
          </div>
        )}
      </div>
    );
  }
}

export default TopicView;
