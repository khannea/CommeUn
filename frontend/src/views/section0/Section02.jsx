import React from "react";
import PolaroidVideo from "../../components/Card/PolaroidVideo";
import CvText from "../../components/Card/CvText";

function Section02() {
  return (
    <section id="section0_2" className="section">
      <CvText
        texte={"Développement d'un logiciel de représentation de fractal."}
      />
      <PolaroidVideo
        texte={["Fractal de Mandelbrot"]}
        image={require("../../img/fractol.mp4")}
        style={{
          left: "32%",
          top: "33%",
          width: "35%"
        }}
      />
    </section>
  );
}

export default Section02;
