import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Typography } from "@material-ui/core";
import SignInView from "./views/SignInView";
import HomeView from "./views/HomeView";
import FollowUserView from "./views/FollowUserView";
import ComposeDropletView from "./views/ComposeDropletView";
import { useUser, useIsLoading } from "./context/CustomContext";
import gun from "./gun";
import PageFooter from "./components/PageFooter";

function App() {
  const { user, setUser } = useUser();
  const { isLoading, setIsLoading } = useIsLoading();

  useEffect(() => {
    const _user = gun.user().recall({ sessionStorage: true });
    setUser(_user);
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <Typography variant="h1">{isLoading}</Typography>
  ) : (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to={user?.is ? "/home" : "/create-account"} />
        </Route>
        <Route exact path="/create-account">
          {user?.is ? <Redirect to="/home" /> : <SignInView />}
        </Route>
        <Route exact path="/home">
          {user?.is ? <HomeView /> : <Redirect to="/create-account" />}
        </Route>
        <Route exact path="/follow">
          <FollowUserView />
        </Route>
        <Route exact path="/create-droplet">
          <ComposeDropletView />
        </Route>
        <Route path="/*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
