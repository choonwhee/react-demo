import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import AFastTable from "./aFastTable";
import ASearchPaginationBar from "./aSearchPaginationBar";
import { cloneChildrenWithDefaultModeProps } from "./utils";

const ASearch = (props) => {
  const { columnDefs, service, fetchDataHandler, size, maxPages } = props;

  const [data, setData] = useState({
    page: 0,
    size: size === undefined ? 20 : size,
    totalPages: 5,
    rowData: [],
  });

  const fetchData = (page) => {
    //mock method...to be implemented...

    if (service !== undefined) {
      fetch("/customers?page=" + page + "&size=" + data.size)
        .then(
          (response) => response.json(),
          (response) => console.log(response.json())
        )
        .then((resObj) => {
          console.log(JSON.stringify(resObj));
          console.log(
            "r:" + resObj.number + "|" + resObj.size + "|" + resObj.totalPages
          );
          setData({
            page: resObj.number,
            size: resObj.size,
            totalPages: resObj.totalPages,
            rowData: resObj.content,
          });
        });
    } else if (fetchDataHandler !== undefined) {
      //use handler from parent to fetchRowData
      fetchDataHandler();
    }
  };

  const handleGoToPage = (event, page) => {
    fetchData(page);
  };

  const childrenWithAdditionalProps = cloneChildrenWithDefaultModeProps(props);

  useEffect(() => {
    fetchData(0);
  }, []);

  return (
    <React.Fragment>
      <Box style={{ margin: "20px" }}>
        {childrenWithAdditionalProps}
        <Box style={{ height: "20px" }} />
        <AFastTable
          columnDefs={columnDefs}
          rowData={data.rowData}
          rowSelection="multiple"
        />
      </Box>
      <ASearchPaginationBar
        totalPages={data.totalPages}
        page={data.page}
        maxPages={maxPages === undefined ? 9 : maxPages}
        onGoToPage={handleGoToPage}
      />
    </React.Fragment>
  );
};

export default ASearch;
