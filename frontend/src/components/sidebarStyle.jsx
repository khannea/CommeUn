const drawerWidth = 160;

const sidebarStyle = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  burgerButton: {
    background: "white",
    fontSize: "medium",
    position: "absolute",
    top: "14px",
    left: "14px",
    marginRight: theme.spacing(2),
    zIndex: 1300,
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  // toolbar: theme.mixins.toolbar,
  toolbar: {
    height: "71.5px"
  },
  drawerPaper: {
    background: "#e8e9f3",
    color: "black",
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  alignItemsAndJustifyContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default sidebarStyle;
