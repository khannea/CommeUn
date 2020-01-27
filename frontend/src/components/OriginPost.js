import React from "react";
import { Card, CardHeader, CardContent, Avatar } from "@material-ui/core";
import "./OriginPost.css";
import Typography from "@material-ui/core/Typography";

function OriginPost({ user, texte, date, likes, dislikes }) {
  return (
    <div className="origin_post m-4">
      <Card>
        <CardHeader
          avatar={<Avatar aria-label="recipe">Origine</Avatar>}
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title="MESSAGE D'ORIGINE"
          subheader={"Par " + user + " à " + date}
        />
        <Typography variant="h5">{texte}</Typography>
      </Card>
    </div>
  );
}

export default OriginPost;
