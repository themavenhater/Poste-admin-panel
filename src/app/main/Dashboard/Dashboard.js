import React, {useEffect, useRef, useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import reducer from "./store/reducers";
import withReducer from 'app/store/withReducer';
import makeStyles from "@material-ui/styles/makeStyles";
import {useDispatch} from "react-redux";
import {getServices, getTypes} from "../Service/store/actions";
import {getArticles} from "../Articles/store/actions";
import {getDocuments} from "../Document/store/actions";
import {getJobs, getRegions} from "../RegionsJobs/store/actions";
import {getFeedback} from "../feedback/store/actions";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import UsersCount from "./charts/UsersCount";
import ArticlesCount from "./charts/ArticlesCount";
import ServicesCount from "./charts/ServicesCount";
import DocumentsCount from "./charts/DocumentsCount";

const styles = (theme) => ({
  layoutRoot: {},
});

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const pageLayout = useRef(null);
  const [tabValue, setTabValue] = useState(0);

  function handleChangeTab(event, tabValue) {
    setTabValue(tabValue);
  }

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getArticles());
    dispatch(getDocuments());
    dispatch(getRegions());
    dispatch(getJobs());
    dispatch(getServices());
    dispatch(getFeedback())
  }, [dispatch]);

  return (
    <FusePageSimple
      classes={{
        header: "min-h-100 h-100",
        toolbar: "min-h-48 h-48",
        rightSidebar: "w-288",
        content: classes.content,
      }}
      header={
        <div className="flex flex-col justify-between align-middle flex-1 px-24">
          <div className="flex justify-between items-start">
            <Typography className="py-0 sm:py-24" variant="h4">
              Tableau de bord
            </Typography>
          </div>
        </div>
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
          <Tab className="text-14 font-600 normal-case" label="Articles"/>
          <Tab className="text-14 font-600 normal-case" label="Services"/>
          <Tab className="text-14 font-600 normal-case" label="Utilisateurs"/>
          <Tab className="text-14 font-600 normal-case" label="Documents"/>
        </Tabs>
      }
      content={
        <div className="p-4 sm:p-12">
          {tabValue === 0 && (
            <div className="md:flex max-w-2xl flex-col">
              <ArticlesCount/>
            </div>
          )
          }
          {tabValue === 1 && (
            <div className="md:flex max-w-2xl flex-col">
              <ServicesCount/>
            </div>
          )
          }
          {tabValue === 2 && (
            <div className="md:flex max-w-2xl flex-col">
              <UsersCount/>
            </div>
          )
          }
          {tabValue === 3 && (
            <div className="md:flex max-w-2xl flex-col">
              <DocumentsCount/>
            </div>
          )
          }
        </div>
      }
      ref={pageLayout}
    />
  )
};

const useStyles = makeStyles((theme) => ({
  content: {
    "& canvas": {
      maxHeight: "100%",
    },
  },
  selectedProject: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: "8px 0 0 0",
  },
  projectMenuButton: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: "0 8px 0 0",
    marginLeft: 1,
  },
}));

export default withReducer('stat', reducer)(withStyles(styles, {withTheme: true})(Dashboard));
