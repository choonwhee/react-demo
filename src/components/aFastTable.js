import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import MenuIcon from "@material-ui/icons/Menu";
import Box from "@material-ui/core/Box";
import AFastTableFilterOptionsMenu from "./aFastTableFilterOptionsMenu";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
    borderCollapse: "collapse",
    //border: "thin solid #dddddd",
    borderRadius: theme.shape.borderRadius,
    //borderSpacing: 0,
    overflow: "hidden",
    boxShadow: theme.shadows[5],
  },

  thead: {
    "& tr th, tr td": {
      backgroundColor: theme.palette.secondary.main,
      textAlign: "left",
      backgroundImage:
        "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0,0,0, 0.15) 30%, rgba(0,0,0, 0.15) 30%, rgba(0,0,0, 0.08) 100%)",
      padding: "4px 15px",
    },
    "& tr th:not(:last-child), tr td:not(:last-child)": {
      borderRight: "thin solid rgb(77, 88, 106)",
    },
    "& tr th div, tr td div": {
      display: "flex",
      justifyContent: "space-between",
    },
  },
  headerTypography: {
    display: "inline",
    color: theme.palette.secondary.contrastText,
  },
  headerIconColor: {
    fill: theme.palette.secondary.contrastText,
  },
  headerRadioSpacer: {
    padding: "0 29px 0 0",
  },
  headerCheckbox: {
    color: theme.palette.secondary.contrastText,
    padding: "0 5px 0 0",
  },

  unselectedRow: {
    "& td": {
      textAlign: "left",
      padding: "4px 15px",
      color: "rgb(77, 88, 106)",
    },
    "&:not(:last-child) td": {
      borderBottom: "thin solid rgb(229, 233, 238)",
    },
    "&:hover": {
      backgroundColor: "rgb(224, 228, 236)",
    },
    "&:hover td p": {
      color: theme.palette.primary.contrastText,
    },
  },

  selectedRow: {
    backgroundColor: theme.palette.primary.light,
    "& td": {
      textAlign: "left",
      padding: "4px 15px",
      color: "rgb(77, 88, 106)",
    },
    "&:not(:last-child) td": {
      borderBottom: "thin solid rgb(229, 233, 238)",
    },
    "& td p": {
      color: theme.palette.secondary.contrastText,
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
    "&:hover td p": {
      color: theme.palette.secondary.contrastText,
    },
    "&:hover td .MuiCheckbox-root.Mui-checked": {
      color: theme.palette.success.dark,
    },
    "&:hover td .MuiRadio-root.Mui-checked": {
      color: theme.palette.success.dark,
    },
  },

  bodyTypography: {
    display: "inline",
  },

  bodyRadio: {
    padding: "0 5px 0 0",
    color: theme.palette.secondary.main,
    "&.MuiRadio-root.Mui-checked": {
      color: theme.palette.success.main,
    },
  },

  bodyCheckbox: {
    padding: "0 5px 0 0",
    color: theme.palette.secondary.main,
    "&.MuiCheckbox-root.Mui-checked": {
      color: theme.palette.success.main,
    },
  },

  tfoot: {
    "& tr": {
      backgroundColor: "rgb(46, 48, 73)",
      color: "#ffffff",
    },
  },
}));

const fetchDataFromService = (service) => {
  return [
    { id: 2222, make: "Mock Data", model: "From Service", price: 22222222 },
    { id: 1231, make: "Toyota", model: "Celica", price: 35000 },
    { id: 1232, make: "Ford", model: " Mondeo", price: 32000 },
    { id: 1233, make: "Porsche", model: "Boxter", price: 35000 },
    { id: 1234, make: "Mercedes Benz", model: "S Class", price: 80000 },
  ];
};

