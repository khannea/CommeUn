import React, { Component } from "react";
import anime from "animejs";
import "./Curriculum.scss";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import RT from "./RT_castle.jpg";
import Particles from "react-particles-js";
import CardContent from "@material-ui/core/CardContent";

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
    if (this.state.screen == "60%") {
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
    this.setState({ screen: "60%" });
  };

  scrollEvent = event => {
    let timeout = 250;

    if (new Date() - lastCall < timeout) {
      return null;
    } else {
      lastCall = new Date();
      let section = this.state.section;
      console.log("0:" + section);
      if (event.deltaY > 0) {
        if (document.querySelector("#section" + (section + 1))) {
          this.setState({ section: section + 1 }, () => {
            let section = this.state.section;
            console.log("+1:" + section);
            anime({
              targets: ".section",
              translateY: -window.innerHeight * section,
              duration: 300,
              easing: "spring(1, 100, 100,0)"
            });
          });
        }
      } else {
        if (document.querySelector("#section" + (section - 1))) {
          this.setState({ section: section - 1 }, () => {
            let section = this.state.section;
            console.log("-1:" + section);
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

  letScene = nb => {
    if (nb == 1) {
      document.querySelector("#content1").style.zIndex = "2";
      document.querySelector("#content2").style.zIndex = "0";
      document.querySelector("#content3").style.zIndex = "0";
      anime({
        targets: "#content1",
        translateX: [-1000, 0],
        duration: 300,
        //width: ["40%", "60%"],
        easing: "spring(1, 100, 100,0)"
      });
    }

    if (nb == 2) {
      document.querySelector("#content2").style.zIndex = "2";
      document.querySelector("#content1").style.zIndex = "0";
      document.querySelector("#content3").style.zIndex = "0";
      anime({
        targets: "#content2",
        translateX: [-1000, 0],
        duration: 300,
        //width: ["40%", "60%"],
        easing: "spring(1, 100, 100,0)"
      });
    }

    if (nb == 3) {
      document.querySelector("#content3").style.zIndex = "2";
      document.querySelector("#content1").style.zIndex = "0";
      document.querySelector("#content2").style.zIndex = "0";
      anime({
        targets: "#content3",
        translateX: [-1000, 0],
        duration: 300,
        //width: ["40%", "60%"],
        easing: "spring(1, 100, 100,0)"
      });
    }
  };

  render() {
    let { scene, sceneOld, sceneNew } = this.state;
    let particleWidth = scene == 0 ? "window.innerWidth" : "100%";

    return (
      <div id="wrapper_curriculum">
        <div className="rect1">
          <Particles
            height={window.innerHeight}
            width={particleWidth}
            className="particle"
            params={{
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

          <div
            className="titreCv"
            id="titre0"
            onMouseEnter={() => {
              this.blurAllExept(0);
              if (scene !== 1) {
                this.setState({ scene: 1 }, () => this.letScene(1));
              }
            }}
          >
            École 42
          </div>
          <div
            className="titreCv"
            id="titre1"
            onMouseEnter={() => {
              this.blurAllExept(1);
              if (scene !== 2) {
                this.setState({ scene: 2 }, () => this.letScene(2));
              }
            }}
          >
            Centrale Nantes
          </div>
          <div
            className="titreCv"
            id="titre2"
            onMouseEnter={() => {
              this.blurAllExept(2);
              if (scene !== 3) {
                this.setState({ scene: 3 }, () => this.letScene(3));
              }
            }}
          >
            <div>CAPES</div>
            <div>mathématiques</div>
          </div>
        </div>

        <div
          id="content1"
          className="contentCv contentCv_wrapper"
          onClick={this.onClickScreen}
          onWheel={this.scrollEvent}
        >
          <div className="Filtre"></div>

          <section id="section0" className="section">
            <div className="wrapper_rt">
              <div className="image_rt"></div>
            </div>
            <Card className="textCard">
              <div className="textInRT">
                Développement d’un moteur graphique de type raytracing en C.
              </div>
              RT raytracer images
              <div className="scroll_down"></div>
            </Card>
            {/* <CardMedia
              onMouseEnter={() => {}}
              style={{
                width: "250px",
                height: "250px",
                position: "absolute",
                top: "50%"
              }}
              image={RT}
              title="Contemplative Reptile"
            /> */}
          </section>

          <section id="section1" className="section">
            <Card className="textCard">
              <div className="textInRT">2eme section</div>
              <div className="scroll_down"></div>
            </Card>
          </section>

          <section id="section2" className="section">
            <Card className="textCard">
              <div className="textInRT">3eme section</div>
              <div className="scroll_down"></div>
            </Card>
          </section>
        </div>

        <div
          id="content2"
          className="contentCvEcn contentCv_wrapper"
          onClick={this.onClickScreen}
        >
          <div className="Filtre"></div>
          <Card className="textCard" name="card2" id="card2">
            <div className="textInRT">Ingenieur généraliste</div>
            <div className="textInRT">
              Spécialité Énergie et Management de Projet
            </div>
            <div className="scroll_down"></div>
          </Card>
        </div>

        <div
          id="content3"
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
