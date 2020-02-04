import React, { Component } from "react";
import "./TopicView.css";
import PostView from "./PostView";
import MainTopic from "../components/MainTopic";

class TopicView extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    let id = this.props.location.pathname.split("/")[3];
    return (
      <div id="topic_wrapper">
        <MainTopic id={id} />
        <PostView origin_id={id} />
      </div>
    );
  }
}

export default TopicView;
