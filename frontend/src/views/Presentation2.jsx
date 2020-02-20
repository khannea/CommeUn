import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

import "./Presentation.scss";

class Presentation2 extends Component {
  state = {
    count: 0
  };
  constructor(props) {
    super(props);
  }
  // componentDidMount() {
  //   window.addEventListener("keyup", this.handleScroll);
  //   window.addEventListener("scroll", this.handleScroll);
  // }
  // componentWillUnmount() {
  //   window.removeEventListener("scroll", this.handleScroll);
  // }

  handleScroll(event) {
    console.log("SCROOOOLLL");
    let scrollTop = event.srcElement.body.scrollTop,
      itemTranslate = Math.min(0, scrollTop / 3 - 60);

    this.setState({
      transform: itemTranslate
    });
  }

  text = (props, n) => {
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
            <b>Universel:</b>Tout le monde peut y participer et à les memes
            droits
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
          <p>Nous avons besoin de ton avis.</p>
          <Box component="div" className="d-flex justify-content-center">
            <Link to="/Layout/Connexion">
              {" "}
              <Button>Inscription</Button>
            </Link>
          </Box>
        </div>
      );
    }
  };

  render() {
    let { count } = this.state;
    return (
      <div id="wrapper_content">
        <div className="letter"> {this.text(this.props, count)}</div>

        <div>
          {count !== 2 && (
            <Box component="div" className="d-flex justify-content-center">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  this.setState({ count: count + 1 });
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
}

export default Presentation2;
