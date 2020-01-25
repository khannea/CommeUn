import React, { Component } from "react";

import Topic from "../components/Topic";
import AddTopic from "../components/AddTopic";

class ForumView extends Component {
  state = {
    data: null
  };

  constructor() {
    super();
    this.goToTopic = this.goToTopic.bind(this);
  }

  goToTopic(id) {
    let path = `/Layout/Topic/` + id;
    this.props.history.push(path);
  }

  componentDidMount() {
    this.getDataFromDb();
    this.getCookie();
  }

  // goToTopic = (id) => {
  //   console.log('id du topic: '+id);
  //   return null;
  // }

  getDataFromDb = () => {
    // const req = new Request("http://localhost:4000/topics", {
    // const req = new Request("https://testkhannea.herokuapp.com/topics", {
    const req = new Request("/api/topics", {
      method: "GET",
      cache: "default",
      credentials: "include"
    });
    fetch(req)
      .then(res => {
        if (res.status === 401) {
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

  getCookie = () => {
    // const req = new Request("http://localhost:4000/setuser", {
    // const req = new Request("https://testkhannea.herokuapp.com/setuser", {
    const req = new Request("/api/setuser", {
      method: "GET",
      cache: "default",
      credentials: "include"
    });
    fetch(req).then(res => {
      if (res.status === 401) {
        console.log("ForumAccueil n'a pas recu les categories");
      } else {
        // console.log("Requete cookie reussie!!");
        // return res.json();
      }
    });
  };

  render() {
    const { data } = this.state;

    return (
      <div className="topics">
        {data &&
          data.map(({ id, titre, user }, index) => (
            <Topic
              titre={titre}
              user={user}
              key={index}
              id={id}
              onTopicClick={this.goToTopic}
            />
          )) && <AddTopic />}
      </div>
    );
  }
}

export default ForumView;
