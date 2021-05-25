import "./App.css";
import Login from "./Pages/Login";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Register from "./Pages/Register";
import { useEffect, useState } from "react";
import auth from "./firebase";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "skeleton-screen-css";
import Trade from "./Pages/Trade";

function App() {
  const [currentUser, SetCurrentUser] = useState(null);

  const history = useHistory();

  useEffect(() => {
    auth.auth().onAuthStateChanged((user) => {
      if (user) {
        // history.push("/home");
      } else {
        // history.push('/login')
      }
    });
  }, []);

  // useEffect(() => {
  //  console.log(currentUser)
  // }, [currentUser])

  return (
    <div  className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="home" />
        </Route>
        <Route exact path="/login">
          <Login SetCurrentUser={(value) => SetCurrentUser(value)} />
        </Route>
        <Route exact path="/home">
          <Navbar />
          <Home />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        {/* <Route path="/trade/*">
          <Redirect to="/trade/BTC" />
        </Route> */}
        <Route path="/trade/:id">
          <Navbar />
          <Trade />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
