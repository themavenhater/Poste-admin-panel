import React from 'react';
import {AppBar, Button, Dialog, DialogActions, DialogContent, TextField, Toolbar, Typography} from '@material-ui/core';
import {useForm} from '@fuse/hooks';
import * as Actions from "../store/actions";
import {useDispatch} from "react-redux";

const defaultFormState = {
  question: '',
  response: '',
  title: '',
  description: '',
};

function OptionDialog(props) {
  const dispatch = useDispatch();
  const spDialog = props.dialog;
  const {form, handleChange, setForm} = useForm(defaultFormState);


  function closeComposeDialog() {
    setForm(defaultFormState);
    props.closeDialog()
  }

  function canBeSubmitted() {
    return (
      (form.title.length > 0 && form.description.length > 0) ||
      (form.question.length > 0 && form.response.length > 0)
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (spDialog.for === 'procedures') {
      spDialog.data.push({
        title: form.title,
        description: form.description,
      })
    } else {
      spDialog.data.push({
        question: form.question,
        response: form.response,
      })
    }
    closeComposeDialog();
  }

  function handleRemove(event) {
    console.log("spDialog.data", spDialog.data)
    event.preventDefault()
    if (spDialog.for === 'procedures') {
      const data = spDialog.data.procedures.filter(one =>
        one.title !== spDialog.data.toDelete.title &&
        one.description !== spDialog.data.toDelete.description
      )
      props.handleProcedures(data)
    } else {
      const data = spDialog.data.faq.filter(one =>
        one.question !== spDialog.data.toDelete.question &&
        one.response !== spDialog.data.toDelete.response
      )
      props.handleFaq(data)
    }
    closeComposeDialog();
  }


  function handleRemoveProduct() {
    dispatch(Actions.deleteService(spDialog.data._id, props.navigation));
    closeComposeDialog();
  }

  if (spDialog.type === "deleteService") {
    return (
      <Dialog
        classes={{
          paper: "m-24"
        }}
        {...spDialog.props}
        onClose={closeComposeDialog}
        fullWidth
        maxWidth="xs"
      >
        <AppBar position="static" elevation={1}>
          <Toolbar className="flex w-full ">
            <Typography variant="subtitle1" color="inherit">
              Supprimer l'option
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent classes={{root: "p-24"}} elevation={1}>
          <Typography variant="h5" color="inherit">
            Etes vous sûr de vouloir supprimer le service {spDialog.data.name} ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveProduct} className="bg-red hover:text-red text-white" autoFocus>
            Supprimer
          </Button>
          <Button onClick={closeComposeDialog} color="primary">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    );
  } else if (spDialog.type === "delete") {
    return (
      <Dialog
        classes={{
          paper: "m-24"
        }}
        {...spDialog.props}
        onClose={closeComposeDialog}
        fullWidth
        maxWidth="xs"
      >
        <AppBar position="static" elevation={1}>
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              Supprimer le champ
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent classes={{root: "p-24"}} elevation={1}>
          <Typography variant="h5" color="inherit">
            Etes vous sûr de vouloir supprimer le champs ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleRemove}
            className="text-white hover:text-red-dark bg-red hover:bg-white"
            autoFocus>
            Supprimer
          </Button>
          <Button onClick={closeComposeDialog} color="primary">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog
      classes={{
        paper: "m-24"
      }}
      {...spDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Ajouter une {spDialog.for === 'procedures' ? 'étape' : 'Q/R'}
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
        <DialogContent classes={{root: "p-24"}}>
          {spDialog.for === 'procedures' ?
            <DialogContent classes={{root: "p-24"}}>
              <div className="flex">
                <TextField
                  className="mb-24"
                  label="Titre"
                  autoFocus
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                />
              </div>
              <div className="flex">
                <TextField
                  className="mb-24"
                  label="Description"
                  id="description"
                  name="description"
                  value={form.description}
                  multiline
                  rows={5}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                />
              </div>
            </DialogContent>
            :
            <DialogContent>
              <div className="flex">
                <TextField
                  className="mb-24"
                  label="Question"
                  autoFocus
                  id="question"
                  name="question"
                  value={form.question}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                />
              </div>
              <div className="flex">
                <TextField
                  className="mb-24"
                  label="Réponse"
                  id="response"
                  name="response"
                  value={form.response}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                />
              </div>
            </DialogContent>
          }
        </DialogContent>
        <DialogActions className="justify-between pl-16">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            type="submit"
            disabled={!canBeSubmitted()}
          >
            Ajouter
          </Button>
        </DialogActions>


      </form>
    </Dialog>
  );
}

export default OptionDialog;
