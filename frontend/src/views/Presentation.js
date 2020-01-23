import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

//TEST
import Post from "../components/Post.js";

import "./Presentation.scss";

import styles from "./presentationStyle";

const text = (props, n) => {
  if (n === 0) {
    return (
      <div id="letter_content">
        <p>
          Ceci est une plateforme pour gérer collectivement des biens et des
          services.
        </p>
        <p>Son fonctionnement est </p>
        <p>
          <b>Transparent:</b> L'ensemble des informations nécessaires à la
          gestion des biens et services doit être disponible{" "}
        </p>
        <p>
          <b>Démocratique:</b> Absolument tout peut être soumis au vote
        </p>
        <p>
          <b>Universel:</b>Tout le monde peut y participer et à les memes droits
        </p>

        <p>Ce projet vous appartient.</p>
      </div>
    );
  } else if (n === 1) {
    return (
      <div id="letter_content">
        <p>
          Ce projet a pour but de réinventer la notion d'entreprise et de
          service publique, en proposant directement au citoyen de participer,
          d'observer ou de piloter les grandes lignes des projets.
        </p>
        <p>
          Le budget des projets dependra des votes. Et les ressources seront
          donc allouées en fonction des besoins et de l'interet porté par les
          citoyens.{" "}
        </p>
        <p>L'ensemble des données financière devront être accsessible.</p>
        <p>
          Dans aucun projet, le secret professionnel ne pourra être invoqué.
        </p>
      </div>
    );
  } else if (n === 2) {
    return (
      <div id="letter_content">
        <p>
          <b>Inscrit toi et viens participer.</b>
        </p>
        <p>
          Nous avons besoin de ton avis pour faconner le monde à notre image.
        </p>
        <Box
          component="div"
          className={props.classes.alignItemsAndJustifyContent}
        >
          <Link to="/Layout/Connexion">
            {" "}
            <Button>Inscription</Button>
          </Link>
        </Box>
      </div>
    );
  }
};

function Letter(props) {
  const [count, setCount] = useState(0);
  const classes = props.classes;
  return (
    <div id="wrapper_content">
      {/* <Post texte={"yo \n yo \n sdf;lksdf;lk"} user="1234" /> */}
      <div className="letter"> {text(props, count)}</div>

      <div>
        {count !== 2 && (
          <Box component="div" className={classes.alignItemsAndJustifyContent}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setCount((count + 1) % 3);
              }}
            >
              Next
            </Button>
          </Box>
        )}
      </div>
    </div>
  );
}

export default withStyles(styles)(Letter);
