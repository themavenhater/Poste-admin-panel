import {FuseAnimate} from '@fuse';
import {Icon, Input, Paper, Typography} from '@material-ui/core';
import React from 'react';

function Header(props) {

  return (
    <div className="flex flex-1 items-center justify-between p-8 sm:p-24">
      <div className="flex flex-shrink items-center sm:w-224">
        <div className="flex items-center">
          <FuseAnimate animation="transition.expandIn" delay={300}>
            <Icon className="text-32 mr-12">{props.icon}</Icon>
          </FuseAnimate>
          <FuseAnimate animation="transition.slideLeftIn" delay={300}>
            <Typography variant="h6" className="hidden sm:flex">{props.name}</Typography>
          </FuseAnimate>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">
        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
          <Paper className="flex p-4 items-center w-full max-w-640 px-8 py-4" elevation={1}>
            <Icon className="mr-8" color="action">search</Icon>
            <Input
              placeholder="Recherche"
              className="flex flex-1"
              disableUnderline
              fullWidth
              value={props.searchText}
              inputProps={{
                'aria-label': 'Search'
              }}
              onChange={ev => props.searchAction(ev)}
            />
          </Paper>
        </FuseAnimate>
      </div>
      <div className="flex flex-shrink items-center  justify-around sm:w-136">
        {props.children}
      </div>
    </div>
  );
}

export default Header;
