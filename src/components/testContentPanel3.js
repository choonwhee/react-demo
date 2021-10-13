import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import ATextField from "./aTextField";
import ASearch from "./aSearch";

const TestContentPanel3 = (props) => {
  const columnDefs = [
    {
      headerName: "ID",
      field: "id",
      sortable: true,
      sortOrder: "asc",
      filter: true,
      checkbox: true,
    },
    {
      headerName: "First Name",
      field: "firstName",
      sortable: true,
      sortOrder: "desc",
    },
    { headerName: "Last Name", field: "lastName" },
    { headerName: "Address", field: "address" },
    { headerName: "Country", field: "country", filter: true },
    { headerName: "Phone", field: "phone" },
    { headerName: "Email Address", field: "email" },
  ];

  return (
    <ASearch columnDefs={columnDefs} service="/customers" size={5}>
      <ATextField name="firstName" />
      <ATextField name="lastName" />
      <ATextField name="address" />
      <ATextField name="country" />
      <ATextField name="phone" />
      <ATextField name="email" />
    </ASearch>
  );
};
export default TestContentPanel3;
