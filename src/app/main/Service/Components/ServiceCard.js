import {
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";

function ServiceCard(props) {
  return (
    <Paper className="w-full rounded-8 shadow-none border-1">
      <div className="text-left pt-12 pb-28">
        <Typography className={"text-28 text-center leading-none text-"+props.color}>
          {props.title}
        </Typography>
        <List>
        {[...Array(props.id)].map((x, i) =>
          <ListItem key={i}>
            <ListItemText primary= {
                <Typography
                component="span"
                variant="body1"
                //className="text-28"
                color="textPrimary"
              >
                Informations utiles (EDAHABIA)
              </Typography>
            } />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          )}
        </List>
      </div>
      <div className="flex items-right px-16 h-52 float-right">
        <Fab color="primary" aria-label="Add" size="medium">
          <AddIcon />
        </Fab>
      </div>
    </Paper>
  );
}

export default React.memo(ServiceCard);
