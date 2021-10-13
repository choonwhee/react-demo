import React from "react";
import { formDataToObject, cloneChildrenWithAdditionalProps } from "./utils";

/*
Default Mode
AForm will communicate to all its field children which mode to render by default using the defaultMode prop. This allow the convinience of setting 
the default render mode for its field children if the children does not have its own mode or settings provided. 
This way we don't need to specify mode for every single field repeatedly if most fields should be rendered in a similar 
render mode. Functional mode mapping to render mode also allow is to define custom functional mode to how the fields 
should be rendered, which can be easier to keep track of how to render forms with complex workflow lifecycle stages 
without having to rebuilt a serparate page/component for each page.
Functional mode can support custom values (as long as corresponding mappings are provides) but render mode does not 
support custom values (since the field would not know what to actually render), so the only supported render mode values 
are ["readOnly"|"edit"|"disabled"|"hidden"].

AForm gets can get mappings via 
1) defaultModeMapping prop that is passed in, 
2) via calling a backend service specified by the defaultModeMappingService
3) predefined fallback mappings
the mappings are then merged in the above order of precedence when there are duplicate functional modes in the mapping. 
This means that if the defaultModeMapping from prop and from the mapping via the service have the same functional prop defined, 
the functional mode mapping defined by the defaultModeMapping from props will override the same mapping from the service.

defaultModeMapping: allow mappings to be specified in via props. modeMapping is an object that is used like a map. 
Each property name is the functional mode and the property value is the render mode that the field need to render.

defaultModeMappingService: takes a service end point which it will call to fetch mapping from backend service
*/

const AForm = (props) => {
  let defaultModeMapping = {
    readOnly: "readOnly",
    edit: "edit",
    hidden: "hidden",
    disabled: "disabled",
    create: "edit",
    read: "readOnly",
    view: "readOnly",
    update: "edit",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log("handleSubmit: " + JSON.stringify(formDataToObject(formData)));
    if (props.onSubmit !== undefined) props.onSubmit(event);
  };

  const fetchDefaultModeMapping = () => {
    /*this is a mock method that returns a fixed result for testing - to be replaced with an actual service call from props.defaultModeMappingService*/
    return { review: "readOnly", reopened: "edit" };
  };

  let defaultModeMappingFromService;
  if (props.defaultModeMappingService !== undefined)
    defaultModeMappingFromService = fetchDefaultModeMapping();

  /* Object destructuring order is important to ensure property precedence is considered. 
  Properties on the right hand side will override those on the left if there are duplicates.
  Merge mappings based on the following precedence: 
    1) props.defaultModeMapping (mappings from props), 
    2) defaultModeMappingFromService (mapping fetched from service), 
    3)defaultModeMpping (fallback mappings)
    */
  if (props.defaultModeMapping !== undefined)
    defaultModeMapping = {
      ...defaultModeMapping,
      ...defaultModeMappingFromService,
      ...props.defaultModeMapping,
    };

  /*const childrenWithAdditionalProps = React.Children.map(
    props.children,
    (child) => {
      let additionalProps = { default_mode_mapping: defaultModeMapping };
      if (props.defaultMode) additionalProps.default_mode = props.defaultMode;
      if (props.defaultVariant)
        additionalProps.default_variant = props.defaultVariant;
      return child === null
        ? child
        : React.cloneElement(child, additionalProps);
    }
  );*/

  let additionalProps = { default_mode_mapping: defaultModeMapping };
  if (props.defaultMode) additionalProps.default_mode = props.defaultMode;
  if (props.defaultVariant)
    additionalProps.default_variant = props.defaultVariant;
  const childrenWithAdditionalProps = cloneChildrenWithAdditionalProps(
    props,
    additionalProps
  );

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      {childrenWithAdditionalProps}
    </form>
  );
};

export default AForm;
