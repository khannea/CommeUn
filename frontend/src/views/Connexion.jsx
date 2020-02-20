import React from "react";
import "./Connexion.scss";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import styles from "../components/sidebarStyle.jsx";

import { Link } from "react-router-dom";
import Login from "../components/Login.jsx";

function Connexion(props) {
  const classes = props.classes;
  return (
    <div id="connexion_wrapper">
      <div>
        <Login />
      </div>

      <div
        id="presentation_button"
        className={classes.alignItemsAndJustifyContent}
      >
        <Link to="/Layout/Presentation">
          <Button variant="contained" color="secondary">
            Présentation
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default withStyles(styles)(Connexion);
