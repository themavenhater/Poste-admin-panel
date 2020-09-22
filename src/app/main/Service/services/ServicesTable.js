import React, {useEffect, useState} from 'react';
import {Table, TableBody, TableCell, TablePagination, TableRow} from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import {withRouter} from 'react-router-dom';
import _ from '@lodash';
import ServicesTableHead from './ServicesTableHead';
import {useSelector} from 'react-redux';

function ServicesTable(props) {
  const services = useSelector(({postApp}) => postApp.services.data);
  const searchText = useSelector(({postApp}) => postApp.services.searchText);

  const [data, setData] = useState(services);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null
  });

  useEffect(() => {
    const data = searchText.length === 0 ? services : _.filter(services, item => item.name.toLowerCase().includes(searchText.toLowerCase()));
    setData(data)
  }, [services, searchText]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }

    setOrder({
      direction,
      id
    });
  }

  function handleClick(item) {
    props.history.push('/services-types/services/' + item._id);
  }

  function handleChangePage(event, page) {
    setPage(page);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  return (
    <div className="w-full flex flex-col">

      <FuseScrollbars className="flex-grow overflow-x-auto">

        {services && <Table className="min-w-xl" aria-labelledby="tableTitle">

          <ServicesTableHead
            order={order}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />

          <TableBody>
            {_.orderBy(data, [
                (o) => {
                  switch (order.id) {
                    case 'type': {
                      return o.service_type.name;
                    }
                    case 'name': {
                      return o.name.toLowerCase();
                    }
                    case 'date': {
                      return o.createdAt;
                    }
                    case 'views': {
                      return o.views.length;
                    }
                    default: {
                      return o.name.toLowerCase();
                    }
                  }
                }
              ], [order.direction])
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n, i) => {
                return (
                  <TableRow
                    className="h-64 cursor-pointer"
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={i}
                    onClick={event => handleClick(n)}
                  >
                    <TableCell className="w-52 max-h-52" component="th" scope="row" padding="none">
                      {n.image ? (
                        <img className="w-full block rounded" src={process.env.REACT_APP_BACKEND_URL + n.image.url}
                             alt={n.name.slice(0, 10)}/>
                      ) : (
                        <img className="w-full block rounded"
                             src="assets/images/ecommerce/product-image-placeholder.png" alt={n.name}/>
                      )}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.name}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.service_type ? n.service_type.name: 'aucun'}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.createdAt.slice(0, 10)}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.views.length}
                    </TableCell>

                  </TableRow>
                );
              })}
          </TableBody>
        </Table>}
      </FuseScrollbars>

      <TablePagination
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page'
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page'
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(ServicesTable);
