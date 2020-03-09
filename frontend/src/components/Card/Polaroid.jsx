import React from "react";
import "./Polaroid.css";

function Polaroid({ texte, image, style }) {
  console.log(typeof texte);
  return (
    <div className="polaroid" style={style}>
      <img
        src={image}
        alt="Castle"
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <div className="polaroid_texte">
        <ul>
          {typeof texte === "object" &&
            texte.map((line, index) => <li key={index}>{line}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default Polaroid;
