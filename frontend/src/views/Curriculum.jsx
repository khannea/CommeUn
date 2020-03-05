import React, { Component } from "react";
import anime from "animejs";
import "./Curriculum.scss";
import Card from "@material-ui/core/Card";
import * as Scroll from "react-scroll";
import Particles from "react-particles-js";

var scrollSpy = Scroll.scrollSpy;

let newScrollPosition = 0;
let oldScrollPosition = 0;

class Curriculum extends Component {
  state = {
    sceneOld: 0,
    scene: 0,
    section: 1
  };

  constructor(props) {
    super(props);
    for (let i = 1; i < 4; i++) {
      this["contentRef" + i] = 1;
    }
  }

  componentDidMount() {
    window.addEventListener("wheel", this.scrollEvent);

    scrollSpy.update();
  }

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

  unblurAll = () => {
    return null;

    var targetElm0 = document.querySelector("#titre0");
    var targetElm1 = document.querySelector("#titre1");
    var targetElm2 = document.querySelector("#titre2");
    anime({
      targets: "#titre0,#titre1,#titre2",
      duration: 200,
      update: function(anim) {
        targetElm0.style.filter = "blur(0px)";
        targetElm1.style.filter = "blur(0px)";
        targetElm2.style.filter = "blur(0px)";
      }
    });
  };

