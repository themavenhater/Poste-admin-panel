import React from 'react';
import {TableCell, TableHead, TableRow, TableSortLabel, Tooltip,} from '@material-ui/core';

const rows = [
  {
    id: 'image',
    align: 'left',
    disablePadding: false,
    label: 'Image',
    sort: false
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Nom',
    sort: true
  },
  {
    id: 'type',
    align: 'left',
    disablePadding: false,
    label: 'Type',
    sort: true
  },
  {
    id: 'createdAt',
    align: 'left',
    disablePadding: false,
    label: 'Date de création',
    sort: true
  },
  {
    id: 'views',
    align: 'left',
    disablePadding: false,
    label: 'N° vues',
    sort: true
  },
];

function ServicesTableHead(props) {

  const createSortHandler = property => event => {
    props.onRequestSort(event, property);
  };

  /*function openSelectedProductsMenu(event)
  {
      setSelectedProductsMenu(event.currentTarget);
  }

  function closeSelectedProductsMenu()
  {
      setSelectedProductsMenu(null);
  }*/

  return (
    <TableHead>
      <TableRow className="h-64">
        {rows.map(row => {
          return (
            <TableCell
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'default'}
              sortDirection={props.order.id === row.id ? props.order.direction : false}
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={row.align === "right" ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default ServicesTableHead;
