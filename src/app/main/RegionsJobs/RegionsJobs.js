import React, {useEffect, useRef, useState} from 'react';
import withReducer from "app/store/withReducer";
import {FusePageSimple} from '@fuse';
import * as Actions from './store/actions';
import {useDispatch, useSelector} from "react-redux";
import reducer from "./store/reducers";
import Header from "../Components/Header";
import {Fab, Icon} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ActionList from "../Components/ActionList";
import RegionsJobsDialog from "./RegionsJobsDialog";


const regionsColumns = [
  {
    Header: "Nom",
    accessor: "name",
    // filterable: true
  },
  {
    Header: "N° utilisateurs",
    id: 'users',
    accessor: e => e.users.length,
    // filterable: true
  },
  {
    Header: "Créé le",
    id: "date",
    accessor: e => e.createdAt.slice(0, 10),
    // filterable: true
  },
]

const jobsColumns = [
  {
    Header: "Nom",
    accessor: "name",
    // filterable: true
  },
  {
    Header: "N° utilisateurs",
    id: 'users',
    accessor: e => e.users.length,
    // filterable: true
  },
  {
    Header: "Créé le",
    id: "date",
    accessor: e => e.createdAt.slice(0, 10),
    // filterable: true
  },
]

function RegionsJobs(props) {

  const dispatch = useDispatch();
  const pageLayout = useRef(null);
  const {regions, jobs, searchText} = useSelector(({regions}) => regions.regionsJobs);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    dispatch(Actions.getJobs());
    dispatch(Actions.getRegions());
  }, []);

  useEffect(() => {
    dispatch(Actions.getJobs());
    dispatch(Actions.getRegions());
  }, [dispatch]);

  const searchAction = (ev) => dispatch(Actions.setTypesSearchText(ev));

  function handleChangeTab(event, tabValue) {
    setTabValue(tabValue);
  }

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
          <Header name={"Régions & postes"} icon={"account_box"} reducer={searchText} searchAction={searchAction}>
            <AddButton/>
          </Header>
        }
        contentToolbar={
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="off"
            className="w-full border-b-1 px-24"
          >
            <Tab className="text-14 font-600 normal-case" label="Régions"/>
            <Tab className="text-14 font-600 normal-case" label="Postes"/>
          </Tabs>
        }
        content={
          <div className="sm:p-12">
            {tabValue === 0  &&  (
              <div className="md:flex flex-col w-full">
                <ActionList openDialog={openDialog} data={regions} searchText={searchText} columns={regionsColumns}/>
              </div>
            )
            }
            {tabValue === 1  &&  (
              <div className="md:flex flex-col w-full">
                <ActionList openDialog={openDialog} data={jobs} searchText={searchText} columns={jobsColumns}/>
              </div>
            )
            }
            <RegionsJobsDialog dialog={dialog} closeDialog={closeDialog} type={tabValue}/>
          </div>
        }
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
    </React.Fragment>
  )
}

export default withReducer('regions', reducer)(RegionsJobs);
