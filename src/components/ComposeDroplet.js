import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useIsLoading, useUser } from "../context/CustomContext";
import gun from "../gun";

const ComposeDroplet = () => {
  const [dropletText, setDropletText] = useState("");
  const { user } = useUser();
  const { isLoading, setIsLoading } = useIsLoading();
  const [alias, setAlias] = useState("error no alias");

  useEffect(() => {
    setIsLoading("fetching your account...");
    gun.user().on((user) => {
      setAlias(user.alias);
      setIsLoading(false);
    });
  });

  return (
    <form
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
          }
        );
      }}
    >
      <TextField
        value={dropletText}
        onChange={(e) => setDropletText(e.target.value)}
      />
      <Button type="submit">send droplet</Button>
    </form>
  );
};

export default ComposeDroplet;
