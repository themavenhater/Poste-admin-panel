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
import * as Actions from '../store/actions'
import clsx from "clsx";


const defaultFormState = {
  _id: '',
  name: '',
  image: '',
  tempImage: ''
};

function TypeDialog(props) {

  const dispatch = useDispatch();
  const {types, ...catDialog} = props;
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
      form.name.length > 0
    );
  }

  function canBeSubmittedToEdit() {
    const data = catDialog.data;
    return (
      form.name !== data.name || form.image !== data.image
    );
  }

  function getFormData(data, image) {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data))
    formData.append('files.image', image)
    return formData;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (catDialog.type === 'new') {
      let {_id, tempImage, image, ...clearFrom} = form;
      if (form.tempImage.length > 0) {
        const data = getFormData(clearFrom, image);
        // console.log("new with Image", ...data);
        axios.post(process.env.REACT_APP_BACKEND_URL + '/service-types', data)
          .then((res) => dispatch(Actions.getTypes()))
      } else {
        // console.log('new without Image', {name: form.name})
        axios.post(process.env.REACT_APP_BACKEND_URL + '/service-types', {name: form.name})
          .then((res) => dispatch(Actions.getTypes()))
      }
    } else {
      if (form.tempImage.length > 0) {
        let {_id, image} = form;
        const data = getFormData({name: form.name, image:[]}, image);
        // console.log('edit with Image', ...data)
        axios.put(process.env.REACT_APP_BACKEND_URL + '/service-types/' + _id, data)
          .then((res) => dispatch(Actions.getTypes()))
      } else {
        const data = {
          name: form.name,
        };
        // console.log('edit without Image', data)
        axios.put(process.env.REACT_APP_BACKEND_URL + '/service-types/' + form._id, data)
          .then((res) => dispatch(Actions.getTypes()))
      }
    }
    closeComposeDialog();
  }

  function handleRemove() {
    axios
      .delete(process.env.REACT_APP_BACKEND_URL + '/service-types/' + catDialog.data._id)
      .then((res) => dispatch(Actions.getTypes()));
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
          image: file
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
            {catDialog.type === 'new' ? 'Ajouter un type' : 'modifier type'}
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
          <div className="flex justify-center w-full">
            <input
              accept="image/*"
              className="hidden"
              id="button-file"
              type="file"
              onChange={handleUploadChange}
            />
            {form.image.length > 0 && form.tempImage.length === 0 ?
              <img
                className="w-1/2 h-auto rounded"
                src={process.env.REACT_APP_BACKEND_URL + form.image[0].url}
                alt="categorie"
              /> : form.tempImage.length > 0 ?
                <img
                  className="w-1/2 h-auto rounded"
                  src={form.tempImage}
                  alt="product"
                />
                : <label
                  htmlFor="button-file"
                  className={clsx("flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5")}
                >
                  <Icon fontSize="large" color="action">
                    cloud_upload
                  </Icon>
                </label>
            }

          </div>
          {(form.tempImage !== '' || form.image !== '') &&
          <DialogActions className="justify-center w-full">
            <Button
              className="bg-red-dark text-white hover:bg-white hover:text-red-dark"
              variant="contained"
              color="primary"
              onClick={() => {
                setForm({...form, tempImage: '', image: ''})
              }}>
              Supprimer l'image
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

export default TypeDialog;
