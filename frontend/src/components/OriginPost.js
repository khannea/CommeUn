import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import "./OriginPost.css";

function OriginPost({ user, texte, likes, dislikes }) {
  return (
    <div>
      <Card>Carte MAterial UI {texte}</Card>
    </div>
  );
}

export default OriginPost;
