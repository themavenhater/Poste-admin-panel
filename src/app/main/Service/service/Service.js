import React, {useEffect, useState} from "react";
import {Button, Icon, IconButton, ListItem, ListItemText, Tab, Tabs, TextField, Typography,} from "@material-ui/core";
import {FuseAnimate, FusePageCarded} from "@fuse";
import {useForm} from "@fuse/hooks";
import {Link} from "react-router-dom";
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import withReducer from "app/store/withReducer";
import * as Actions from "../store/actions";
import reducer from "../store/reducers";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import DialogActions from "@material-ui/core/DialogActions";
import OptionDialog from "./OptionDialog";

const data = {
  name: '',
  description: '',
  service_type: '',
  procedures: [],
  image: '',
  tempImage: '',
  views: []
};

function Service(props) {
  const dispatch = useDispatch();
  const service = useSelector(({services}) => services.service.data);
  const types = useSelector(({services}) => services.types.data);
  const [tabValue, setTabValue] = useState(0);
  const {form, handleChange, setForm} = useForm(null);

  useEffect(() => {
    dispatch(Actions.getTypes());
  }, [dispatch]);

  useEffect(() => {
    function updateServiceState() {
      const params = props.match.params;
      const {serviceId} = params;

      if (serviceId === "new") {
        dispatch(Actions.newService());
        // dispatch(showMessage({message: 'Service Saved'}));
      } else {
        dispatch(Actions.getService(serviceId));
      }
    }

    updateServiceState();
  }, [dispatch, props.match.params]);

  useEffect(() => {
    if (
      (service && !form) ||
      (service && form && service._id !== form._id)
    ) {
      setForm({...data, ...service});
    }
  }, [form, service, setForm]);

  // console.log("form", form.faq)

  function handleChangeTab(event, tabValue) {
    setTabValue(tabValue);
  }

  function handleProcedures(data) {
    setForm({...form, procedures: data})
  }

  function handleFaq(data) {
    setForm({...form, faq: data})
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

  function getFormData(data, image) {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data))
    formData.append('files.image', image)
    return formData;
  }

  function handleSubmit() {
    const {_id, tempImage, image, ...clearForm} = form;
    if (props.match.params.serviceId === "new") {
      if (tempImage.length > 0) {
        const data = getFormData(clearForm, image);
        console.log('new With image', ...data)
        dispatch(Actions.addService(data, props))
      } else {
        console.log('new Without image', clearForm)
        dispatch(Actions.addService(clearForm, props))
      }
    } else {
      if (form.tempImage.length > 0) {
        const data = getFormData(clearForm, image);
        console.log("edit with image ", ...data);
        dispatch(Actions.saveService(data, _id))
      } else {
        console.log('edit without image', clearForm)
        dispatch(Actions.saveService(clearForm, _id))
      }
    }
  }

  function canBeSubmitted() {
    return (
      form.name.length > 0
      && (form.service_type.length > 0 || props.match.params.serviceId !== "new")
      && form.description.length > 0
      // && form.procedures.length > 0
      // && !_.isEqual(service, form)
    );
  }

  const [dialog, setDialog] = useState({
    type: 'new',
    for: 'procedure',
    props: {
      open: false
    },
    data: null
  });

  function closeDialog() {
    setDialog({type: 'new', props: {open: false}, data: null, for: 'procedure'})
  }

  return (
    <FusePageCarded
      classes={{
        toolbar: "p-0",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={
        form && (
          <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full">
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Typography
                  className="normal-case flex items-center sm:mb-12"
                  component={Link}
                  role="button"
                  to="/services-types/services/"
                  color="inherit"
                >
                  <Icon className="mr-4 text-20">arrow_back</Icon>
                  Services
                </Typography>
              </FuseAnimate>

              <div className="flex items-center max-w-full">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                  {service.image?.url?.length > 0 ? (
                    <img
                      className="w-32 sm:w-48 mr-8 sm:mr-16 rounded"
                      src={process.env.REACT_APP_BACKEND_URL + service.image.url}
                      alt={service.name}
                    />
                  ) : (
                    <img
                      className="w-32 sm:w-48 mr-8 sm:mr-16 rounded"
                      src={"assets/images/ecommerce/product-image-placeholder.png"}
                      alt={"placeholder"}
                    />
                  )}
                </FuseAnimate>
                <div className="flex flex-col min-w-0">
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="text-16 sm:text-20 truncate">
                      {form.name ? form.name : "Nouveau Service"}
                    </Typography>
                  </FuseAnimate>
                  {props.match.params.serviceId !== "new" &&
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography variant="caption">{service.service_type.name}</Typography>
                  </FuseAnimate>}
                </div>
              </div>
            </div>
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
              <div className="whitespace-no-wrap">
                {props.match.params.serviceId !== "new" &&
                <Button
                  className="bg-red ml-2"
                  variant="contained"
                  onClick={() =>
                    setDialog({...dialog, type: "deleteService", props: {open: true}, data: service})}
                >
                  <Icon>delete</Icon>
                </Button>}
                <Button
                  className="ml-2 bg-green"
                  variant="contained"
                  disabled={!canBeSubmitted()}
                  onClick={() => handleSubmit()}
                >
                  <Icon>save</Icon>
                </Button>
              </div>
            </FuseAnimate>
          </div>
        )
      }
      contentToolbar={
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          classes={{root: "w-full h-64"}}
        >
          <Tab className="h-64 normal-case" label="Information"/>
          <Tab className="h-64 normal-case" label="Procedures"/>
          {
            props.match.params.serviceId !== "new" &&
            <Tab className="h-64 normal-case" label="Foire aux questions"/>
          }
        </Tabs>
      }
      content={
        form && (
          <div className="p-16 sm:p-24 max-w-2xl">
            {tabValue === 0 && (
              <div>
                <TextField
                  className="mt-8 mb-16"
                  required
                  label="Nom du service"
                  autoFocus
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  className="mt-8 mb-16"
                  id="description"
                  name="description"
                  onChange={handleChange}
                  label="Description"
                  type="text"
                  value={form.description}
                  multiline
                  rows={5}
                  variant="outlined"
                  fullWidth
                  required
                />
                <FormControl className="mt-8 mb-16 w-full">
                  <InputLabel>Types *</InputLabel>
                  <Select
                    id="service_type"
                    name="service_type"
                    value={form.service_type}
                    onChange={handleChange}
                  >
                    {types.map((type, i) =>
                      <MenuItem key={i} value={type._id} selected={true}>{type.name}</MenuItem>
                    )}
                  </Select>
                </FormControl>
                <div className="flex w-1/3 flex-col">
                  <Typography className="text-20">Icon</Typography>
                  <input
                    accept="image/*"
                    className="hidden"
                    id="button-file"
                    type="file"
                    onChange={handleUploadChange}
                  />
                  {service.image.length > 0 ?
                    <img
                      className="w-1/2 h-auto rounded"
                      src={process.env.REACT_APP_BACKEND_URL + service.image.url}
                      alt="service"
                    /> : form.tempImage.length > 0 ?
                      <img
                        className="w-1/2 h-auto rounded"
                        src={form.tempImage}
                        alt="service"
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
                {(form.tempImage !== '' || service.image !== '') &&
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
              </div>
            )}
            {tabValue === 1 && (
              <div>
                {form.procedures.map((one, index) => (
                  <ListItem
                    button
                    dense
                    key={index}
                    onClick={() => setDialog({
                      type: "delete",
                      data: {procedures: form.procedures, toDelete: one},
                      props: {open: true},
                      for: 'procedures'
                    })}
                  >
                    <ListItemText
                      primary={"titre: " + one.title}
                      secondary={"description: " + one.description}
                    />
                    <IconButton>
                      <Icon style={{color: "red"}}>delete</Icon>
                    </IconButton>
                  </ListItem>
                ))}
                <ListItem
                  button
                  dense
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: 'column',
                  }}
                  onClick={() => setDialog({
                    type: "new",
                    for: 'procedures',
                    data: form.procedures,
                    props: {open: true}
                  })}
                > <Typography className="text-16 sm:text-20 truncate"> Ajouter une étape</Typography>
                  <Icon style={{color: "green"}}>add</Icon>
                </ListItem>
              </div>
            )}

            {/*
            {tabValue === 2 && (
              <div>
                {form.faq.map((one, index) => (
                  <ListItem
                    button
                    dense
                    key={index}
                    onClick={() => setDialog({
                      type: "delete",
                      data: {faq: form.faq, toDelete: one},
                      props: {open: true},
                      for: 'faq'
                    })}
                  >
                    <ListItemText
                      primary={"Question: " + one.question}
                      secondary={"Réponse: " + one.response}
                    />
                    <IconButton>
                      <Icon style={{color: "red"}}>delete</Icon>
                    </IconButton>
                  </ListItem>
                ))}
                <ListItem
                  button
                  dense
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: 'column',
                  }}
                  onClick={() => setDialog({
                    type: "new",
                    for: 'faq',
                    data: form.faq,
                    props: {open: true}
                  })}
                >
                  <Typography className="text-16 sm:text-20 truncate"> Ajouter une question fréquente</Typography>
                  <Icon style={{color: "green"}}>add</Icon>
                </ListItem>
              </div>
            )}
*/}
            {props.match.params.serviceId !== "new" && tabValue === 2 && service.faq && (
              <div>
                {service.faq.content && service.faq.content.map((one, index) => (
                  <ListItem
                    dense
                    key={index}
                  >
                    <ListItemText
                      primary={"Question: " + one.question}
                      secondary={"Réponse: " + one.response}
                    />
                  </ListItem>
                ))}

              </div>
            )}
            <OptionDialog
              handleFaq={handleFaq}
              handleProcedures={handleProcedures}
              dialog={dialog}
              closeDialog={closeDialog}
              navigation={props.history.push}
            />
          </div>
        )
      }
      innerScroll
    />
  );
}

/*
const useStyles = makeStyles((theme) => ({
  productImageFeaturedStar: {
    position: "absolute",
    top: 0,
    right: 0,
    color: red[400],
    opacity: 0,
  },
  productImageUpload: {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
  productImageItem: {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    "&:hover": {
      "& $productImageFeaturedStar": {
        opacity: 0.8,
      },
    },
    "&.featured": {
      pointerEvents: "none",
      boxShadow: theme.shadows[3],
      "& $productImageFeaturedStar": {
        opacity: 1,
      },
      "&:hover $productImageFeaturedStar": {
        opacity: 1,
      },
    },
  },
}));
*/

export default withReducer("services", reducer)(Service);
