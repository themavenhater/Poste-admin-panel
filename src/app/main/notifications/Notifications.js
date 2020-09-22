import React, {useEffect, useRef, useState} from 'react';
import withReducer from "../../../app/store/withReducer";
import {FusePageSimple} from '@fuse';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from "react-redux";
import reducer from "./store/reducers";
import Header from "../Components/Header";
import {Fab, Icon} from "@material-ui/core";
import SimpleList from "../Components/SimpleList";
import NotificationDialog from "./NotificationDialog";

const notificationColumns = [
  {
    Header: "Titre",
    accessor: "title",
    // filterable: true
  },
  {
    Header: "Regions",
    id: "regions",
    accessor: e => e?.regions?.length > 0 ? e.regions.map(x => x.name).toString() : 'toutes les régions',
    // filterable: true
  },
  {
    Header: "Functions",
    id: "functions",
    accessor: e => e?.functions?.length > 0 ? e.functions.map(x => x.name).toString() : 'tous les postes',
    // filterable: true
  },
  {
    Header: "Date",
    id: "date",
    width: 120,
    accessor: e => e.createdAt.slice(0, 10),
    // filterable: true
  },
]

function Notifications(props) {

  const dispatch = useDispatch();
  const pageLayout = useRef(null);
  const {searchText, notifications} = useSelector(({notifications}) => notifications.notificationsReducer);
  const {regions, jobs} = useSelector(({notifications}) => notifications.regionsJobsReducer);

  useEffect(() => {
    dispatch(Actions.getNotifications());
    dispatch(Actions.getJobs());
    dispatch(Actions.getRegions());
  }, [dispatch]);

  const [dialog, setDialog] = useState({
    type: 'new',
    props: {
      open: false
    },
    data: null
  });

  function closeDialog() {
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
          <Header name={"Notifications"} reducer={searchText} icon={"account_box"} searchAction={searchAction}>
            <AddButton/>
          </Header>
        }
        content={
          <SimpleList openDialog={openDialog} data={notifications} searchText={searchText}
                      columns={notificationColumns}/>
        }
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      {jobs && regions &&
      <NotificationDialog {...dialog} functions={jobs} regions={regions} closeDialog={closeDialog}/>}
    </React.Fragment>
  )
}

export default withReducer('notifications', reducer)(Notifications);
