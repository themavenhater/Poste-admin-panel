import React, {useCallback, useEffect} from 'react';
import {AppBar, Button, Dialog, DialogActions, DialogContent, TextField, Toolbar, Typography} from '@material-ui/core';
import {useForm} from '@fuse/hooks';
import {useDispatch} from "react-redux";
import axios from 'axios'
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import * as Actions from './store/actions';
import {makeStyles} from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl";

const defaultFormState = {
  title: '',
  content: '',
  type: '',
  menu: 'rh',
  views: []
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function NotesDialog(props) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const catDialog = props;
  const {form, handleChange, setForm} = useForm(defaultFormState);

  const initDialog = useCallback(
    () => {
      /**
       * Dialog type: 'edit'
       */
      if (catDialog.type === 'edit') {
        setForm({...catDialog.data});
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

  }, [catDialog.props.open, initDialog])


  function closeComposeDialog() {
    setForm(defaultFormState);
    props.closeDialog()
  }

  function canBeSubmittedToAdd() {
    return (
      form.title.length > 0 &&
      form.content.length > 0 &&
      form.type.length > 0
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (catDialog.type === 'new') {
      axios.post(process.env.REACT_APP_BACKEND_URL + '/notes', form)
        .then(() => dispatch(Actions.getNotes()));
    } else {
      axios.put(process.env.REACT_APP_BACKEND_URL + '/notes/' + form._id, form)
        .then(() => dispatch(Actions.getNotes()));
    }
    console.log('form', form);
    closeComposeDialog();
  }

  function handleRemove() {
    axios
      .delete(process.env.REACT_APP_BACKEND_URL + '/notes/' + catDialog.data._id)
      .then((res) => dispatch(Actions.getNotes()));
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
              Supprimer une note
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent classes={{root: "p-24"}} elevation={1}>
          <Typography variant="h5" color="inherit">
            Etes vous sûr de vouloir supprimer cette note ?
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
      maxWidth="md"
    >

      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Note
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
        <DialogContent classes={{root: "p-24"}}>

          <div className="flex">
            <TextField
              className="mb-24"
              label="Entrez le titre"
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
              id="content"
              name="content"
              value={form.content}
              onChange={handleChange}
              variant="outlined"
              required
              multiline
              rows={3}
              rowsMax={3}
              fullWidth
            />
          </div>
          <div className="flex w-full mb-10">
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="type"
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <MenuItem value='formation'>Formation</MenuItem>
                <MenuItem value='candidature'>Candidature</MenuItem>
                <MenuItem value='interimNote'>Notes d'interim</MenuItem>
                <MenuItem value='nomination'>Nomination</MenuItem>
                <MenuItem value='serviceNote'>Notes de service</MenuItem>
                <MenuItem value='convention'>Convention</MenuItem>
                <MenuItem value='formulaire'>Formulaire</MenuItem>
                <MenuItem value='omra'>Omra</MenuItem>
                <MenuItem value='vacances'>Vacances</MenuItem>
              </Select>

            </FormControl>
          </div>
        </DialogContent>
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
      </form>
    </Dialog>
  );
}

export default NotesDialog;
