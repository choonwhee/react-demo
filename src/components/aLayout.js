import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TestContentPanel from "./testContentPanel";
import TestContentPanel2 from "./testContentPanel2";
import TestHeader from "./testHeader";
import TestSidePanel from "./testSidePanel";

const useStyles = makeStyles((theme) => ({
  paper: {
    background: "ffffff",
  },
  header: {
    zIndex: 100,
  },
  stickyHeader: {
    position: "sticky",
    top: "0px",
    zIndex: 100,
  },
  stickyFooter: {
    position: "sticky",
    bottom: "0px",
  },
}));

/*
Classic Layout
|-------------------------------|
|             Header            |
|-------------------------------|
|        |                      |
|  Side  |       Content        |
|  Panel |        Panel         |
|        |                      |
|        |                      |
|-------------------------------|
|             Footer            |
|-------------------------------|

*/

const ALayout = (props) => {
  const classes = useStyles();

  let gridContainerProps = {};
  let headerProps = { className: classes.header };
  let navbarProps = {};
  let sidePanelProps = {};
  let contentPanelProps = {};
  let footerProps = {};

  if (props.stickyHeader === undefined || props.stickyHeader === true)
    headerProps.className = classes.stickyHeader;
  if (props.stickyFooter === undefined || props.stickyFooter === true)
    footerProps.className = classes.stickyFooter;

  return (
    <Grid container {...gridContainerProps}>
      <Grid item xs={12} {...headerProps}>
        <TestHeader />
      </Grid>
      <Grid item xs={2} {...sidePanelProps}>
        <TestSidePanel />
      </Grid>
      <Grid item xs={10} {...contentPanelProps}>
        {props.contentPanel}
      </Grid>
      <Grid item xs={12} {...footerProps}>
        <Paper>footer</Paper>
      </Grid>
    </Grid>
  );
};
export default ALayout;
