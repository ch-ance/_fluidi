import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useIsLoading, useUser } from "../context/CustomContext";
import gun from "../gun";
import {
  Container,
  DialogTitle,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    padding: 5,
    width: "100%",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid blue",
    borderRadius: "10px",
  },
  sendDropletBtn: {},
});

const ComposeDroplet = () => {
  const [dropletText, setDropletText] = useState("");
  const { user } = useUser();
  const [alias, setAlias] = useState("error no alias");
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState("");
  const history = useHistory();
  useEffect(() => {
    setIsLoading("fetching your account...");
    gun.user().on((user) => {
      setAlias(user.alias);
      setIsLoading("");
    });
  }, []);

  return (
    <Container className={classes.root}>
      <Typography variant="h4">Droplet Composition Lab</Typography>
      <form
        className={classes.form}
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoading(
            "uploading droplet into the metaverse, please be patient..."
          );
          user.get("droplets").set(
            {
              uuid: uuidv4(),
              author: user.is.pub,
              text: dropletText,
              createdAt: Date.now(),
              alias,
            },
            (ack) => {
              console.log(ack);
              setIsLoading(false);

              setDropletText("");
              history.push("/home");
            }
          );
        }}
      >
        <TextField
          label="caption text"
          value={dropletText}
          onChange={(e) => setDropletText(e.target.value)}
        />
        <Button
          className={classes.sendDropletBtn}
          type="submit"
          variant="contained"
        >
          send droplet
        </Button>
      </form>
      {isLoading && <DialogTitle>{isLoading}</DialogTitle>}
    </Container>
  );
};

export default ComposeDroplet;
