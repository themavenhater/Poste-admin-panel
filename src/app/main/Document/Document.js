import React, {useEffect, useRef, useState} from 'react';
import withReducer from "../../../app/store/withReducer";
import {FusePageSimple} from '@fuse';
import ActionList from "../Components/ActionList";
import Header from "../Components/Header";
import {Fab, Icon} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import reducer from "./store/reducers";
import * as Actions from "./store/actions";
import DocumentDialog from "./DocumentDialog";

const documentsColumns = [
  {
    Header: "Titre",
    accessor: "title",
  },
  {
    Header: "Description",
    accessor: "description",
  },
  {
    Header: "Créé le",
    id: "date",
    accessor: e => e.createdAt.slice(0, 10),
  },
]

function Document(props) {
  const dispatch = useDispatch();
  const pageLayout = useRef(null);
  const {documents, searchText} = useSelector(({docs}) => docs.documentsReducer);

  console.log("documents", documents)
  useEffect(() => {
    dispatch(Actions.getDocuments());
  }, [dispatch]);

  const [dialog, setDialog] = useState({
    type: 'new',
    props: {
      open: false
    },
    data: null
  });

  const searchAction = (ev) => dispatch(Actions.setTypesSearchText(ev));

  function closeDialog() {
    setDialog({type: 'new', props: {open: false}, data: null})
  }

  function openDialog(data) {
    console.log('data', data)
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
  }

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
          <Header name={"Documents"} icon={"account_box"} reducer={searchText} searchAction={searchAction}>
            <AddButton/>
          </Header>
        }
        content={
          <ActionList openDialog={openDialog} data={documents} searchText={searchText} columns={documentsColumns}/>
        }
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      <DocumentDialog {...dialog} closeDialog={closeDialog}/>
    </React.Fragment>
  )
}

export default withReducer('docs', reducer)(Document);
