import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { generateLabel, generateName } from "./utils";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

/*
Textarea
multiline if multiline is true then rendered as a text area. If rows or maxRows are set then multiline is automatically set to true
rows = number of rows (height) for the textarea
maxRows = number rows can grow until it reach maxRows. default to infinite

AutoComplete
autocompleteService: takes endpoint and calls backend service. backend service should return an array of objects with a label field. to map non standard objects set autocompleteGetOptionLabel 
autocompleteGetOptionLabel: function used to map label value to custom object. It pass the function to Material UI's TextField getOptionLabel
autocompleteOptions: takes an array of objects with a label value by default. Use autocompleteGetOptionLabel

Variant
variant = accepts standard material ui options like standard, filled and outlined and also added additional variations like classic and questionnaire. default to classic


Mode Evaluation
The purpose of this functionality is to allow translation of functional mode into the rendering mode 
i.e. actual mode the field should be rendered as. 

Functional mode can be used in multiple ways, it can be used to map workflow state, page state, role/access rights etc.
Basically if the page or section or component is in a particular mode based on workflow lifecycle or page state or role etc it indicate how should the actual component should be rendered.

Functional mode can support custom values (as long as 
corresponding mappings are provided) but render mode does not support custom values (since the field would 
not know what to actually render), so the only supported render mode values are ["readOnly"|"edit"|"disabled"|"hidden"].
For example, if a form is in "create" mode should each field be editable or readOnly or disabled or hidden? 
If a form is in a custom state "approval" mode what actual mode should the field be rendered as?
The component will evaluate mode props (provided by the field, the parent AForm or use default fallback value) against 
modeMapping (provided by the field, the parent AForm or use default fall back mapping). 


mode: mode of the component. 
default_mode: default mode provided by parent AForm if mode is not provided
mode will take precedence over default_mode. This allow field level settings to override parent AForm's defaults
if both mode and default_mode is not available (usually because field in not wrapped by an AForm), then it will 
fall back to default mode "edit".

default_mode: default mode passed down from parent AForm. 

modeMapping: mapping of parent AForm mode into a valid value of this component's mode. 
modeMapping is an object that is used like a map. 
Each property name is the functional mode and the property value is the render mode that the field need to render.

default_mode_mapping: default mode mapping passed down from parent AForm. 

modeMapping and default_mode_mapping will be merged with modeMapping (field level mapping) 
taking precedence over default_mode_mapping (parent AForm level mapping).
if both modeMapping and default_mode_mapping is not available (usually because field is not wrapped by an AForm), then it 
will fall back to default minimal mapping (so that fields unwrapped by AForm will still be able to support the basic modes for the field).
*/

const useClasses = makeStyles((theme) => ({
  infoIcon: {
    fill: "#999999",
    "&:hover": {
      fill: "#3366ff",
    },
  },
}));

