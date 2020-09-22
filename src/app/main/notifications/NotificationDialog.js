import React, {useEffect, useState} from 'react';
import {AppBar, Button, Dialog, DialogActions, DialogContent, TextField, Toolbar, Typography} from '@material-ui/core';
import {useForm} from '@fuse/hooks';
import {useDispatch} from "react-redux";
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from '@material-ui/core/styles';
import * as Actions from './store/actions'
import FormControl from "@material-ui/core/FormControl";
import axios from 'axios'

const defaultFormState = {
  title: '',
  body: '',
  regions: [],
  functions: []
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

function NotificationDialog(props) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const {regions, functions, ...catDialog} = props;
  const {form, handleChange, setForm} = useForm(defaultFormState);
  const [filter, setFilter] = useState('')
  const users = regions.reduce((acc, cur) => [...acc, ...cur.users], [])

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (catDialog.props.open) {
      setForm({
        ...defaultFormState,
      });
    }

  }, [catDialog.props.open, setForm]);

  // useEffect(()=>{},[filter])

  function closeComposeDialog() {
    setForm(defaultFormState);
    props.closeDialog()
  }

  function canBeSubmittedToAdd() {
    return (
      form.title.length > 0 &&
      form.body.length > 0 &&
      (
        (filter === "functions" && form.functions.length > 0) ||
        (filter === "regions" && form.regions.length > 0) ||
        (filter === "")
      )
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    let data = {...form}
    if (filter === "") {
      data = {...data, functions: [], regions: []}
      console.log('empty filter', data)
      const tokens = users.reduce((acc, cur) => [...acc, cur.pushToken], [])
      const sendNotif = {
        message:{...data},
        tokens: tokens
      }
      axios.post(process.env.REACT_APP_BACKEND_URL + '/notifications', data)
        .then(() => dispatch(Actions.getNotifications()));
      axios.post(process.env.REACT_APP_BACKEND_URL + '/notifications/send', sendNotif)
        .then(() => dispatch(Actions.getNotifications()));
    } else {
      if (filter === "regions") {
        const data = {...form, functions: []}
        console.log('regions filter', data)
        axios.post(process.env.REACT_APP_BACKEND_URL + '/notifications', data)
          .then(() => dispatch(Actions.getNotifications()));
      } else {
        const data = {...form, regions: []}
        console.log('functions filter', data)
        axios.post(process.env.REACT_APP_BACKEND_URL + '/notifications', data)
          .then(() => dispatch(Actions.getNotifications()));
      }
    }
    closeComposeDialog();
  }

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
            Envoyer une notification
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
              label="contenu"
              id="body"
              name="body"
              value={form.body}
              onChange={handleChange}
              variant="outlined"
              required
              multiline
              rowsMax={3}
              fullWidth
            />
          </div>
          <div className="flex w-full mb-10">
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Filtre</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                onChange={(value) => setFilter(value.target.value)}
              >
                <MenuItem value=''>pas de filtre</MenuItem>
                <MenuItem value='regions'>Regions</MenuItem>
                <MenuItem value='functions'>Functions</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex w-full mb-10">
            {filter === 'regions' && <Autocomplete
              multiple
              id="regions-outlined"
              className="w-full "
              options={regions}
              getOptionLabel={(option) => option.name}
              value={form.regions}
              onChange={(event, newTag) => {
                setForm({...form, regions: newTag})
              }}
              getOptionSelected={(option, value) => option._id === value._id}
              filterSelectedOptions
              renderTags={(value) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option.name} key={index}/>
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="w-full"
                  variant="outlined"
                  label="Regions"
                  placeholder="selectionner les regions"
                />
              )}
            />}
          </div>
          <div className="flex w-full mb-10">
            {filter === 'functions' && <Autocomplete
              multiple
              id="functions-outlined"
              className="w-full"
              options={functions}
              getOptionLabel={(option) => option.name}
              value={form.functions}
              onChange={(event, newTag) => {
                setForm({...form, functions: newTag})
              }}
              getOptionSelected={(option, value) => option._id === value._id}
              filterSelectedOptions
              renderTags={(value) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option.name} key={index}/>
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="w-full"
                  variant="outlined"
                  label="Fonctions"
                  placeholder="selectionner les fonctions"
                />
              )}
            />}
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

export default NotificationDialog;
