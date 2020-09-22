import {useDispatch} from "react-redux";
import {AppBar, Button, Dialog, DialogActions, DialogContent, Typography} from "@material-ui/core";
import React from "react";
import * as Actions from "../store/actions";

function ImageDialog(props) {
  const dispatch = useDispatch();
  const dialog = props.dialog;

  function closeComposeDialog() {
    props.closeDialog()
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (dialog.data) dispatch(Actions.deleteImage(dialog.data, props.navigation));
    closeComposeDialog()
  }

  return (
    <Dialog
      classes={{
        paper: "m-24"
      }}
      {...dialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={1}>
      </AppBar>
      <DialogContent classes={{root: "p-24"}} elevation={1}>
        <Typography variant="h5" color="inherit">
          Etes vous sûr de vouloir supprimer l'"image ?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} className="bg-red hover:text-red text-white" autoFocus>
          Supprimer
        </Button>
        <Button onClick={closeComposeDialog} color="primary">
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  )


}

export default ImageDialog
