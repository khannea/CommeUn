import React, { Component } from "react";
import anime from "animejs";
import "./Curriculum.scss";
import Card from "@material-ui/core/Card";

import Particles from "react-particles-js";

import Polaroid from "../components/Card/Polaroid";
import PolaroidVideo from "../components/Card/PolaroidVideo";

import CV_text from "../components/Card/CV_text";

let lastCall = 0;

class Curriculum extends Component {
  state = {
    scene: 0,
    section: 0,
    screen: "60%"
  };

  blurAllExept = nb => {
    let x = (nb + 1) % 3;
    let y = (nb + 2) % 3;
    var targetElm0 = document.querySelector("#titre" + nb);
    var targetElm1 = document.querySelector("#titre" + x);
    var targetElm2 = document.querySelector("#titre" + y);
    anime({
      targets: "#titre" + x + ",#titre" + y,
      duration: 200,
      update: function(anim) {
        targetElm0.style.filter = "blur(0px)";
        targetElm1.style.filter = "blur(" + (10 * anim.progress) / 100 + "px)";
        targetElm2.style.filter = "blur(" + (10 * anim.progress) / 100 + "px)";
      }
    });
  };

  onClickScreen = () => {
    if (this.state.screen === "60%") {
      this.makeFullScreen();
    } else {
      this.makeNormalScreen();
    }
  };

  makeFullScreen = () => {
    this.setState({ screen: "85%" });
    anime({
      targets: ".contentCv_wrapper",
      duration: 1000,
      position: "absolute",
      width: ["60%", "85%"],
      left: "15%",
      easing: "spring(2, 100, 100, 1)"
    });
    anime({
      targets: ".rect1",
      duration: 1000,
      minWidth: ["40%", "15%"],
      fontSize: "1vw",
      width: ["40%", "15%"],
      easing: "spring(2, 100, 100, 1)"
    });
    anime({
      targets: ".textCard",
      duration: 1000,
      height: ["70%", "90%"],
      easing: "spring(2, 100, 100, 1)"
    });
  };

  makeNormalScreen = () => {
    anime({
      targets: ".contentCv_wrapper",
      duration: 1000,
      position: "absolute",
      width: ["85%", "60%"],
      left: "40%",
      easing: "spring(2, 100, 100, 1)"
    });
    anime({
      targets: ".rect1",
      duration: 1000,
      minWidth: ["15%", "40%"],
      fontSize: "4vw",
      width: ["15%", "40%"],
      easing: "spring(2, 100, 100, 1)"
    });
    anime({
      targets: ".textCard",
      duration: 1000,
      height: ["90%", "70%"],
      easing: "spring(2, 100, 100, 1)"
    });
    this.setState({ screen: "60%" });
  };

  scrollEvent0 = event => {
    let timeout = 250;

    if (new Date() - lastCall < timeout) {
      return null;
    } else {
      lastCall = new Date();
      let section = this.state.section;
      if (event.deltaY > 0) {
        if (document.querySelector("#section0_" + (section + 1))) {
          this.setState({ section: section + 1 }, () => {
            let section = this.state.section;
            anime({
              targets: ".section",
              translateY: -window.innerHeight * section,
              duration: 300,
              easing: "spring(1, 100, 100,0)"
            });
          });
        }
      } else {
        if (document.querySelector("#section0_" + (section - 1))) {
          this.setState({ section: section - 1 }, () => {
            let section = this.state.section;
            anime({
              targets: ".section",
              translateY: -window.innerHeight * section,
              duration: 300,
              easing: "spring(1, 100, 100,0)"
            });
          });
        }
      }
    }
  };

