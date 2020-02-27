import React, { Component } from "react";
import anime from "animejs";

class Curriculum extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    // anime({
    //   targets: ".css-selector-demo .el",
    //   translateX: window.innerWidth
    // });
  }

  render() {
    return (
      <div id="wrapper_curriculum">
        <div id="dark_menu"></div>
      </div>
    );
  }
}

export default Curriculum;
