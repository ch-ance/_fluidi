import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../context/CustomContext";
const FollowUserView = () => {
  const history = useHistory();
  const { user } = useUser();

  useEffect(() => {
    const pub = new URLSearchParams(history.location.search).get("pub");
    console.log(pub);
    try {
      user.get("following").set(pub, (ack) => {
        console.log(ack);
        history.push("/");
      });
    } catch (err) {
      console.error(err);
      alert(err);
    }
  }, []);

  return <h1>loading... this might take a moment</h1>;
};

export default FollowUserView;