  scrollEvent1 = event => {
    let section = this.state.section;

    if (event.deltaY > 0) {
      this.setState({ section: section + 1 });
      if (section === 0) {
        anime({
          targets: "#section1_0",
          height: "100vh",
          width: "100%",
          duration: 300,
          easing: "spring(1, 100, 100,0)"
        });
        anime({
          targets: "#section1_1",
          opacity: [0, 1],
          duration: 300,
          easing: "spring(10, 100, 100,0)"
        });
        anime({
          targets: ".word1",
          opacity: [0, 1],
          easing: "spring(20, 100, 100,0)"
        });
        anime({
          targets: ".word2",
          opacity: [0, 1],
          easing: "spring(20, 100, 100,0)"
        });
        anime({
          targets: ".word3",
          opacity: [0, 1],
          easing: "spring(20, 100, 100,0)"
        });
      } else if (section === 1) {
        console.log("ici");
        anime({
          targets: ".specialite",
          fontSize: "50px",
          fontWeight: 900,
          duration: 500,
          position: "absolute",
          top: "40%",
          easing: "spring(1, 100, 100,0)"
        });
      }
    } else {
      this.setState({ section: section - 1 });
      if (section === 1) {
        anime({
          targets: "#section1_0",
          height: "auto",
          width: "100%",
          duration: 300,
          easing: "spring(1, 100, 100,0)"
        });
        anime({
          targets: "#section1_1",
          opacity: [1, 0],
          duration: 300,
          easing: "spring(10, 100, 100,0)"
        });
        anime({
          targets: ".word1",
          opacity: [1, 0],
          easing: "spring(100, 100, 100,0)"
        });
        anime({
          targets: ".word2",
          opacity: [1, 0],
          easing: "spring(100, 100, 100,0)"
        });
        anime({
          targets: ".word3",
          opacity: [1, 0],
          easing: "spring(100, 100, 100,0)"
        });
      } else if (section === 2) {
        console.log("ici");
        anime({
          targets: ".specialite",
          fontSize: "40px",
          fontWeight: 500,
          duration: 500,
          easing: "spring(1, 100, 100,0)"
        });
      }
    }
  };

  letScene = nb => {
    if (nb === 1) {
      document.querySelector("#content0").style.zIndex = "2";
      document.querySelector("#content1").style.zIndex = "0";
      document.querySelector("#content2").style.zIndex = "0";
      anime({
        targets: "#content0",
        translateX: [-1000, 0],
        duration: 300,
        //width: ["40%", "60%"],
        easing: "spring(1, 100, 100,0)"
      });
    }

    if (nb === 2) {
      document.querySelector("#content1").style.zIndex = "2";
      document.querySelector("#content0").style.zIndex = "0";
      document.querySelector("#content2").style.zIndex = "0";
      anime({
        targets: "#content1",
        translateX: [-1000, 0],
        duration: 300,
        //width: ["40%", "60%"],
        easing: "spring(1, 100, 100,0)"
      });
    }

    if (nb === 3) {
      document.querySelector("#content2").style.zIndex = "2";
      document.querySelector("#content0").style.zIndex = "0";
      document.querySelector("#content1").style.zIndex = "0";
      anime({
        targets: "#content2",
        translateX: [-1000, 0],
        duration: 300,
        //width: ["40%", "60%"],
        easing: "spring(1, 100, 100,0)"
      });
    }
  };

