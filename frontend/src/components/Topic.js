import React from "react";
import { Card } from "react-bootstrap";
import DefaultTopic from "../default-topic.jpg";
import "./Topic.css";

const Topic = ({ titre, user, id, onTopicClick }) => (
  <Card
    className="mx-auto w-75 my-4 topic"
    onClick={() => {
      onTopicClick(id);
    }}
  >
    <div className="topic_hover" />
    <div className="card-header border bg-secondary">
      <div className="row">
        <div className="col-1" />
        <div className="col-7">
          <i>{user}</i>
        </div>
      </div>
    </div>
    <Card.Body className="p-0 ">
      <div className="row m-0 w-100">
        <div className="p-3 col-1 border-right text-center">
          <img src={DefaultTopic} alt="topic" className="topic_img" />
        </div>
        <div className="p-4 col-7 border-dark">{titre}</div>
      </div>
    </Card.Body>
  </Card>
);

export default Topic;
