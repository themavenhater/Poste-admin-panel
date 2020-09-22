import React, {forwardRef} from 'react';
import {AppBar, Dialog, DialogContent, Toolbar, Typography} from '@material-ui/core';
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import Edit from '@material-ui/icons/Edit';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import axios from "axios";
import * as Actions from "./store/actions";
import {useDispatch} from "react-redux";

function TagsDialog(props) {
  const dispatch = useDispatch();
  const {tags, close, isOpen} = props

  function addTag(data) {
    console.log("add", data)
    axios.post(process.env.REACT_APP_BACKEND_URL + '/tags', data)
      .then(() => dispatch(Actions.getTags()))
  }

  function editTag(data) {
    console.log("edit", data)
    axios.put(process.env.REACT_APP_BACKEND_URL + '/tags/' + data._id, {name: data.name})
      .then(() => dispatch(Actions.getTags()))

  }

  function deleteTag(data) {
    console.log("delete", data)
    axios.delete(process.env.REACT_APP_BACKEND_URL + '/tags/' + data._id)
      .then(() => dispatch(Actions.getTags()))

  }

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>)
  }

  return (
    <Dialog
      classes={{
        paper: "m-24"
      }}
      open={isOpen}
      onClose={close}
      fullWidth
      maxWidth="md"
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Liste des Tags
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <MaterialTable
          filterPlaceholder={"Recherche"}
          localization={{
            body: {
              deleteTooltip: 'Supprimer',
              addTooltip: 'Ajouter',
              editRow: 'Modifier',
              editTooltip: 'Modifier',
            }
          }}
          icons={tableIcons}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  addTag(newData)
                  resolve();
                }, 1000)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  editTag(newData)
                  resolve()
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  deleteTag(oldData)
                  resolve()
                }, 1000)
              }),
          }}
          columns={[
            {title: "Nom", field: "name"}
          ]}
          data={tags}
          title="Tags"
        />
      </DialogContent>
    </Dialog>
  )

}

export default TagsDialog;
