import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SignInView from "./views/SignInView";
import HomeView from "./views/HomeView";
import FollowUserView from "./views/FollowUserView";
import gun from "./gun";
import { useUser, useIsLoading } from "./context/CustomContext";
import { useEffect } from "react";
import { Typography } from "@material-ui/core";

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
          <SignInView />
        </Route>
        <Route exact path="/home">
          <HomeView />
        </Route>
        <Route exact path="/follow">
          <FollowUserView />
        </Route>
        <Route path="/*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
