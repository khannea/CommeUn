import React from "react";
import Polaroid from "../../components/Card/Polaroid";
import CvText from "../../components/Card/CvText";

function Section00() {
  return (
    <section id="section0_0" className="section">
      <CvText
        texte={"Développement d’un moteur graphique de type raytracing en C."}
      />
      <Polaroid
        texte={[
          "Gestion de la lumiere",
          "Aléatoire cohérent: Bruit de Perlin",
          "Réflection"
        ]}
        image={require("../../img/RT_castle.jpg")}
        style={{
          transform: "rotate(-9deg)",
          left: "20%",
          top: "40%",
          width: "25%"
        }}
      />
      <Polaroid
        texte={["Quadriques", "Réfraction", "Brillance"]}
        image={require("../../img/RT_mix.jpg")}
        style={{
          transform: "rotate(7deg)",
          right: "20%",
          top: "40%",
          width: "25%"
        }}
      />
    </section>
  );
}

export default Section00;
