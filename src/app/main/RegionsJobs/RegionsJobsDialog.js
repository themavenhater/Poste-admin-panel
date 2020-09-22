import React, {useCallback, useEffect} from 'react';
import {AppBar, Button, Dialog, DialogActions, DialogContent, TextField, Toolbar, Typography} from '@material-ui/core';
import {useForm} from '@fuse/hooks';
import {useDispatch} from "react-redux";
import axios from 'axios'
import * as Actions from './store/actions'


const defaultFormState = {
  name: '',
};

function RegionsJobsDialog(props) {

  const dispatch = useDispatch();
  const catDialog = props.dialog;
  const type = props.type === 0 ? "regions" : "functions";
  const typeFr = props.type === 0 ? "une region" : "un poste";
  const {form, handleChange, setForm} = useForm(defaultFormState);

  const initDialog = useCallback(
    () => {
      /**
       * Dialog type: 'edit'
       */
      if (catDialog.type === 'edit') {
        setForm(catDialog.data);
      }

      /**
       * Dialog type: 'new'
       */
      if (catDialog.type === 'new') {
        setForm({
          ...defaultFormState,
          ...catDialog.data,
        });
      }
    },
    [catDialog.data, catDialog.type, setForm],
  );

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (catDialog.props.open) {
      initDialog();
    }

  }, [catDialog.props.open, initDialog]);

  function closeComposeDialog() {
    setForm(defaultFormState);
    props.closeDialog()
  }

  function canBeSubmittedToAdd() {
    return (
      form.name.length > 0
    );
  }

  function canBeSubmittedToEdit() {
    const data = catDialog.data;
    return (
      form.name !== data.name
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = {name: form.name}
    if (catDialog.type === 'new') {
      console.log("new " + type + " ", data)
      axios.post(process.env.REACT_APP_BACKEND_URL + '/' + type, data)
        .then((res) => type === "regions" ? dispatch(Actions.getRegions()) : dispatch(Actions.getJobs()))
    } else {
      console.log("edit " + type + " ", form)
      axios.put(process.env.REACT_APP_BACKEND_URL + '/' + type + '/' + form._id, data)
        .then((res) => type === "regions" ? dispatch(Actions.getRegions()) : dispatch(Actions.getJobs()))
    }
    closeComposeDialog();
  }

  function handleRemove() {
    axios
      .delete(process.env.REACT_APP_BACKEND_URL + '/' + type + '/' + catDialog.data._id)
      .then((res) => type === "regions" ? dispatch(Actions.getRegions()) : dispatch(Actions.getJobs()));
    closeComposeDialog();
  }

  if (catDialog.type === "delete")
    return (
      <Dialog
        classes={{
          paper: "m-24"
        }}
        {...catDialog.props}
        onClose={closeComposeDialog}
        fullWidth
        maxWidth="xs"
      >
        <AppBar position="static" elevation={1}>
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              Supprimer {catDialog.data?.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent classes={{root: "p-24"}} elevation={1}>
          <Typography variant="h5" color="inherit">
            Etes vous sûr de vouloir supprimer {catDialog.data?.name} ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemove} className="bg-red-dark text-white hover:bg-white hover:text-red-dark"
                  autoFocus>
            Supprimer
          </Button>
          <Button onClick={closeComposeDialog} color="primary">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    );


  return (
    <Dialog
      classes={{
        paper: "m-24"
      }}
      {...catDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >

      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {catDialog.type === 'new' ? 'Ajouter ' + typeFr : 'modifier ' + form.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
        <DialogContent classes={{root: "p-24"}}>

          <div className="flex">
            <TextField
              className="mb-24"
              label="Entrez le nom"
              autoFocus
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              variant="outlined"
              required
              fullWidth
            />
          </div>
        </DialogContent>

        {catDialog.type === 'new' ? (
          <DialogActions className="justify-between pl-16">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              type="submit"
              disabled={!canBeSubmittedToAdd()}
            >
              Ajouter
            </Button>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between pl-16">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
              disabled={!canBeSubmittedToEdit()}
            >
              Sauvegarder
            </Button>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default RegionsJobsDialog;
