import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    justifyContent: "flex-start",
  },

  checkboxContainer: {
    display: "inline-block",
    width: "50%",
  },

  vSpacer: { height: "10px" },

  actionContainer: { display: "flex", justifyContent: "space-between" },
}));

const AFastTableFilterOptionsMenu = (props) => {
  const classes = useStyles();

  const menuProps = {
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: { vertical: "top", horizontal: "left" },
    PaperProps: {
      style: {
        width: "300px",
        padding: "0px 20px 10px 20px",
      },
    },
  };
  if (props.onClose !== undefined) menuProps.onClose = props.onClose;
  if (props.open !== undefined) menuProps.open = props.open;
  if (props.anchorEl !== undefined) menuProps.anchorEl = props.anchorEl;

  return (
    <Menu id={"_filter_menu_" + props.field} {...menuProps}>
      <Box className="formContainer">
        {props.optionValues.map((optionValue, index) => {
          return (
            <Box
              key={"options" + props.field + "_" + index}
              className={classes.checkboxContainer}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    name={"_filter_options_" + props.field}
                    value={optionValue}
                    color="primary"
                  />
                }
                label={optionValue}
              />
            </Box>
          );
        })}
      </Box>
      <Box className={classes.vSpacer} />
      <Box className={classes.actionContainer}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            props.onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            //props.onApply();
            props.onClose();
          }}
        >
          Apply
        </Button>
      </Box>
    </Menu>
  );
};

export default AFastTableFilterOptionsMenu;
