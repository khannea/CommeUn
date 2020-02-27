import React, { Component } from "react";
import anime from "animejs";

class Curriculum extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    anime({
      targets: ".css-selector-demo .el",
      translateX: window.innerWidth
    });
  }

  render() {
    return <div id="wrapper_curriculum">Pensée numéro 1</div>;
  }
}

export default Curriculum;
