import React, {useEffect, useState} from 'react';
import {Typography} from '@material-ui/core';
import {FuseAnimate, FuseUtils} from "@fuse";
import ReactTable from "react-table";
import {withRouter} from "react-router-dom";

/**
 * @return {null}
 */
function SimpleList(props) {
  //const dispatch = useDispatch();
  const data = props.data;
  const searchText = props.searchText;

  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    function getFilteredArray(entities, searchText) {
      const arr = Object.keys(entities).map((id) => entities[id]);
      if (searchText.length === 0) {
        return arr;
      }
      return FuseUtils.filterArrayByString(arr, searchText);
    }

    if (data) {
      setFilteredData(getFilteredArray(data, searchText));
    }
  }, [data, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no data!
        </Typography>
      </div>
    );
  }

  return (
    <FuseAnimate animation="transition.slideUpIn" delay={300}>
      <ReactTable
        className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
        getTrProps={(state, rowInfo, column) => {
          return {
            className: "cursor-pointer",
            onClick: (e, handleOriginal) => {
              e.preventDefault()
              if (rowInfo) {
                // props.showRow && props.showRow(rowInfo.original)
              }
            }
          }
        }}
        data={filteredData}
        columns={props.columns}
        o
        defaultPageSize={10}
        noDataText="No data found"
      />
    </FuseAnimate>
  );
}

export default withRouter(SimpleList);
