import React, { useState } from "react";

import Box from "@material-ui/core/Box";
import { cloneChildrenWithAdditionalProps } from "./utils";

const AStepperFormPart = (props) => {
  let defaultMode = "edit";
  if (props.defaultMode !== undefined) {
    defaultMode = props.defaultMode;
  } else if (props.default_mode !== undefined) {
    defaultMode = props.default_mode;
  }

  let defaultModeMapping = { review: "readOnly" };
  if (
    props.default_mode_mapping !== undefined &&
    props.defaultModeMapping !== undefined
  ) {
    defaultModeMapping = {
      ...defaultModeMapping,
      ...props.default_mode_mapping,
      ...props.defaultModeMapping,
    };
  } else if (props.default_mode_mapping !== undefined) {
    defaultModeMapping = {
      ...defaultModeMapping,
      ...props.default_mode_mapping,
    };
  } else if (props.defaultModeMapping !== undefined) {
    defaultModeMapping = {
      ...defaultModeMapping,
      ...props.defaultModeMapping,
    };
  }

  const [stepNum, setStepNum] = useState(-1);
  if (stepNum === -1) {
    setStepNum(props.add_step(props.name, props.title, props.optional));
  }

  let boxProps = {};
  if (
    stepNum !== undefined &&
    stepNum !== props.active_step &&
    props.active_step !== props.num_steps - 1 &&
    props.review_before_submit === true
  ) {
    boxProps.style = { display: "none" };
  }

  const childrenWithAdditionalProps = cloneChildrenWithAdditionalProps(props, {
    default_mode: defaultMode,
    default_mode_mapping: defaultModeMapping,
  });

  return <Box {...boxProps}>{childrenWithAdditionalProps}</Box>;
};

export default AStepperFormPart;
