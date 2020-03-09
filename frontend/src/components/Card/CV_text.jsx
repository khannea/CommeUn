import React from "react";
import Card from "@material-ui/core/Card";
import "./CV_text.css";

function CV_text({ texte }) {
  return (
    <Card className="textCard">
      <div className="textIn">{texte}</div>
      <div className="scroll_down"></div>
    </Card>
  );
}

export default CV_text;
