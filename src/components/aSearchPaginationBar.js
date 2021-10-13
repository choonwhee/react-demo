import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";

const useStyles = makeStyles((theme) => ({
  paginationBar: {
    margin: "10px 0 10px 0",
  },
  pageButtons: {
    backgroundColor: theme.palette.secondary.contrastText,
    minWidth: "30px",
    maxWidth: "30px",
    minHeight: "30px",
    maxHeight: "30px",
    margin: "0px 5px 0px 5px",
  },
  currentPageButton: {
    minWidth: "30px",
    maxWidth: "30px",
    minHeight: "30px",
    maxHeight: "30px",
    margin: "0px 5px 0px 5px",
  },
}));

const ASearchPaginationBar = (props) => {
  const { totalPages, page, onGoToPage, maxPages } = props;

  const classes = useStyles();
  const intPage = parseInt(page);
  const intTotalPages = parseInt(totalPages);

  let intMaxPages = 9; //default to 9 if prop not provided
  if (maxPages !== undefined) intMaxPages = parseInt(maxPages);

  let startPage;
  let endPage;

  if (totalPages <= intMaxPages) {
    startPage = 0;
    endPage = intTotalPages - 1;
  } else {
    startPage = intPage - Math.floor(intMaxPages / 2) - 1;
    endPage = intPage + Math.floor(intMaxPages / 2) - 1;
    if (startPage <= 0) {
      endPage = endPage + startPage;
      startPage = 0;
    } else if (endPage + 1 > intTotalPages) {
      startPage = startPage - (endPage - intTotalPages) - 1;
      endPage = intTotalPages - 1;
    }
  }

  const handleGoToPage = (event) => {
    event.stopPropagation();
    onGoToPage(event, event.currentTarget.value);
  };

  return (
    <Box className={classes.paginationBar}>
      <Button
        disabled={page <= 0 ? true : false}
        className={classes.pageButtons}
        variant="outlined"
        color="primary"
        value={0}
        onClick={handleGoToPage}
      >
        <FirstPageIcon />
      </Button>
      <Button
        disabled={page <= 0 ? true : false}
        className={classes.pageButtons}
        variant="outlined"
        color="primary"
        value={page - 1}
        onClick={handleGoToPage}
      >
        <NavigateBeforeIcon />
      </Button>
      {(() => {
        let buttons = [];
        for (let i = startPage; i <= endPage; i++) {
          let buttonProps = {};
          if (parseInt(page) === i) {
            buttonProps.className = classes.currentPageButton;
            buttonProps.variant = "contained";
          } else {
            buttonProps.className = classes.pageButtons;
            buttonProps.variant = "outlined";
          }
          buttons.push(
            <Button
              key={"_page_button_" + i}
              color="primary"
              {...buttonProps}
              value={i}
              onClick={handleGoToPage}
            >
              {i + 1}
            </Button>
          );
        }
        return buttons;
      })()}

      <Button
        disabled={page >= totalPages - 1 ? true : false}
        className={classes.pageButtons}
        variant="outlined"
        color="primary"
        value={page + 1}
        onClick={handleGoToPage}
      >
        <NavigateNextIcon />
      </Button>
      <Button
        disabled={page >= totalPages - 1 ? true : false}
        className={classes.pageButtons}
        variant="outlined"
        color="primary"
        value={totalPages - 1}
        onClick={handleGoToPage}
      >
        <LastPageIcon />
      </Button>
    </Box>
  );
};
export default ASearchPaginationBar;
