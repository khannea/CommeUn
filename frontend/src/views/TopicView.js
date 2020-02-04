import React, { Component } from "react";
import "./TopicView.css";
import PostView from "./PostView";
import MainTopic from "../components/MainTopic";

class TopicView extends Component {
  render() {
    return (
      <div id="topic_wrapper">
        <MainTopic />
        {/* <PostView /> */}
      </div>
    );
  }
}

export default TopicView;
