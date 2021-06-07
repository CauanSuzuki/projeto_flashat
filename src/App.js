import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
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
      <div>
        <Switch>
          <Route exact path="/chat" component={PageChat}></Route>
          <Route exact path="/list" component={PageList}></Route>
          <Route exact path="/contacts" component={PageContacts}></Route>
          <Route exact path="/account" component={PageAccount}></Route>
          <Route exact path="/register" component={PageRegister}></Route>
          <Route
            exact
            path="/"
            render={(props) =>
              login === "cauan" && senha === "123" ? (
                <PageLogin {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          ></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