const ATextField = (props) => {
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);

  //define modeMapping with default fallback mappings (lowest precedence)
  let modeMapping = {
    readOnly: "readOnly",
    edit: "edit",
    disabled: "disabled",
    hidden: "hidden",
  };

  if (
    props.modeMapping !== undefined &&
    props.default_mode_mapping !== undefined
  )
    modeMapping = {
      //Note: Order of object destructuring is important as right hand side props/objects
      //will take precedence and override the left if properties are duplicated
      ...modeMapping,
      ...props.default_mode_mapping,
      ...props.modeMapping,
    };
  else if (props.modeMapping !== undefined)
    //Note: Order of object destructuring is important as right hand side props/objects
    //will take precedence and override the left if properties are duplicated
    modeMapping = { ...modeMapping, ...props.modeMapping };
  else if (props.default_mode_mapping !== undefined)
    //Note: Order of object destructuring is important as right hand side props/objects
    //will take precedence and override the left if properties are duplicated
    modeMapping = { ...modeMapping, ...props.default_mode_mapping };

  let functionalMode = "edit";

  if (props.mode !== undefined) functionalMode = props.mode;
  else if (props.default_mode !== undefined)
    functionalMode = props.default_mode;

  //Evaluate functionalMode against modeMapping to get final render mode for the field
  const mode = modeMapping[functionalMode];

  const variant =
    props.variant === undefined
      ? props.default_variant === undefined
        ? "classic"
        : props.default_variant
      : props.variant;

  const classes = useClasses();

  const autocomplete =
    props.autocompleteService === undefined &&
    props.autocompleteOptions === undefined
      ? false
      : true;

  const customVariant =
    variant === "classic" || variant === "questionnaire" ? true : false;

  const label = generateLabel(props.label, props.name);

  const name = generateName(props.name, props.label);
  let textFieldProps = {
    id: name,
    name: name,
    fullWidth: true,
  };

  if (customVariant) textFieldProps.label = "";
  else textFieldProps.label = label;

  if (props.defaultValue !== undefined)
    textFieldProps.defaultValue = props.defaultValue;
  if (props.value !== undefined) textFieldProps.value = props.value;
  if (props.multiline === true || props.rows > 1 || props.maxRows > 1)
    textFieldProps.multiline = true;
  if (props.rows !== undefined) textFieldProps.rows = props.rows;
  if (props.maxRows !== undefined) textFieldProps.maxRows = props.maxRows;
  if (mode === "disabled") textFieldProps.disabled = true;
  if (props.required !== undefined) textFieldProps.required = props.required;
  if (props.error !== undefined) textFieldProps.error = props.error;
  if (props.helperText !== undefined)
    textFieldProps.helperText = props.helperText;
  textFieldProps.InputProps = { ...props.InputProps };
  if (mode === "readOnly") textFieldProps.InputProps.readOnly = true;

  if (customVariant) textFieldProps.variant = "outlined";
  else if (!customVariant) textFieldProps.variant = variant;
  props.size === undefined
    ? (textFieldProps.size = "small")
    : (textFieldProps.size = props.size);

  const renderCustomVariant = (inputRender) => {
    if (variant === "classic") {
      return (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          width={props.width === undefined ? "100%" : props.width}
          mt="20px"
          mb="20px"
        >
          <Box
            width="150px"
            textAlign="right"
            pr="10px"
            pt="7.5px"
            color={props.error ? "#ee0000" : ""}
          >
            <Typography>{label}:</Typography>
          </Box>
          <Box flex="1">{inputRender}</Box>
          <Box pl="10px" pt="7.5px" width="34px">
            {props.info === undefined ? "" : renderInfo()}
          </Box>
        </Box>
      );
    } else if (variant === "questionnaire") {
      return (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          width={props.width === undefined ? "100%" : props.width}
          mt="20px"
          mb="20px"
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            width="100%"
            textAlign="left"
            pr="10px"
            pt="7.5px"
            color={props.error ? "#ee0000" : ""}
          >
            <Typography>{label}</Typography>
            <Box pl="10px" width="34px">
              {props.info === undefined ? "" : renderInfo()}
            </Box>
          </Box>
          <Box>
            <Box flex="1">{inputRender}</Box>
          </Box>
        </Box>
      );
    } else {
      return inputRender;
    }
  };

  const renderTextField = (textFieldProps, autocompleteParams) => {
    if (customVariant) {
      return renderCustomVariant(
        renderInputField(textFieldProps, autocompleteParams)
      );
    } else {
      return renderInputField(textFieldProps, autocompleteParams);
    }
  };

  const renderAutocompleteInput = (autocompleteProps, textFieldProps) => {
    return (
      <Autocomplete
        {...autocompleteProps}
        renderInput={(params) => renderInputField(textFieldProps, params)}
      />
    );
  };

  const renderInfo = () => {
    return (
      <Tooltip title={props.info}>
        <InfoOutlinedIcon classes={{ root: classes.infoIcon }} />
      </Tooltip>
    );
  };

  const renderInputField = (textFieldProps, autocompleteParams) => {
    if (autocompleteParams === undefined)
      return <TextField {...textFieldProps} />;
    else return <TextField {...textFieldProps} {...autocompleteParams} />;
  };

  if (mode === "hidden") {
    return (
      <div style={{ display: "none" }}>{renderTextField(textFieldProps)}</div>
    );
  } else if (!autocomplete) {
    return renderTextField(textFieldProps);
  } else {
    let autocompleteProps = {
      id: name + "_autocomplete",
      size: "small",
    };
    if (props.autocompleteService !== undefined) {
      autocompleteProps.options = autocompleteOptions;
      if (props.autocompleteGetOptionSelected === undefined) {
        autocompleteProps.getOptionSelected = (option, value) =>
          option.value === value.value;
      } else {
        autocompleteProps.getOptionSelected =
          props.autocompleteGetOptionSelected;
      }
      autocompleteProps.onInputChange = (event, value) => {
        event.stopPropagation();
        console.log(
          "Autocomplete - Service: " +
            props.autocompleteService +
            " | Input Value: " +
            value
        );
        fetch("https://swapi.dev/api/starships/?format=json") //alternate: https://swapi-deno.azurewebsites.net/api/starships
          .then(
            (response) => response.json(),
            (response) => console.log(response.json)
          )
          .then((options) => setAutocompleteOptions(options));
      };
    } else if (autocompleteOptions !== undefined) {
      autocompleteProps.options = props.autocompleteOptions;
    }
    props.autocompleteGetOptionLabel === undefined
      ? (autocompleteProps.getOptionLabel = (option) => option.label)
      : (autocompleteProps.getOptionLabel = props.autocompleteGetOptionLabel);
    return renderCustomVariant(
      renderAutocompleteInput(autocompleteProps, textFieldProps)
    );
  }
};

export default ATextField;
