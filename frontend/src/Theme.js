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
    fontSize: "16px",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  },
  overrides: {
    MuiButton: {
      root: {
        margin: "15px",
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
      }
    },
    MuiCssBaseline: {
      "@global": {
        body: {
          background: "linear-gradient(#205983, #0a2742)"
        }
      }
    },
    MuiCard: {
      root: {
        minWidth: 275
      },
      bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)"
      },
      title: {
        fontSize: 14
      },
      pos: {
        marginBottom: 12
      }
    }
  }
});
