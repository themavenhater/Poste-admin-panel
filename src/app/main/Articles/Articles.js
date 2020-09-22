import React, {useEffect, useRef, useState} from 'react';
import withReducer from "app/store/withReducer";
import {FusePageSimple} from '@fuse';
// import ClientsList from "./ClientsList"
import * as Actions from './store/actions';
import {useDispatch, useSelector} from "react-redux";
import reducer from "./store/reducers";
import Header from "../Components/Header";
import {Button, Fab, Icon} from "@material-ui/core";
import SimpleList from "../Components/ActionList";
import Status from "../Components/Status";
import ArticleDialog from "./ArticleDialog";
import TagsDialog from "./TagsDialog";

const articlesColumns = [
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
    Header: "Tags",
    id: 'tags',
    Cell: row => (<div className="flex items-center">
      {row?.original?.tags?.map(one => <Status key={one._id} name={one.name} color={one.color}/>)}
    </div>)
  }
]

function Articles(props) {

  const dispatch = useDispatch();
  const pageLayout = useRef(null);
  const {searchText, articles, tags} = useSelector(({articles}) => articles.articlesReducer);

  useEffect(() => {
    dispatch(Actions.getArticles());
    dispatch(Actions.getTags());
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

  const TagsButton = () => {
    return (
      <Button
        className="bg-green-dark text-white hover:bg-white hover:text-green-dark"
        variant="contained"
        color="primary"
        onClick={() => setOpenTags(true)}>
        Tags
      </Button>
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
          <Header name={"Actualité"} reducer={searchText} icon={"account_box"} searchAction={searchAction}>
            <AddButton/>
            <TagsButton/>
          </Header>
        }
        content={
          <SimpleList showRow={showArticle} openDialog={openDialog} data={articles} searchText={searchText}
                      columns={articlesColumns}/>
        }
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      <ArticleDialog tags={tags} {...dialog} closeDialog={closeDialog}/>
      <TagsDialog tags={tags} isOpen={openTags} close={() => setOpenTags(false)}/>
    </React.Fragment>
  )
}

export default withReducer('articles', reducer)(Articles);
