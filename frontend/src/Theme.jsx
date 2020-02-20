import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      main: "#205983" //bleu
    },
    secondary: {
      main: "#e8c547" //jaune
    },
    warning: {
      main: "#a89757"
    }
  },
  typography: {
    fontFamily: '"Alegreya", "Helvetica", "Arial", sans-serif',
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
        fontFamily: "Alegreya",
        // backgroundColor: "#e8c547",
        // border: "1px solid black",
        // fontSize: "20px",
        fontWeight: "800",
        "&:hover": {
          backgroundColor: "#a89757"
        }
      },
      text: {
        padding: "5px 40px"
      },
      contained: {
        margin: "15px"
      }
    },
    MuiCssBaseline: {
      "@global": {
        body: {
          background: "linear-gradient(#205983, #0a2742)"
        }
      }
    },
    MuiCardContent: {
      root: {
        // marginBottom: 0,
        // paddingBottom: 0,
        // paddingTop: 0,
        "&:last-child": {
          paddingBottom: 0
        }
      }
    },
    MuiCardHeader: {
      root: {
        paddingLeft: 0
      }
    }
  }
});
