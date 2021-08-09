import { Avatar, Card, Grid, makeStyles, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  root: {
    minHeight: 100,
    border: "1px solid black",
    marginTop: 15,
    padding: 15,
    width: "100%",
  },
});

const Droplet = ({ text, author, createdAt, alias }) => {
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <Card className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6">{alias}</Typography>

          <Typography>{text}</Typography>
          <Typography variant="caption">public key: {author}</Typography>
          <Typography>{new Date(createdAt).toString()}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Droplet;
