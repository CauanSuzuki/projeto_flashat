import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PageChat from "./pages/chat";
import PageList from "./pages/Lists";
import PageContacts from "./pages/contacts";
import PageAccount from "./pages/account";
import PageLogin from "./pages/login";
import PageRegister from "./pages/register";

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/chat/:idChat" component={PageChat}></Route>
          <Route exact path="/list" component={PageList}></Route>
          <Route exact path="/contacts" component={PageContacts}></Route>
          <Route exact path="/account" component={PageAccount}></Route>
          <Route exact path="/register" component={PageRegister}></Route>
          <Route exact path="/login" component={PageLogin}></Route>
          <Route
            exact
            path="/"
            render={(props) =>
              !localStorage.getItem("token") ? <Redirect to="/login" /> : <PageList {...props} />
            }
          ></Route>
        </Switch>
    </Router>
  );
}

export default App;
