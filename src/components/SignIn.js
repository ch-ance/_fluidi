import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useUser, useIsLoading } from "../context/CustomContext";
import { useHistory } from "react-router-dom";
import PageFooter from "./PageFooter";
import gun from "../gun";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.main,
    height: "100vh",
    position: "absolute",
    left: 0,
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  readMoreLink: {
    color: theme.palette.text.hint,
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [alias, setAlias] = useState("");
  const [pass, setPass] = useState("");
  const history = useHistory();

  const handleSignIn = (e) => {
    e.preventDefault();

    // try to create a new user and authenticated. If the user
    // already exists, just try to authenticate.
    const user = gun.user().recall({ sessionStorage: true });
    try {
      user.create(alias, pass, (ack) => {
        console.log(ack);
        user.auth(alias, pass, (ack) => {
          console.log(ack);
          // window.location.reload();
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h1" variant="h4">
          fluidi
        </Typography>

        <DialogTitle>What is fluidi?</DialogTitle>
        <DialogContentText align="center">
          fluidi is a decentralized, peer to peer social media network that has
          Audio at its core.{" "}
          <Link className={classes.readMoreLink}>Read more here.</Link>
        </DialogContentText>

        <DialogContentText align="right">
          Please enter a user alias and a password to secure your account. Don't
          worry, we won't ever store your password anywhere.
        </DialogContentText>
        <DialogContentText variant="overline" align="right">
          How is this possible?
        </DialogContentText>
        <DialogContentText align="right">
          We use cryptographic hashes to generate a Bitcoin-like proof-of-work
          cryptographic hash that is used to authenticate you.
          <br />
          <Link className={classes.readMoreLink}>
            Here's some cartoons explaining how it works
          </Link>
        </DialogContentText>
        <DialogContentText align="center"></DialogContentText>
        <Typography component="h2" variant="h5">
          Create an Account
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="alias"
            name="alias"
            autoFocus
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignIn}
          >
            Create Account
          </Button>
        </form>
      </div>
      <PageFooter />
    </Container>
  );
}