  mySectionParticle = nb => {
    let particleWidth = this.state.scene === 0 ? window.innerWidth : "100%";

    return (
      <Particles
        height={window.innerHeight}
        width={particleWidth}
        className="particle"
        params={{
          particles: {
            number: {
              density: { enable: true, value_area: 700 }
            }
          },
          opacity: {
            value: 0.9,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          interactivity: {
            detect_on: "windows",
            events: {
              onhover: {
                enable: true,
                mode: "repulse"
              },
              onclick: {
                enable: true,
                mode: "push"
              },
              resize: true
            }
          }
        }}
      />
    );
  };

  render() {
    let { scene } = this.state;
    return (
      <div id="wrapper_curriculum">
        {this.mySectionParticle(this.state.section)}
        <div className="rect1">
          {this.mySectionParticle(this.state.section)}
          <div
            className="titreCv"
            id="titre0"
            onClick={() => {
              if (scene !== 1) {
                this.setState({ scene: 1, section: 0 }, () => this.letScene(1));
              }
            }}
            onMouseEnter={() => {
              this.blurAllExept(0);
            }}
          >
            École 42
          </div>
          <div
            className="titreCv"
            id="titre1"
            onClick={() => {
              if (scene !== 2) {
                this.setState({ scene: 2, section: 0 }, () => this.letScene(2));
              }
            }}
            onMouseEnter={() => {
              this.blurAllExept(1);
            }}
          >
            Centrale Nantes
          </div>
          <div
            className="titreCv"
            id="titre2"
            onClick={() => {
              if (scene !== 3) {
                this.setState({ scene: 3, section: 0 }, () => this.letScene(3));
              }
            }}
            onMouseEnter={() => {
              this.blurAllExept(2);
            }}
          >
            <div>CAPES</div>
            <div>mathématiques</div>
          </div>
        </div>

        <div
          id="content0"
          className="contentCv contentCv_wrapper"
          onClick={this.onClickScreen}
          onWheel={this.scrollEvent0}
        >
          <div className="Filtre"></div>

          <section id="section0_0" className="section">
            <CV_text
              texte={
                "Développement d’un moteur graphique de type raytracing en C."
              }
            />
            <Polaroid
              texte={[
                "Gestion de la lumiere",
                "Aléatoire cohérent: Bruit de Perlin",
                "Réflection"
              ]}
              image={require("./RT_castle.jpg")}
              style={{
                transform: "rotate(-9deg)",
                left: "20%",
                top: "40%",
                width: "25%"
              }}
            />
            <Polaroid
              texte={["Quadriques", "Réfraction", "Brillance"]}
              image={require("./RT_mix.jpg")}
              style={{
                transform: "rotate(7deg)",
                right: "20%",
                top: "40%",
                width: "25%"
              }}
            />
          </section>

          <section id="section0_1" className="section">
            <CV_text
              texte={
                "Développement d'une logiciel de modélisation de carte 3D."
              }
            />
            <Polaroid
              texte={["Algorithme de tracé de segment de Bresenham"]}
              image={require("./fdf.jpg")}
              style={{
                transform: "rotate(-5deg)",
                left: "17%",
                top: "38%",
                width: "30%"
              }}
            />
            <Polaroid
              texte={["Représentation de carte complexes"]}
              image={require("./fdf2.jpg")}
              style={{
                transform: "rotate(-2deg)",
                right: "16%",
                top: "40%",
                width: "30%"
              }}
            />
          </section>

          <section id="section0_2" className="section">
            <CV_text
              texte={
                "Développement d'un logiciel de représentation de fractal."
              }
            />
            {/* <Polaroid
              texte={["Fractal de Mandelbrot"]}
              image={require("./fractol.jpg")}
              style={{
                left: "32%",
                top: "35%",
                width: "35%"
              }}
            /> */}
            <PolaroidVideo
              texte={["Fractal de Mandelbrot"]}
              image={require("./final.mp4")}
              style={{
                left: "32%",
                top: "33%",
                width: "35%"
              }}
            />
          </section>
        </div>

        <div
          id="content1"
          className="contentCvEcn contentCv_wrapper"
          onClick={this.onClickScreen}
          onWheel={this.scrollEvent1}
        >
          <section id="section1_0" className="section1">
            <Card id="bgEcn">
              <div className="Filtre"></div>
              <p>
                <h1>Ingenieur généraliste</h1>
              </p>
              <div>
                <h3 className="specialite">
                  spécialité Management de Projet et Energétique
                </h3>
              </div>
            </Card>
          </section>

          <section
            id="section1_1"
            className="section1"
            style={{ opacity: "0", width: "100%", position: "absolute" }}
          >
            <img
              src={require("./Ecn_section1.jpg")}
              style={{ width: "100%" }}
            />
            <div
              className="word1"
              style={{ position: "absolute", top: "20%", right: "10%" }}
            >
              <h1>Une formation de qualité</h1>
            </div>
            <div className="word2" style={{ position: "absolute", top: "40%" }}>
              <h1>Une sélection difficile</h1>
            </div>
            <div
              className="word3"
              style={{ position: "absolute", top: "70%", left: "30%" }}
            >
              <h1>Une renomée international</h1>
            </div>
          </section>
        </div>

        <div
          id="content2"
          className="contentCvTeacher contentCv_wrapper"
          onClick={this.onClickScreen}
        >
          <div className="Filtre"></div>
          <Card className="textCard">
            <div className="textInRT">Enseignant collége et lycée</div>
            <div className="scroll_down"></div>
          </Card>
        </div>

        <div
          id="contentDefault"
          className="contentDefault contentCv_wrapper"
        ></div>
      </div>
    );
  }
}

export default Curriculum;
