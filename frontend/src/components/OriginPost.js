import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import "./OriginPost.css";

function OriginPost({ user, texte, likes, dislikes }) {
  return (
    <div>
      <Card>
        <CardHeader
          avatar={<Avatar aria-label="recipe">Origin</Avatar>}
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title="Carte Material UI"
          subheader="September 14, 2016"
        />
        {texte}
      </Card>
    </div>
  );
}

export default OriginPost;
