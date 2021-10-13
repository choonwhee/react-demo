import React from "react";

export function toLabelCase(str) {
  return (
    str?.charAt(0)?.toUpperCase() + str?.replace(/([A-Z])/g, " $1").slice(1)
  );
}

export function toCamelCase(str) {
  return str?.charAt(0)?.toLowerCase() + str?.replace(" ", "_").slice(1);
}

export function generateName(name, label) {
  return name === undefined
    ? label === undefined
      ? "field" + Date.now()
      : toCamelCase(label)
    : name;
}

export function generateLabel(label, name) {
  return label === undefined
    ? NamedNodeMap === undefined
      ? ""
      : toLabelCase(name)
    : label;
}

export function formDataToObject(formData) {
  let jsonObject = {};
  for (const [key, value] of formData) {
    jsonObject[key] = value;
  }
  return jsonObject;
}

export function cloneChildrenWithAdditionalProps(props, propsToAdd) {
  return React.Children.toArray(props.children)
    .filter((n) => n) //remove nulls
    .map((child) => {
      return React.cloneElement(child, propsToAdd);
    });
}

export function cloneChildrenWithDefaultModeProps(props) {
  return props.default_mode !== undefined ||
    props.default_mode_mapping !== undefined
    ? cloneChildrenWithAdditionalProps(props, {
        default_mode: props.default_mode,
        default_mode_mapping: props.default_mode_mapping,
      })
    : props.children;
}
