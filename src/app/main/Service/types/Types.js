import React, {useEffect, useRef, useState} from 'react';
import withReducer from "app/store/withReducer";
import {FusePageSimple} from '@fuse';
import TypesList from "./TypesList"
import * as Actions from '../store/actions';
import {useDispatch, useSelector} from "react-redux";
import reducer from "../store/reducers";
import Header from "../../Components/Header";
import {Fab, Icon} from "@material-ui/core";
import TypeDialog from "./TypeDialog";
// import TypeDialog from "./TypeDialog";

function Types(props) {

  const dispatch = useDispatch();
  const pageLayout = useRef(null);
  const types = useSelector(({types}) => types.types.data);
  const searchText = useSelector(({types}) => types.types.searchText);

  useEffect(() => {
    dispatch(Actions.getTypes());
  }, [dispatch]);

  const searchAction = (ev) => dispatch(Actions.setTypesSearchText(ev));

  const [dialog, setDialog] = useState({
    type: 'new',
    props: {
      open: false
    },
    data: null
  });

  function closeDialog() {
    dispatch(Actions.getTypes());
    setDialog({type: 'new', props: {open: false}, data: null})
  }

  function openDialog(data) {
    setDialog(data)
  }

  const AddButton = () => {
    return (
      <Fab
        aria-label="add"
        className="bg-white text-blue-dark"
        onClick={() => setDialog({type: 'new', props: {open: true}, data: null})}
      >
        <Icon>add</Icon>
      </Fab>
    )
  };

  return (
    <React.Fragment>
      <FusePageSimple
        classes={{
          contentWrapper: "p-0 sm:p-24 pb-80 sm:pb-80 h-full",
          content: "flex flex-col h-full",
          leftSidebar: "w-256 border-0",
          header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
        }}
        header={
          <Header name={"Types de service"} icon={"account_box"} reducer={searchText} searchAction={searchAction}>
            <AddButton/>
          </Header>
        }
        content={
          <TypesList searchAction={searchAction} types={types} openDialog={openDialog}/>
          // <DemoContent/>
        }
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      <TypeDialog  {...dialog} closeDialog={closeDialog} types={types} />
    </React.Fragment>
  )
}

export default withReducer('types', reducer)(Types);
