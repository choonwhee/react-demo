import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { cloneChildrenWithAdditionalProps } from "./utils";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiAccordionSummary-root:hover": {
      cursor: "default",
    },
    "& .MuiAccordionDetails-root:hover": {
      cursor: "default",
    },
  },
}));

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(229, 233, 238, 1)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
    "&:hover": {
      cursor: "pointer",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    color: "#ffffff",
    backgroundColor: "rgba(229, 233, 238, 1)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 50,
    "&$expanded": {
      minHeight: 50,
    },
    "&:hover": {
      cursor: "pointer",
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
  },
}))(MuiAccordionDetails);

const ASection = (props) => {
  const classes = useStyles();

  let accordionProps = { defaultExpanded: true };
  let accordionSummaryProps = {};
  if (props.collapsable === undefined || props.collapsable) {
    accordionSummaryProps.expandIcon = <ExpandMoreIcon />;
  } else {
    accordionProps.expanded = true;
  }

  const childrenWithAdditionalProps =
    props.default_mode !== undefined || props.default_mode_mapping !== undefined
      ? cloneChildrenWithAdditionalProps(props, {
          default_mode: props.default_mode,
          default_mode_mapping: props.default_mode_mapping,
        })
      : props.children;

  return (
    <div className={classes.root}>
      <Accordion square {...accordionProps}>
        <AccordionSummary {...accordionSummaryProps}>
          <Typography>{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>{childrenWithAdditionalProps}</AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ASection;
