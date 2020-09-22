import React, {forwardRef, useEffect} from 'react';
import withReducer from "app/store/withReducer";
import {FusePageSimple} from '@fuse';
import reducer from "./store/reducers";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import Edit from "@material-ui/icons/Edit";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import axios from "axios";
import * as Actions from "./store/actions";
import {useDispatch, useSelector} from "react-redux";

function Feedback(){
  const dispatch = useDispatch();
  const {feedback} = useSelector(({feedback}) => feedback.feedbackReducer);

  useEffect(() => {
    dispatch(Actions.getFeedback())
  }, [dispatch]);

  /*function editTag(data) {
    console.log("edit", data)
    axios.put(process.env.REACT_APP_BACKEND_URL + '/feedback/' + data._id, {status: data.status})
      .then(() => dispatch(Actions.getFeedback()))
  }*/

  function deleteTag(data) {
    console.log("delete", data)
    axios.delete(process.env.REACT_APP_BACKEND_URL + '/feedbacks/' + data._id)
      .then(() => dispatch(Actions.getFeedback()))

  }

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>)
  }

  return (
    <FusePageSimple
      classes={{
        contentWrapper: "p-0 sm:p-24 pb-80 sm:pb-80 h-full",
        content: "flex flex-col h-full",
        leftSidebar: "w-256 border-0",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
      }}
      content={
        <div className="p-24">
          {feedback && <MaterialTable
            filterPlaceholder={"Recherche"}
            localization={{
              body: {
                deleteTooltip: 'Supprimer',
                editRow: 'Modifier',
                editTooltip: 'Modifier',
              }
            }}
            icons={tableIcons}
            editable={{
             /* onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    editTag(newData)
                    resolve()
                  }, 1000)
                })*/
              onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    deleteTag(oldData)
                    resolve()
                  }, 1000)
                }),
            }}
            columns={[
              {title: "Titre", field: "title"},
              {title: "Message", field: "description"},
              {title: "Region", field:'region', render: e=> e.region? e.region.name: ''},
              {title: "Poste", field:'poste', render: e=> e.poste? e.poste.name: ''},
            ]}
            data={feedback}
            title="Liste des retours"
          />}
        </div>
      }
    />
  )
}

export default withReducer('feedback', reducer)(Feedback);

