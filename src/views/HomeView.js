import React, { useEffect, useState, useReducer } from "react";
import gun from "../gun";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Button, TextField, Typography } from "@material-ui/core";
import Droplet from "../components/Droplet";
import ComposeDroplet from "../components/ComposeDroplet";
import { useIsLoading, useUser } from "../context/CustomContext";
import { useHistory } from "react-router-dom";
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
  peerList: {},
  dropletList: {},
});

function HomeView() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();
  const { user } = useUser();
  const { setIsLoading } = useIsLoading();
  const history = useHistory();
  const href = `${
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/follow?pub="
      : "https://fluidi.netlify.app/follow?pub="
  }${user.is.pub}`;

  useEffect(() => {
    // gun.user().once((user) => {
    // console.log(user.alias);

    user
      .get("following")
      .map()
      .once((f) => {
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
      <Typography variant="h1" align="center">
        fluidi
      </Typography>
      <Button
        onClick={(e) => {
          e.preventDefault();
          window.sessionStorage.clear();
          setTimeout(() => {
            history.push("/");
          }, 1000);
        }}
      >
        Click here to logout
      </Button>
      <p>
        Send this link to a friend so they can follow you:
        <a href={href}>{href}</a>
      </p>
      <ComposeDroplet />

      <Divider />
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
    </Box>
  );
}

export default HomeView;
