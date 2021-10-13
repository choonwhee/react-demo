import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AForm from "./aForm";
import { cloneChildrenWithAdditionalProps } from "./utils";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const AStepperForm = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState();
  const [steps, setSteps] = React.useState([]);
  let initDefaultMode = "edit";
  if (props.defaultMode !== undefined) initDefaultMode = props.defaultMode;
  const [defaultMode, setDefaultMode] = useState(initDefaultMode);
  let initDefaultModeMapping = { review: "readOnly" };
  if (props.defaultModeMapping !== undefined) {
    initDefaultModeMapping = {
      ...initDefaultModeMapping,
      ...props.defaultModeMapping,
    };
  }
  const [defaultModeMapping] = useState(initDefaultModeMapping);

  const reviewBeforeSubmit =
    props.reviewBeforeSubmit === undefined ? true : false;

  let stepTitles = {};
  useEffect(() => {
    if (reviewBeforeSubmit) {
      stepTitles["_review_form"] = { title: "Review Form", optional: false };
    }
    setSteps(Object.values(stepTitles));
  }, []);

  const addStep = (name, stepTitle, optional) => {
    stepTitles[name] = {
      title: stepTitle,
      optional: optional === undefined ? false : optional,
    };
    return Object.keys(stepTitles).length - 1;
  };

  let additionalProps = {
    add_step: addStep,
    active_step: activeStep,
    num_steps: steps.length,
    review_before_submit: reviewBeforeSubmit,
    default_mode: defaultMode,
    default_mode_mapping: defaultModeMapping,
  };
  const childrenWithAdditionalProps = cloneChildrenWithAdditionalProps(
    props,
    additionalProps
  );

  const isStepOptional = (stepNum) => {
    return steps.length === activeStep ? false : steps[stepNum].optional;
  };

  const isStepSkipped = (step) => {
    return skipped?.has(step);
  };

  const updateDefaultMode = (activeStep) => {
    console.log("updateMode");
    if (activeStep === steps.length - 1) {
      setDefaultMode("review");
      console.log("set Mode review");
    }
  };

  const handleNext = (event) => {
    event.preventDefault();
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    updateDefaultMode(activeStep + 1);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    console.log("handleNext" + activeStep);
  };

  const handleBack = (event) => {
    event.preventDefault();
    updateDefaultMode(activeStep - 1);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = (event) => {
    event.preventDefault();
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }
    updateDefaultMode(activeStep + 1);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = (event) => {
    event.preventDefault();
    updateDefaultMode(0);
    setActiveStep(0);
  };

  const renderSubmitButton = () => {
    if (activeStep === steps.length - 1)
      return (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
        >
          Submit
        </Button>
      );
  };

  const renderNextButton = () => {
    if (activeStep < steps.length - 1)
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className={classes.button}
        >
          Next
        </Button>
      );
  };

  const renderBackButton = () => {
    return (
      <Button
        disabled={activeStep === 0}
        onClick={handleBack}
        className={classes.button}
      >
        Back
      </Button>
    );
  };

  const renderSkipButton = () => {
    if (isStepOptional(activeStep)) {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSkip}
          className={classes.button}
        >
          Skip
        </Button>
      );
    }
  };

  const renderResetButton = () => {
    if (activeStep === steps.length)
      return (
        <Button onClick={handleReset} className={classes.button}>
          Reset
        </Button>
      );
  };

  return (
    <div className={classes.root}>
      {steps.length > 0 && (
        <Stepper activeStep={activeStep}>
          {steps.map((step, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={step.title} {...stepProps}>
                <StepLabel {...labelProps}>{step.title}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      )}
      <div>
        <div>
          <AForm onSubmit={handleNext}>
            <div>{childrenWithAdditionalProps}</div>
            {steps.length > 0 && (
              <div>
                {activeStep === steps.length && (
                  <React.Fragment>
                    <Typography className={classes.instructions}>
                      Form Submitted
                    </Typography>
                  </React.Fragment>
                )}

                {renderBackButton()}
                {renderSkipButton()}
                {renderNextButton()}
                {renderSubmitButton()}
                {renderResetButton()}
              </div>
            )}
          </AForm>
        </div>
      </div>
    </div>
  );
};

export default AStepperForm;