  scrollTo = (offset, callback) => {
    // window.removeEventListener("scroll", this.scrollEvent);
    const onScroll = () => {
      if (window.pageYOffset === offset) {
        console.log("ici");
        window.removeEventListener("scroll", onScroll);
        // window.addEventListener("scroll", this.scrollEvent);
        callback();
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    window.scrollTo({
      top: offset,
      behavior: "smooth"
    });
  };

  scrollEvent = () => {
    newScrollPosition = window.scrollY;
    console.log(window);
    //window.removeEventListener("wheel", this.scrollEvent);
    let section = this.state.section;

    // if (newScrollPosition - oldScrollPosition > 0) {
    // if (
    //   this["contentRef" + (section + 1)] != null &&
    //   this["contentRef" + (section + 1)].current != null
    // ) {
    if (this["contentRef" + (section + 1)])
      anime({
        targets: "#section" + (section + 1) + ",#section" + section,
        translateY: -(window.height / 2),
        duration: 300,
        easing: "spring(1, 100, 100,0)"
      });
    // this.scrollTo(
    //   this["contentRef" + (section + 1)].current.offsetTop,
    //   () => {
    //     this.setState({ section: section + 1 }, () => {
    //       oldScrollPosition = window.scrollY;
    //       //window.addEventListener("wheel", this.scrollEvent);
    //     });
    //   }
    // );
    // }
  };
  // } else if (newScrollPosition - oldScrollPosition < 0) {
  //   if (
  //     this["contentRef" + (section - 1)] != null &&
  //     this["contentRef" + (section - 1)].current != null
  //   ) {
  //     this.scrollTo(
  //       this["contentRef" + (section - 1)].current.offsetTop,
  //       () => {
  //         this.setState({ section: section - 1 }, () => {
  //           oldScrollPosition = window.scrollY;
  //           //window.addEventListener("wheel", this.scrollEvent);
  //         });
  //       }
  //     );
  //   }
  // }
  //};

  // scrollEvent = () => {
  //   newScrollPosition = window.scrollY;
  //   console.log("WHEEELLL " + (newScrollPosition - oldScrollPosition));
  //   //window.removeEventListener("wheel", this.scrollEvent);
  //   let section = this.state.section;

  //   if (newScrollPosition - oldScrollPosition > 0) {
  //     if (
  //       this["contentRef" + (section + 1)] != null &&
  //       this["contentRef" + (section + 1)].current != null
  //     ) {
  //       this.scrollTo(
  //         this["contentRef" + (section + 1)].current.offsetTop,
  //         () => {
  //           this.setState({ section: section + 1 }, () => {
  //             oldScrollPosition = window.scrollY;
  //             //window.addEventListener("wheel", this.scrollEvent);
  //           });
  //         }
  //       );
  //     }
  //   } else if (newScrollPosition - oldScrollPosition < 0) {
  //     if (
  //       this["contentRef" + (section - 1)] != null &&
  //       this["contentRef" + (section - 1)].current != null
  //     ) {
  //       this.scrollTo(
  //         this["contentRef" + (section - 1)].current.offsetTop,
  //         () => {
  //           this.setState({ section: section - 1 }, () => {
  //             oldScrollPosition = window.scrollY;
  //             //window.addEventListener("wheel", this.scrollEvent);
  //           });
  //         }
  //       );
  //     }
  //   }
  // };

  letScene = nb => {
    if (nb == 1) {
      anime({
        targets: "#content1",
        translateX: [-1000, 0],
        duration: 300,
        width: ["40%", "60%"],
        easing: "spring(1, 100, 100,0)",
        begin: function(anim) {
          document.querySelector("#content1").style.zIndex = "2";
          document.querySelector("#content2").style.zIndex = "0";
          document.querySelector("#content3").style.zIndex = "0";
          //anime({ targets: "#content1", zIndex: 2 });
          //anime({ targets: "#content2,#content3", zIndex: 0 });
        },
        complete: () => {
          this.setState({ sceneOld: 1 });
        }
      });
      // anime({
      //   targets: ".textInRT",
      //   fontSize: 30,
      //   duration: 3000
      // });
    }

    if (nb == 2) {
      anime({
        targets: "#content2",
        translateX: [-1000, 0],
        duration: 300,
        width: ["40%", "60%"],
        easing: "spring(1, 100, 100,0)",
        begin: function(anim) {
          document.querySelector("#content2").style.zIndex = "2";
          document.querySelector("#content1").style.zIndex = "0";
          document.querySelector("#content3").style.zIndex = "0";
          //anime({ targets: "#content2", zIndex: 2 });
          //anime({ targets: "#content1,#content3", zIndex: 0 });
        },
        complete: () => {
          this.setState({ sceneOld: 2 });
        }
      });
      // anime({
      //   targets: ".textInRT",
      //   fontSize: 30,
      //   duration: 3000
      // });
    }

    if (nb == 3) {
      anime({
        targets: "#content3",
        translateX: [-1000, 0],
        duration: 300,
        width: ["40%", "60%"],
        easing: "spring(1, 100, 100,0)",
        begin: function(anim) {
          document.querySelector("#content3").style.zIndex = "2";
          document.querySelector("#content1").style.zIndex = "0";
          document.querySelector("#content2").style.zIndex = "0";
          // anime(
          //   { targets: "#content3", zIndex: 2 },
          //   { targets: "#content1,#content2", zIndex: 0 }
          // );
        },
        complete: () => {
          this.setState({ sceneOld: 3 });
        }
      });
      // anime({
      //   targets: ".textInRT",
      //   fontSize: 30,
      //   duration: 3000
      // });
    }
  };

  render() {
    let { scene, sceneOld, sceneNew } = this.state;

    return (
      <div id="wrapper_curriculum">
        <div className="rect1">
          <Particles
            height={window.innerHeight}
            width="100%"
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
            onMouseOut={() => {
              this.unblurAll();
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
            onMouseOut={() => {
              this.unblurAll();
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
            onMouseOut={() => {
              this.unblurAll();
            }}
          >
            <div>CAPES</div>
            <div>mathématiques</div>
          </div>
        </div>

        <div id="content1" className="contentCv">
          <div className="Filtre"></div>

          <section id="section1" ref={this.contentRef1}>
            <div className="wrapper_rt">
              <div className="image_rt"></div>
            </div>
            <Card className="textCard">
              <div className="textInRT">
                Développement d’un moteur graphique de type raytracing en C.
              </div>
              <div className="scroll_down"></div>
            </Card>
          </section>

          <section id="section2" ref={this.contentRef2}>
            <Card className="textCard">
              <div className="textInRT">2eme section</div>
              <div className="scroll_down"></div>
            </Card>
          </section>

          <section id="section3" ref={this.contentRef3}>
            <Card className="textCard">
              <div className="textInRT">3eme section</div>
              <div className="scroll_down"></div>
            </Card>
          </section>
        </div>

        <div id="content2" className="contentCvEcn">
          <div className="Filtre"></div>
          <Card className="textCard" name="card2" id="card2">
            <div className="textInRT">Ingenieur généraliste</div>
            <div className="textInRT">
              Spécialité Énergie et Management de Projet
            </div>
            <div className="scroll_down"></div>
          </Card>
        </div>

        <div id="content3" className="contentCvTeacher">
          <div className="Filtre"></div>
          <Card className="textCard">
            <div className="textInRT">Enseignant collége et lycée</div>
            <div className="scroll_down"></div>
          </Card>
        </div>
      </div>
    );
  }
}

export default Curriculum;
