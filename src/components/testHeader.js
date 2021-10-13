import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SportsKabaddiIcon from "@material-ui/icons/SportsKabaddi";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";

const useClasses = makeStyles((theme) => ({
  appBar: {
    zIndex: 1000,
    backgroundColor: "#1122ff",
  },
  toolBar: {
    minHeight: "48px",
  },
  logoIcon: {
    fill: "#ffffff",
    width: "32px",
    height: "32px",
  },
  title: {
    marginLeft: "10px",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "bold",
  },
  navBar: {
    backgroundImage: "linear-gradient(to bottom, #1122aa, #001188 )",
  },
  navToolBar: {
    minHeight: "20px",
  },
  menuButton: {
    fontSize: "12px",
    paddingLeft: "20px",
    paddingRight: "20px",

    "&:hover": {
      backgroundColor: "rgba(100,100,255,0.1)",
    },
  },
}));

const TestHeader = (props) => {
  const classes = useClasses();
  return (
    <React.Fragment>
      <AppBar className={classes.appBar} position="sticky">
        <ToolBar className={classes.toolBar}>
          <SportsKabaddiIcon className={classes.logoIcon} />
          <Typography className={classes.title}>PUNCH BELOW BELT</Typography>
        </ToolBar>
      </AppBar>
      <AppBar className={classes.navBar} position="sticky">
        <ToolBar className={classes.navToolBar}>
          <Typography className={classes.menuButton}>Main</Typography>
          <Typography className={classes.menuButton}>Do Stuff</Typography>
          <Typography className={classes.menuButton}>Ask Me</Typography>
          <Typography className={classes.menuButton}>Admin</Typography>
        </ToolBar>
      </AppBar>
    </React.Fragment>
  );
};

export default TestHeader;
