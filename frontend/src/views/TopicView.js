import React, { Component } from "react";
import "./TopicView.css";
import PostView from "./PostView";

class TopicView extends Component {
  render() {
    return (
      <div id="topic_wrapper">
        <PostView />
      </div>
    );
  }
}

export default TopicView;
