import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SportsKabaddiIcon from "@material-ui/icons/SportsKabaddi";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

const useClasses = makeStyles((theme) => ({
  navBar: {
    backgroundImage: "linear-gradient(to bottom, #112266, #001155 )",
    height: "100%",
  },
  navToolBar: {
    minHeight: "20px",
    flexDirection: "column",
    height: "100%",
  },
  menuButton: {
    width: "100%",
    fontSize: "16px",
    textAlign: "left",
    paddingLeft: "20px",
    paddingRight: "20px",

    "&:hover": {
      backgroundColor: "rgba(100,100,255,0.1)",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const TestSidePanel = (props) => {
  const classes = useClasses();
  return (
    <React.Fragment>
      <AppBar className={classes.navBar} position="sticky">
        <ToolBar className={classes.navToolBar}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <Typography className={classes.menuButton}>Main</Typography>
          <Typography className={classes.menuButton}>Do Stuff</Typography>
          <Typography className={classes.menuButton}>Ask Me</Typography>
          <Typography className={classes.menuButton}>Admin</Typography>
        </ToolBar>
      </AppBar>
    </React.Fragment>
  );
};

export default TestSidePanel;