const AFastTable = (props) => {
  const { rowData, columnDefs, footer, rowSelection } = props;

  let initCheckboxSelections = {};
  columnDefs.forEach((columnDef) => {
    if (columnDef.checkbox === true)
      initCheckboxSelections[columnDef.field] = [];
  });
  const [checkboxSelections, setCheckboxSelections] = useState(
    initCheckboxSelections
  );
  const [radioSelections, setRadioSelections] = useState({});
  const [rowSelections, setRowSelections] = useState({
    single: "",
    multiple: [],
  });
  const [filterMenu, setFilterMenu] = useState({});

  const classes = useStyles();

  const handleCheckAllClick = (event) => {
    event.stopPropagation();
    let updatedCheckboxSelections = { ...checkboxSelections };
    if (event.target.checked === true) {
      updatedCheckboxSelections[event.target.name] = [];
      for (let i = 0; i < rowData.length; i++) {
        updatedCheckboxSelections[event.target.name].push(i.toString());
      }
    } else {
      updatedCheckboxSelections[event.target.name] = [];
    }
    setCheckboxSelections(updatedCheckboxSelections);
  };

  const renderHeaders = () => {
    const headerCells = columnDefs.map((columnDef, index) => {
      let sortIconFragment = "";
      if (columnDef.sortable !== undefined && columnDef.sortable === true) {
        if (columnDef.sortOrder === "asc") {
          sortIconFragment = (
            <ArrowUpwardIcon className={classes.headerIconColor} />
          );
        } else if (columnDef.sortOrder === "desc") {
          sortIconFragment = (
            <ArrowDownwardIcon className={classes.headerIconColor} />
          );
        }
      }

      const handleFilterClick = (event) => {
        setFilterMenu({
          opened: event.currentTarget.id,
          anchorEl: event.currentTarget,
        });
      };

      const handleFilterClose = (event) => {
        setFilterMenu({});
      };

      const handleFilterApply = (event) => {};

      return (
        <th key={"_header_cell_" + index}>
          <div>
            <span>
              <div>
                {columnDef.checkbox !== undefined &&
                columnDef.checkbox === true ? (
                  <Checkbox
                    color="default"
                    className={classes.headerCheckbox}
                    onClick={handleCheckAllClick}
                    name={columnDef.field}
                  />
                ) : (
                  ""
                )}
                {columnDef.radio !== undefined && columnDef.radio === true ? (
                  <Box className={classes.headerRadioSpacer} />
                ) : (
                  ""
                )}
                <Typography className={classes.headerTypography}>
                  {columnDef.headerName}
                </Typography>
              </div>
            </span>
            <span>
              {sortIconFragment}
              {columnDef.filter !== undefined && columnDef.filter === true ? (
                <React.Fragment>
                  <MenuIcon
                    className={classes.headerIconColor}
                    onClick={handleFilterClick}
                    id={"_filter_" + columnDef.field}
                  />
                  <AFastTableFilterOptionsMenu
                    field={columnDef.field}
                    optionValues={["abc", "def", "ghi", "jkl", "mno", "pqr"]}
                    open={filterMenu.opened === "_filter_" + columnDef.field}
                    anchorEl={filterMenu.anchorEl}
                    onClose={handleFilterClose}
                    onApply={handleFilterApply}
                  />
                </React.Fragment>
              ) : (
                ""
              )}
            </span>
          </div>
        </th>
      );
    });
    return <tr key="_header">{headerCells}</tr>;
  };

  const renderFooter = () => {
    if (footer !== undefined) {
      return (
        <tfoot className={classes.tfoot}>
          <tr>
            <td colSpan={columnDefs.length}>{footer()}</td>
          </tr>
        </tfoot>
      );
    }
  };

  const handleRadioClick = (event) => {
    event.stopPropagation();
    let updatedRadioSelections = { ...radioSelections };
    updatedRadioSelections[event.target.name] = event.target.value;
    setRadioSelections(updatedRadioSelections);
  };

  const handleCheckboxClick = (event) => {
    event.stopPropagation();
    let updatedCheckboxSelections = { ...checkboxSelections };

    if (event.target.checked === true) {
      if (
        updatedCheckboxSelections[event.target.name].indexOf(
          event.target.value.toString()
        ) === -1
      )
        updatedCheckboxSelections[event.target.name].push(event.target.value);
    } else {
      updatedCheckboxSelections[event.target.name].splice(
        updatedCheckboxSelections[event.target.name].indexOf(
          event.target.value.toString()
        ),
        1
      );
    }
    setCheckboxSelections(updatedCheckboxSelections);
  };

  const handleRowClick = (event) => {
    if (rowSelection === "single") {
      let updatedRowSelections = { ...rowSelections };
      if (rowSelections.single === event.currentTarget.id) {
        updatedRowSelections.single = "";
        setRowSelections(updatedRowSelections);
      } else {
        updatedRowSelections.single = event.currentTarget.id;
        setRowSelections(updatedRowSelections);
      }
    } else if (rowSelection === "multiple") {
      let updatedRowSelections = { ...rowSelections };
      if (
        updatedRowSelections.multiple.indexOf(event.currentTarget.id) === -1
      ) {
        updatedRowSelections.multiple.push(event.currentTarget.id);
      } else {
        updatedRowSelections.multiple.splice(
          updatedRowSelections.multiple.indexOf(event.currentTarget.id),
          1
        );
      }
      setRowSelections(updatedRowSelections);
    }
  };

  const renderRows = () => {
    if (rowData.length === 0) {
      return (
        <tr>
          <td colSpan={columnDefs.length}>No Rows Found.</td>
        </tr>
      );
    }

    return rowData.map((row, rowIndex) => {
      let trProps = {};
      if (
        rowSelection === "single" &&
        rowSelections.single === "_row_" + rowIndex
      ) {
        trProps.className = classes.selectedRow;
      } else if (
        rowSelection === "multiple" &&
        rowSelections.multiple.includes("_row_" + rowIndex)
      ) {
        trProps.className = classes.selectedRow;
      } else {
        trProps.className = classes.unselectedRow;
      }
      const cells = columnDefs.map((columnDef, colIndex) => {
        return (
          <td key={"_cell_" + rowIndex + "_" + colIndex}>
            {columnDef.checkbox !== undefined && columnDef.checkbox === true ? (
              <Checkbox
                checked={checkboxSelections[columnDef.field]?.includes(
                  rowIndex.toString()
                )}
                onClick={handleCheckboxClick}
                name={columnDef.field}
                color="default"
                value={rowIndex}
                className={classes.bodyCheckbox}
              />
            ) : (
              ""
            )}
            {columnDef.radio !== undefined && columnDef.radio === true ? (
              <Radio
                checked={
                  parseInt(radioSelections[columnDef.field]) === rowIndex
                }
                onClick={handleRadioClick}
                name={columnDef.field}
                color="default"
                value={rowIndex}
                className={classes.bodyRadio}
              />
            ) : (
              ""
            )}
            <Typography className={classes.bodyTypography}>
              {row[columnDef.field]}
            </Typography>
          </td>
        );
      });
      return (
        <tr
          {...trProps}
          onClick={handleRowClick}
          id={"_row_" + rowIndex}
          key={"_row_" + rowIndex}
        >
          {cells}
        </tr>
      );
    });
  };

  return (
    <table className={classes.table}>
      <thead className={classes.thead}>{renderHeaders()}</thead>
      <tbody className={classes.tbody}>{renderRows()}</tbody>
      {renderFooter()}
    </table>
  );
};

export default AFastTable;
