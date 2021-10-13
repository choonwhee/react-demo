import React, { useState } from "react";

import Typography from "@material-ui/core/Typography";
import AStepperForm from "./aStepperForm";
import AStepperFormPart from "./aStepperFormPart";
import ATextField from "./aTextField";
import ASection from "./aSection";

const TestContentPanel2 = (props) => {
  return (
    <AStepperForm>
      <AStepperFormPart name="pp" title="Personal Particulars" optional>
        <Typography>Personal Particulars</Typography>
        <ATextField name="firstName" />
        <ATextField name="lastName" />
      </AStepperFormPart>
      <AStepperFormPart name="cj" title="Current Job">
        <Typography>Current Job</Typography>
        <ATextField name="company" />
        <ATextField name="jobTitle" />
        <ATextField name="role" />
      </AStepperFormPart>
      <AStepperFormPart name="q" title="Questionnaire">
        <Typography>Questionnaire</Typography>
        <ATextField
          name="likeCats"
          label="What do you know about cats? Do you like them? "
          variant="questionnaire"
        />
        <ATextField
          name="catDogVideo"
          label="Do you prefer watching cat videos or dog videos? How much time do you spend on that?"
          variant="questionnaire"
        />
      </AStepperFormPart>
    </AStepperForm>
  );
};
export default TestContentPanel2;
