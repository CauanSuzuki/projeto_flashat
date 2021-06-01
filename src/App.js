import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageChat from "./pages/chat";
import PageList from "./pages/Lists";
import PageContacts from "./pages/contacts";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/chat" component={PageChat}></Route>
          <Route exact path="/" component={PageList}></Route>
          <Route exact path="/contacts" component={PageContacts}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
