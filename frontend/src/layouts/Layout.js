import React from "react";
import "../views/Connexion.scss";
import "./Layout.scss";
import Sidebar from "../components/Sidebar.js";
import { withStyles } from "@material-ui/core/styles";
import styles from "../components/sidebarStyle.js";

import { Switch, Route, Redirect } from "react-router-dom";

import WithAuth from "./withAuth";

import Connexion from "../views/Connexion";
import Presentation2 from "../views/Presentation2";
import AccessError from "../views/AccessError";
import UsersPage from "../views/UsersPage";
import ForumView from "../views/ForumView";
import TopicView from "../views/TopicView";

const switchRoutes = (
  <Switch>
    <Route path="/Layout/Connexion" component={Connexion} />
    <Route path="/Layout/Presentation2" component={Presentation2} />
    <Route path="/Layout/AccessError" component={AccessError} />
    <Route path="/Layout/UsersPage" component={WithAuth(UsersPage)} />
    <Route path="/Layout/ForumView" component={WithAuth(ForumView)} />
    <Route path="/Layout/Topic/:id" component={WithAuth(TopicView)} />
    <Redirect to="/Layout/Presentation2" />
  </Switch>
);

function Layout(props) {
  return (
    <div id="layout">
      <div id="content_wrapper">
        <div className="titre_site">
          <span className="titre_part1">Comme</span>
          <span className="titre_part2">Un</span>
        </div>

        <div>{switchRoutes}</div>
      </div>

      <Sidebar />
    </div>
  );
}

export default withStyles(styles)(Layout);
