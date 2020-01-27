import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import "./OriginPost.css";

function OriginPost({ user, texte, date, likes, dislikes }) {
  return (
    <div>
      <Card>
        <CardHeader
          avatar={<Avatar aria-label="recipe">Origine</Avatar>}
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title="Carte Material UI"
          subheader={date}
        />
        {texte}
      </Card>
    </div>
  );
}

export default OriginPost;
