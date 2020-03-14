import React from "react";
import Polaroid from "../../components/Card/Polaroid";
import CvText from "../../components/Card/CvText";

function Section01() {
  return (
    <section id="section0_1" className="section">
      <CvText
        texte={"Développement d'un logiciel de modélisation de carte 3D."}
      />
      <Polaroid
        texte={["Algorithme de tracé de segment de Bresenham"]}
        image={require("../../img/fdf.jpg")}
        style={{
          transform: "rotate(-5deg)",
          left: "17%",
          top: "38%",
          width: "30%"
        }}
      />
      <Polaroid
        texte={["Représentation de carte complexes"]}
        image={require("../../img/fdf2.jpg")}
        style={{
          transform: "rotate(-2deg)",
          right: "16%",
          top: "40%",
          width: "30%"
        }}
      />
    </section>
  );
}

export default Section01;
