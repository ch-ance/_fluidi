import React, { useEffect, useState, useReducer } from "react";
import gun from "../gun";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Button, Fab, Paper, TextField, Typography } from "@material-ui/core";
import Droplet from "../components/Droplet";
import ComposeDroplet from "../components/ComposeDroplet";
import { useIsLoading, useUser } from "../context/CustomContext";
import { useHistory } from "react-router-dom";
import CreateSharp from "@material-ui/icons/CreateSharp";
import "gun/lib/bye.js";

const initialState = {
  droplets: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "addDroplet":
      const droplet = action.payload;
      return {
        ...state,
        droplets: [...state.droplets, droplet],
      };
    default:
      throw new Error(
        "action type not specified or not included in switch statement"
      );
  }
}

const useStyles = makeStyles({
  view: {
    width: "100%",
    wordBreak: "break-all",
  },
  header: {},
  peerList: {},
  dropletList: {
    marginTop: "15vh",
  },
});

function HomeView() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();
  const { user } = useUser();
  const { setIsLoading } = useIsLoading();
  const history = useHistory();
  const [shouldShowHeader, setShouldShowHeader] = useState(true);
  const href = `${
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/follow?pub="
      : "https://fluidi-v2.netlify.app/follow?pub="
  }${user.is.pub}`;

  useEffect(() => {
    // we have to do this because there may be duplicates
    // of the same user in `user.get("following")`
    let following = [];
    user.get("following").map((f) => {
      console.log(f);
      following.push(f);
    });
    [...new Set(following)].map((f) => {
      console.log(f);
      // subscribe to "following"s droplet feed
      gun
        .user(f)
        .get("droplets")
        .map()
        .on((d) => {
          console.log(d);
          dispatch({
            type: "addDroplet",
            payload: d,
          });
        });
    });
  }, []);

  return (
    <Box className={classes.view}>
      <Box
        style={{
          display: shouldShowHeader ? "unset" : "none",
          position: "fixed",
          zIndex: 100,
          top: 0,
          width: "100%",
        }}
      >
        <Paper>
          <Typography variant="h1" align="center">
            fluidi
          </Typography>
          <Button
            onClick={(e) => {
              const option = prompt(
                "WARNING. This is the developer console. Be extremely careful with the commands you enter here"
              );
              if (option === "delete") {
                e.preventDefault();
                window.sessionStorage.clear();
                setTimeout(() => {
                  history.push("/");
                }, 2500);
              }
            }}
          >
            developer console
          </Button>
          <br />
          <Typography>
            click the button below to get your "follow-me" link
          </Typography>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(href);
              alert("url copied to clipboard. share it with a friend!");
            }}
          >
            Copy Link
          </Button>
        </Paper>
        <Divider />
      </Box>
      <List className={classes.dropletList}>
        {[...new Set(state.droplets)].map((drop) => {
          console.log(drop);
          return (
            <ListItem key={drop.uuid}>
              <Grid container>
                <Droplet
                  text={drop.text}
                  author={drop.author}
                  createdAt={drop.createdAt}
                  alias={drop.alias}
                />
              </Grid>
            </ListItem>
          );
        })}
      </List>
      <Fab
        onClick={() => {
          console.log("clicked button");
          history.push("/create-droplet");
        }}
        style={{
          margin: 0,
          top: "auto",
          right: 20,
          bottom: 20,
          left: "auto",
          position: "fixed",
        }}
      >
        <CreateSharp />
      </Fab>
    </Box>
  );
}

export default HomeView;
