import React, { Component } from "react";
import anime from "animejs";
import "./Curriculum.scss";
import Card from "@material-ui/core/Card";

import Particles from "react-particles-js";

import Section00 from "./section0/Section00";
import Section01 from "./section0/Section01";
import Section02 from "./section0/Section02";
import Section10 from "./section1/Section10";

let lastCall = 0;
var playing = false;

function play(id, titles) {
  console.log(playing);
  if (playing == false) {
    playing = true;

    var l = document.getElementById(id);
    var logoTitle = titles;
    var logoRandom = "";
    var possible = '-+*/|}{[]~\\":;?/.><=+-_)(*&^%$#@!)}';

    function generateRandomTitle(k, i, logoRandom, logoTitle) {
      setTimeout(function() {
        l.innerText = logoRandom;
        if (k == logoTitle.length - 1 && i == logoTitle[k].length - 1) {
          playing = false;
        }
      }, k * (50 * logoRandom.length + 1000) + i * 50);
    }

    for (var k = 0; k < logoTitle.length; k++) {
      for (var i = 0; i < logoTitle[k].length + 1; i++) {
        logoRandom = logoTitle[k].substr(0, i);
        for (var j = i; j < logoTitle[k].length; j++) {
          logoRandom += possible.charAt(
            Math.floor(Math.random() * possible.length)
          );
        }
        generateRandomTitle(k, i, logoRandom, logoTitle);
        logoRandom = "";
      }
    }
  }
}

class Curriculum extends Component {
  state = {
    scene: 0,
    section: 0,
    screen: "60%"
  };

  blurAllExept = nb => {
    let x = (nb + 1) % 3;
    let y = (nb + 2) % 3;

    if (nb >= 0) {
      var targetElm0 = document.querySelector("#titre" + nb);
      var targetElm1 = document.querySelector("#titre" + x);
      var targetElm2 = document.querySelector("#titre" + y);
      anime({
        targets: "#titre" + x + ",#titre" + y,
        duration: 200,
        update: function(anim) {
          targetElm0.style.filter = "blur(0px)";
          targetElm1.style.filter =
            "blur(" + (10 * anim.progress) / 100 + "px)";
          targetElm2.style.filter =
            "blur(" + (10 * anim.progress) / 100 + "px)";
        }
      });
    } else {
      var targetElm0 = document.querySelector("#titre0");
      var targetElm1 = document.querySelector("#titre1");
      var targetElm2 = document.querySelector("#titre2");
      anime({
        targets: "#titre" + x + ",#titre" + y,
        duration: 200,
        update: function(anim) {
          targetElm0.style.filter = "blur(0px)";
          targetElm1.style.filter = "blur(0px)";
          targetElm2.style.filter = "blur(0px)";
        }
      });
    }
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

    if (event.deltaY > 0 && section < 2) {
      this.setState({ section: section + 1 });
      if (section === 0) {
        const timeline = anime.timeline({});
        timeline.add({
          targets: "#section1_0",
          height: "100vh",
          width: "100%",
          duration: 1000,
          easing: "easeInOutSine",
          complete: function() {
            document.getElementById("word1").style.opacity = 1;
          }
        });
        anime({
          targets: "#section1_1",
          opacity: [0, 1],
          duration: 3000,
          easing: "easeInOutSine"
        });
        timeline.add({
          targets: "#word1",
          duration: 2500,
          begin: function() {
            play("word1", [
              "Une formation de qualité",
              "Une sélection difficile",
              "Une renomée internationale"
            ]);
          },
          complete: function() {
            document.getElementById("word2").style.opacity = 1;
          }
        });
      } else if (section === 1) {
        // anime({
        //   targets: ".specialite_texte",
        //   fontSize: "50px",
        //   fontWeight: 900,
        //   duration: 500
        //   //easing: "spring(1, 100, 100,0)"
        // });
        // anime({
        //   targets: ".specialite_wrapper",
        //   top: "15%",
        //   duration: 500
        //   //easing: "spring(1, 100, 100,0)"
        // });
      }
    } else {
      this.setState({ section: section - 1 });
      if (section === 1) {
        anime({
          targets: "#section1_0",
          height: "100px"

          // easing: "spring(1, 100, 100,0)"
        });
        anime({
          targets: "#section1_1",
          opacity: 0

          //easing: "spring(10, 100, 100,0)"
        });
        anime({
          targets: "#word1",
          opacity: 0
          //easing: "spring(100, 100, 100,0)"
        });
        anime({
          targets: "#word2",
          opacity: 0
          //easing: "spring(100, 100, 100,0)"
        });
        anime({
          targets: "#word3",
          opacity: 0
          // easing: "spring(100, 100, 100,0)"
        });
      } else if (section === 2) {
      }
    }
  };

  letScene = nb => {
    if (nb === 1) {
      document.querySelector("#content0").style.zIndex = "2";
      document.querySelector("#content1").style.zIndex = "0";
      document.querySelector("#content2").style.zIndex = "0";

      anime({
        targets: ".section",
        translateY: 0,
        duration: 0
      });

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
        <div
          className="rect1"
          onMouseLeave={() => {
            this.blurAllExept(scene - 1);
          }}
        >
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
            <span>École 42</span>
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
            <div className="titre_texte">Centrale Nantes</div>
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
            <div>CAPES mathématiques</div>
          </div>
        </div>

        <div
          id="content0"
          className="contentCv contentCv_wrapper"
          onClick={this.onClickScreen}
          onWheel={this.scrollEvent0}
        >
          <div className="Filtre"></div>

          <Section00 />
          <Section01 />
          <Section02 />
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
              <h1>Ingenieur généraliste</h1>
              <div className="specialite_wrapper">
                <h3 className="specialite_texte">
                  Spécialité Management de Projet et Energétique
                </h3>
              </div>

              <section
                id="section1_1"
                className="section1"
                style={{
                  opacity: "0",
                  width: "100%",
                  height: "100%"
                }}
              >
                <img
                  src={require("./Ecn_section1.jpg")}
                  style={{
                    position: "absolute",
                    top: "0%",
                    width: "auto",
                    height: "100vh"
                  }}
                />

                <div
                  id="word1"
                  className="word"
                  style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)"
                  }}
                ></div>
                <div
                  id="word2"
                  className="word"
                  style={{
                    position: "absolute",
                    top: "20%"
                  }}
                ></div>
                <div
                  id="word3"
                  className="word"
                  style={{
                    position: "absolute",
                    top: "70%"
                  }}
                ></div>
              </section>
            </Card>
          </section>
        </div>

        <div
          id="content2"
          className="contentCvTeacher contentCv_wrapper"
          onClick={this.onClickScreen}
        >
          <div className="Filtre"></div>
          <Section10 />
          {/* <Card className="textCard">
            <div className="textInRT">Enseignant collége et lycée</div>
            <div className="scroll_down"></div>
          </Card> */}
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
