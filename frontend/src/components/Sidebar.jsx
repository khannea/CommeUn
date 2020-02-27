import React from "react";
import { Link } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { withStyles, useTheme } from "@material-ui/core/styles";

import styles from "./sidebarStyle.jsx";

function Sidebar(props) {
  const classes = props.classes;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer_keys_1 = [
    { text: "Connexion", url: "/Layout/Connexion" },
    { text: "Presentation", url: "/Layout/Presentation" }
  ];

  const drawer_keys_2 = [
    { text: "Forum", url: "/Layout/ForumView" },
    { text: "Utilisateurs", url: "/Layout/UsersPage" },
    { text: "Projets suivis", url: "/Layout/Project" },
    { text: "Messages postés", url: "/Layout/MyMessages" }
  ];

  const drawer_keys_3 = [
    { text: "Réflexions", url: "/Layout/ReflexionView" },
    { text: "Curriculum Vitae", url: "/Layout/Curriculum" }
  ];

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {drawer_keys_1.map((drawer_keys_1, index) => (
          <ListItem
            button
            component={Link}
            to={drawer_keys_1.url}
            key={drawer_keys_1.url}
          >
            <ListItemText primary={drawer_keys_1.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {drawer_keys_2.map((drawer_keys_2, index) => (
          <ListItem
            button
            component={Link}
            to={drawer_keys_2.url}
            key={drawer_keys_2.url}
          >
            <ListItemText primary={drawer_keys_2.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {drawer_keys_3.map((drawer_keys_3, index) => (
        <ListItem
          button
          component={Link}
          to={drawer_keys_3.url}
          key={drawer_keys_3.url}
        >
          <ListItemText primary={drawer_keys_3.text} />
        </ListItem>
      ))}
    </div>
  );

  return (
    <div className={classes.root}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        className={classes.burgerButton}
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {/* <Hidden mdUp implementation="css">
          <Drawer
            // container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden> */}

        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </nav>
    </div>
  );
}

export default withStyles(styles)(Sidebar);
