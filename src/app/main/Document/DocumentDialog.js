import React, {useCallback, useEffect} from 'react';
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  TextField,
  Toolbar,
  Typography
} from '@material-ui/core';
import {useForm} from '@fuse/hooks';
import {useDispatch} from "react-redux";
import axios from 'axios'
import * as Actions from './store/actions'
import clsx from "clsx";
import Alert from "@material-ui/lab/Alert";


const defaultFormState = {
  _id: '',
  title: '',
  description: '',
  image: '',
  tempImage: '',
  views: []
};

function DocumentDialog(props) {

  const dispatch = useDispatch();
  const catDialog = props;
  const {form, handleChange, setForm} = useForm(defaultFormState);

  const initDialog = useCallback(
    () => {
      /**
       * Dialog type: 'edit'
       */
      if (catDialog.type === 'edit') {
        setForm({...catDialog.data, tempImage: ''});
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
      form.title.length > 0 &&
      form.description.length > 0 &&
      form.file
    );
  }

  function canBeSubmittedToEdit() {
    const data = catDialog.data;
    return (
      form.title !== data.title ||
      form.description !== data.description ||
      form.file !== data.file
    );
  }

  function getFormData(data, file) {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data))
    formData.append('files.file', file)
    return formData;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (catDialog.type === 'new') {
      let {_id, tempImage, file, ...clearFrom} = form;
      if (form.tempImage.length > 0) {
        const data = getFormData(clearFrom, file);
        // console.log("new with Image", ...data);
        axios.post(process.env.REACT_APP_BACKEND_URL + '/documents', data)
          .then((res) => dispatch(Actions.getDocuments()))
      } else {
        return <Alert color={'warning'}  > Veuillez sélectionner un document</Alert>
      }
    } else {
      const data = {
        title: form.title,
        description: form.description,
      };
      if (form.tempImage.length > 0) {
        let {_id, file} = form;
        const formData = getFormData(data, file);
        // console.log('edit with Image', ...data)
        axios.put(process.env.REACT_APP_BACKEND_URL + '/documents/' + _id, formData)
          .then((res) => dispatch(Actions.getDocuments()))
      } else {
        // console.log('edit without Image', data)
        axios.put(process.env.REACT_APP_BACKEND_URL + '/documents/' + form._id, data)
          .then((res) => dispatch(Actions.getDocuments()))
      }
    }
    closeComposeDialog();
  }

  function handleRemove() {
    axios
      .delete(process.env.REACT_APP_BACKEND_URL + '/documents/' + catDialog.data._id)
      .then((res) => dispatch(Actions.getDocuments()));
    closeComposeDialog();
  }

  function handleUploadChange(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => {
      setForm({
          ...form, tempImage: `data:${file.type};base64,${btoa(reader.result)}`,
          file: file
        }
      );
    };
    reader.onerror = function () {
      console.log("error on load image");
    };
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
              Supprimer un type
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent classes={{root: "p-24"}} elevation={1}>
          <Typography variant="h5" color="inherit">
            Etes vous sûr de vouloir supprimer ce type ?
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
            {catDialog.type === 'new' ? 'Ajouter un document' : 'modifier document'}
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
              label="Entrez la description"
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={4}
              required
              fullWidth
            />
          </div>
          <div className="flex justify-center w-full">
            <input
              accept="*/*"
              className="hidden"
              id="button-file"
              type="file"
              onChange={handleUploadChange}
            />
            {form.file?.url?.length >0 ? <label
              htmlFor="button-file"
              className={clsx("flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5")}
            >
              <Icon fontSize="large" className='bg-white text-green-dark'>
                check
              </Icon>
            </label>:
              <label
                htmlFor="button-file"
                className={clsx("flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5")}
              >
                <Icon fontSize="large" color="action">
                  cloud_upload
                </Icon>
              </label>}
          </div>
          {form.file !== '' &&
          <DialogActions className="justify-center w-full">
            <Button
              className="bg-red-dark text-white hover:bg-white hover:text-red-dark"
              variant="contained"
              color="primary"
              onClick={() => {
                setForm({...form, file: ''})
              }}>
              Supprimer le document
            </Button>
          </DialogActions>
          }

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

export default DocumentDialog;
