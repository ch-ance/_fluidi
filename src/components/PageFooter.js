import { Typography, Link } from "@material-ui/core";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      style={{ position: "fixed", bottom: 25, right: 25 }}
    >
      <Link color="inherit" href="#">
        Owned and distributed by The People.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default () => {
  return <Copyright />;
};
