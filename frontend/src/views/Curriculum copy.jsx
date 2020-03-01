import React, { Component } from "react";
import anime from "animejs";
import "./Curriculum.scss";
import Card from "@material-ui/core/Card";

import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";

var Scroll = require("react-scroll");

let a = null;
let b = null;
let c = null;
let d = null;

let newScrollPosition = 0;
let oldScrollPosition = 0;

class Curriculum extends Component {
  state = {
    sceneOld: 0,
    scene: 0
  };

  constructor(props) {
    super(props);
    this.content1Ref = React.createRef();
    this.content2Ref = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("scroll", this.scrollEvent);
    Events.scrollEvent.register("begin", function(to, element) {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register("end", function(to, element) {
      console.log("end", arguments);
    });
    scrollSpy.update();
  }

  scrollEvent = () => {
    newScrollPosition = window.scrollY;
    window.removeEventListener("scroll", this.scrollEvent);
    scroller.scrollTo("section2", {
      duration: 1500,
      smooth: true,
      containerId: "section2",
      offset: 50 // Scrolls to element + 50 pixels down the page
    });
    // console.log(newScrollPosition - oldScrollPosition);
    // if (newScrollPosition - oldScrollPosition > 0) {
    //   if (this.content2Ref.current != null) {
    //     oldScrollPosition = window.scrollY;
    //     this.scrollTo(this.content2Ref.current.offsetTop, () => {
    //       window.addEventListener("scroll", this.scrollEvent);
    //     });
    //   }
    //   // window.addEventListener("scroll", this.scrollEvent);
    // } else {
    //   if (this.content1Ref.current != null) {
    //     oldScrollPosition = window.scrollY;
    //     this.scrollTo(this.content1Ref.current.offsetTop, () => {
    //       window.addEventListener("scroll", this.scrollEvent);
    //     });
    //   }
    //   //window.addEventListener("scroll", this.scrollEvent);
    // }
  };

  // window.removeEventListener("scroll", this.scrollEvent);
  // if (newScrollPosition - oldScrollPosition > 0) {
  //   scroll.scrollToBottom({
  //     duration: 500,
  //     smooth: "spring"
  //   });
  //   setTimeout(() => {
  //     oldScrollPosition = window.scrollY;
  //     window.addEventListener("scroll", this.scrollEvent);
  //   }, 500);

  //   //window.addEventListener("scroll", this.scrollEvent);
  // } else {
  //   scroll.scrollToTop({
  //     duration: 500,
  //     smooth: "spring"
  //   });
  //   setTimeout(() => {
  //     oldScrollPosition = window.scrollY;
  //     window.addEventListener("scroll", this.scrollEvent);
  //   }, 500);
  // }
  // };

  letScene = nb => {
    if (nb == 1) {
      a = anime({
        targets: "#content1",
        translateX: 1000,
        duration: 300,
        easing: "spring(1, 100, 100,0)",
        begin: function(anim) {
          anime({ targets: "#content1", zIndex: 2 });
          anime({ targets: "#content2, #content3", zIndex: 0 });
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
      c = anime({
        targets: "#content2",
        translateX: 1000,
        duration: 300,
        easing: "spring(1, 100, 100,0)",
        begin: function(anim) {
          anime({ targets: "#content2", zIndex: 2 });
          anime({ targets: "#content1,#content3", zIndex: 0 });
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
      c = anime({
        targets: "#content3",
        translateX: 1000,
        duration: 300,
        easing: "spring(1, 100, 100,0)",
        begin: function(anim) {
          anime({ targets: "#content3", zIndex: 2 });
          anime({ targets: "#content1,#content2", zIndex: 0 });
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
          <div
            className="titreCv"
            onMouseEnter={() => {
              this.setState({ scene: 1 }, () => this.letScene(1));
            }}
          >
            École 42
          </div>
          <div
            className="titreCv"
            onMouseEnter={() => {
              this.setState({ scene: 2 }, () => this.letScene(2));
            }}
          >
            Centrale Nantes
          </div>
          <div
            className="titreCv"
            onMouseEnter={() => {
              this.setState({ scene: 3 }, () => this.letScene(3));
            }}
          >
            CAPES mathématiques
          </div>
        </div>

        {(scene === 1 || sceneOld === 1) && (
          <div id="content1" className="contentCv">
            <div className="Filtre"></div>
            <Element name="section1">
              <section id="section1" ref={this.content1Ref}>
                <Card className="textCard">
                  <div className="textRT"></div>

                  <div className="textInRT">
                    Développement d’un moteur graphique de type raytracing en C.
                  </div>

                  <div className="scroll_down"></div>
                </Card>
              </section>
            </Element>
            <Element name="section2">
              <section id="section2" ref={this.content2Ref}>
                <Card className="textCard">
                  <div className="textRT"></div>

                  <div className="textInRT">2eme section</div>

                  <div className="scroll_down"></div>
                </Card>
              </section>
            </Element>
          </div>
        )}
        {scene === 2 && (
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
        )}
        {scene === 3 && (
          <div id="content3" className="contentCvTeacher">
            <div className="Filtre"></div>
            <Card className="textCard">
              <div className="textInRT">Enseignant collége et lycée</div>
              <div className="scroll_down"></div>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default Curriculum;
