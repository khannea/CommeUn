import React from "react";
import Card from "@material-ui/core/Card";
import "./CvText.css";

function CvText({ texte }) {
  return (
    <Card className="textCard">
      <div className="textIn">{texte}</div>
      <div className="scroll_down"></div>
    </Card>
  );
}

export default CvText;
