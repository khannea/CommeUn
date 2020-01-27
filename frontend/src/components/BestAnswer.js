import React from "react";
import { Card, CardHeader, CardContent, Avatar } from "@material-ui/core";
import "./BestAnswer.css";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

function BestAnswer({ user, texte, date, likes, dislikes }) {
  return (
    <div className="origin_post mx-4 w-100">
      <Card>
        <CardHeader
          avatar={<Avatar aria-label="recipe">Origine</Avatar>}
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title="MEILLEUR RÉPONSE"
          subheader={"Par " + user + " à " + date}
        />
        <CardContent>
          <Typography variant="h6">{texte}</Typography>
        </CardContent>
      </Card>
      <Button color="secondary">...</Button>
    </div>
  );
}

export default BestAnswer;
