import React, {useEffect, useState} from 'react';
import {Icon, Typography} from '@material-ui/core';
import {FuseAnimate, FuseUtils} from "@fuse";
import {useSelector} from 'react-redux';
import ReactTable from "react-table";
import {withRouter} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";

/**
 * @return {null}
 */
function TypesList(props) {
  //const dispatch = useDispatch();
  const types = props.types;
  const searchText = useSelector(({postApp}) => postApp.types.searchText);

  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    function getFilteredArray(entities, searchText) {
      const arr = Object.keys(entities).map((id) => entities[id]);
      if (searchText.length === 0) {
        return arr;
      }
      return FuseUtils.filterArrayByString(arr, searchText);
    }

    if (types) {
      setFilteredData(getFilteredArray(types, searchText));
    }
  }, [types, searchText]);

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
              if (rowInfo) {
                // props.searchAction(rowInfo.original._id)
                // console.log(rowInfo.original)
              }
            }
          }
        }}
        data={filteredData}
        columns={[
          {
            Header: "Nom",
            accessor: "name",
            // filterable: true
          },
          {
            Header: "date de creation",
            accessor: "createdAt",
            // accessor: "level",
          },
          {
            Header: "N° de services",
            id:'serviceNum',
            accessor: e => e.services? e.services.length: 0,
            // accessor: "level",
          },
          {
            Header: "Actions",
            id: "actions",
            width: 120,
            Cell: row => (<div className="flex items-center">
                <IconButton
                  onClick={() => props.openDialog({type: 'delete', props: {open: true}, data: row.original})}>
                  <Icon>delete</Icon>
                </IconButton>
                <IconButton
                  onClick={() => props.openDialog({
                    type: 'edit',
                    props: {open: true},
                    data: {image: '', ...row.original}
                  })}>
                  <Icon>edit</Icon>
                </IconButton>
              </div>
            )
          },
        ]}
        o
        defaultPageSize={10}
        noDataText="No types found"
      />
    </FuseAnimate>
  );
}

export default withRouter(TypesList);
