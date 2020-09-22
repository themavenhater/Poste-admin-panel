import React, {useEffect, useRef, useState} from 'react';
import withReducer from "app/store/withReducer";
import {FusePageSimple} from '@fuse';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from "react-redux";
import reducer from "./store/reducers";
import Header from "../Components/Header";
import {Button, Fab, Icon} from "@material-ui/core";
import SimpleList from "../Components/ActionList";
import NotesDialog from "./NotesDialog";

const rhColumns = [
  {
    Header: "Titre",
    accessor: "title",
    // filterable: true
  }, {
    Header: "Date",
    id: "date",
    width: 120,
    accessor: e => e.createdAt.slice(0, 10),
    // filterable: true
  },
  {
    Header: "N° vues",
    id: 'views',
    accessor: e => e.views.length,
  }
]

function HumanRessource(props) {

  const dispatch = useDispatch();
  const pageLayout = useRef(null);
  const {searchText, notes} = useSelector(({rh}) => rh.notesReducer);

  useEffect(() => {
    dispatch(Actions.getNotes());
  }, [dispatch]);

  const [dialog, setDialog] = useState({
    type: 'new',
    props: {
      open: false
    },
    data: null
  });

  const [openTags, setOpenTags] = useState(false)

  function closeDialog() {
    setDialog({type: 'new', props: {open: false}, data: null})
  }

  function openDialog(data) {
    setDialog(data)
  }

  function showArticle(data) {
    setDialog({type: 'read', props: {open: true}, data: data})
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

  const searchAction = (ev) => dispatch(Actions.setSearchText(ev));

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
          <Header name={"RH + CP"} reducer={searchText} icon={"account_box"} searchAction={searchAction}>
            <AddButton/>
          </Header>
        }
        content={
          <SimpleList showRow={showArticle} openDialog={openDialog} data={notes} searchText={searchText}
                      columns={rhColumns}/>
        }
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      <NotesDialog {...dialog} closeDialog={closeDialog}/>
    </React.Fragment>
  )
}

export default withReducer('rh', reducer)(HumanRessource);
