import React from "react";
import "./Polaroid.css";

function PolaroidVideo({ texte, image, style }) {
  return (
    <div className="polaroid" style={style}>
      <video
        src={image}
        alt="Castle"
        style={{ width: "100%", borderRadius: "8px" }}
        autoPlay
        muted
        loop
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

export default PolaroidVideo;
