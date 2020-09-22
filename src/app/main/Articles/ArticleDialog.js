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
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import clsx from "clsx";


const defaultFormState = {
  _id: '',
  title: '',
  description: '',
  content: '',
  cover: '',
  tags: [],
  tempImage: '',
  views: []
};

function ArticleDialog(props) {

  const dispatch = useDispatch();
  const {tags, ...catDialog} = props;
  const {form, handleChange, setForm} = useForm(defaultFormState);

  const initDialog = useCallback(
    () => {
      /**
       * Dialog type: 'edit'
       */
      if (catDialog.type === 'edit') {
        setForm({cover: '', ...catDialog.data, tempImage: ''});
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
      form.content.length > 0 &&
      form.tags.length > 0
    );
  }

  function canBeSubmittedToEdit() {
    const data = catDialog.data;
    return (
      form.title !== data.title
      || form.description !== data.description
      || form.content !== data.content
      || form.cover !== data.cover
      || form.tags !== data.tags
    );
  }

  function getFormData(data, image) {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data))
    formData.append('files.cover', image)
    return formData;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (catDialog.type === 'new') {
      let {_id, tempImage, image, ...clearFrom} = form;
      if (form.tempImage.length > 0) {
        const data = getFormData(clearFrom, image);
        // console.log("new with Image", ...data);
        axios.post(process.env.REACT_APP_BACKEND_URL + '/articles', data)
          .then((res) => dispatch(Actions.getArticles()))
      } else {
        // console.log('new without Image', clearFrom)
        axios.post(process.env.REACT_APP_BACKEND_URL + '/articles', clearFrom)
          .then((res) => dispatch(Actions.getArticles()))
      }
    } else {
      let {_id, tempImage, cover, ...clearFrom} = form;
      if (form.tempImage.length > 0) {
        const data = getFormData(clearFrom, cover);
        // console.log('edit with Image', ...data)
        axios.put(process.env.REACT_APP_BACKEND_URL + '/articles/' + _id, data)
          .then((res) => dispatch(Actions.getArticles()))
      } else {
        // console.log('edit without Image', clearFrom)
        axios.put(process.env.REACT_APP_BACKEND_URL + '/articles/' + _id, clearFrom)
          .then((res) => dispatch(Actions.getArticles()))
      }
    }
    closeComposeDialog();
  }

  function handleRemove() {
    axios
      .delete(process.env.REACT_APP_BACKEND_URL + '/articles/' + catDialog.data._id)
      .then((res) => dispatch(Actions.getArticles()));
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
          cover: file
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
              Supprimer un article
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent classes={{root: "p-24"}} elevation={1}>
          <Typography variant="h5" color="inherit">
            Etes vous sûr de vouloir supprimer cet article ?
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
            {catDialog.type === 'new' ? 'Ajouter un article' : 'modifier article'}
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
              label="description"
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              variant="outlined"
              required
              multiline
              rowsMax={3}
              fullWidth
            />
          </div>
          <div className="flex">
            <TextField
              className="mb-24"
              label="content"
              id="content"
              name="content"
              value={form.content}
              onChange={handleChange}
              variant="outlined"
              required
              multiline
              rowsMax={5}
              fullWidth
            />
          </div>
          <div className="flex w-full mb-10">
            <Autocomplete
              multiple
              id="tags-outlined"
              className="w-full "
              options={tags}
              getOptionLabel={(option) => option.name}
              value={form.tags}
              onChange={(event, newTag) => {
                setForm({...form, tags: newTag})
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
                  label="Tags"
                  placeholder="selectionner les tags"
                />
              )}
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

            {form?.cover?.url?.length > 0 && form.tempImage.length === 0 ?
              <img
                className="w-1/4 h-auto rounded"
                src={process.env.REACT_APP_BACKEND_URL + form.cover.url}
                alt="cover"
              /> : form.tempImage.length > 0 ?
                <img
                  className="w-1/4 h-auto rounded"
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
          {(form.tempImage !== '' || form.cover !== '') &&
          <DialogActions className="justify-center w-full">
            <Button
              className="bg-red-dark text-white hover:bg-white hover:text-red-dark"
              variant="contained"
              color="primary"
              onClick={() => {
                setForm({...form, tempImage: '', cover: ''})
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

export default ArticleDialog;
