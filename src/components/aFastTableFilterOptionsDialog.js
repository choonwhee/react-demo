import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { DialogActions, DialogContent } from "@material-ui/core";

const AFastTableFilterOptionsDialog = (props) => {
  const dialogProps = {};
  if (props.onClose !== undefined) dialogProps.onClose = props.onClose;
  if (props.open !== undefined) dialogProps.open = props.open;

  return (
    <Dialog {...dialogProps}>
      <DialogTitle>Filter Options</DialogTitle>
      <DialogContent>
        <FormGroup>
          {props.optionValues.map((optionValue, index) => {
            return (
              <FormControlLabel
                key={"_filter_options_" + props.field + "_" + index}
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
            );
          })}
        </FormGroup>
      </DialogContent>
      <DialogActions>
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
      </DialogActions>
    </Dialog>
  );
};

export default AFastTableFilterOptionsDialog;
