import React, { useState } from "react";

import Box from "@material-ui/core/Box";
import AForm from "./aForm";
import ASection from "./aSection";
import ATextField from "./aTextField";
import Button from "@material-ui/core/Button";

const TestContentPanel = (props) => {
  const [mode, setMode] = useState("edit");
  const [variant, setVariant] = useState("classic");
  return (
    <Box width="800px">
      <ASection title="Test Form" collapsable={false}>
        <AForm
          defaultMode={mode}
          defaultModeMapping={{ approval: "readOnly", admin: "edit" }}
          defaultModeMappingService="./test/service"
          defaultVariant={variant}
        >
          <ATextField
            name="id"
            label="ID"
            defaultValue="123"
            modeMapping={{ update: "readOnly", admin: "readOnly" }}
          />
          <ATextField name="hiddenField" defaultValue="secret" />
          <ATextField
            name="firstName"
            defaultValue="abc"
            required
            info="This is some information for you!"
          />
          <ATextField
            name="lastName"
            defaultValue="def"
            required
            error
            helperText="Text to help you with!"
          />
          <ATextField
            name="address1"
            label="Address"
            autocompleteOptions={[
              { label: "Label 1", value: "Value 1" },
              { label: "Label 2", value: "Value 2" },
            ]}
            autocompleteGetOptionLabel={(option) => option.value}
          />
          <ATextField
            label="Star Wars API"
            autocompleteService="test"
            autocompleteGetOptionLabel={(option) => option.name}
          />
          <ATextField label="Comments" multiline rows="4" />
          <ATextField label="Approval Comments" multiline rows="4" />
          <ATextField
            name="question1"
            label="Q1. Whats is your name? Please enter your full name and not your nickname. Please share your life story and all your achievements in life."
            multiline
            rows="4"
            variant="questionnaire"
            info="test test test test info!!!!"
          />

          <Button type="submit">Submit</Button>
          <Button
            onClick={() => {
              let newMode;
              if (mode === "edit") newMode = "disabled";
              else if (mode === "disabled") newMode = "readOnly";
              else if (mode === "readOnly") newMode = "hidden";
              else if (mode === "hidden") newMode = "create";
              else if (mode === "create") newMode = "read";
              else if (mode === "read") newMode = "view";
              else if (mode === "view") newMode = "update";
              else if (mode === "update") newMode = "approval";
              else if (mode === "approval") newMode = "admin";
              else if (mode === "admin") newMode = "review";
              else if (mode === "review") newMode = "reopen";
              else if (mode === "reopen") newMode = undefined;
              else if (mode === undefined) newMode = "edit";
              setMode(newMode);
            }}
          >
            Toggle Default Form Mode :{mode === undefined ? "undefined" : mode}
          </Button>
          <Button
            onClick={() => {
              let newVariant;
              if (variant === "classic") newVariant = "questionnaire";
              else if (variant === "questionnaire") newVariant = "standard";
              else if (variant === "standard") newVariant = "filled";
              else if (variant === "filled") newVariant = "outlined";
              else if (variant === "outlined") newVariant = "classic";
              setVariant(newVariant);
            }}
          >
            Toggle Default Variant : {variant}
          </Button>
        </AForm>
      </ASection>
    </Box>
  );
};
export default TestContentPanel;
