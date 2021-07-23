import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { io } from "socket.io-client";

import events from "./emitters/events";

import PageChat from "./pages/chat";
import PageList from "./pages/Lists";
import PageContacts from "./pages/contacts";
import PageAccount from "./pages/account";
import PageLogin from "./pages/login";
import PageRegister from "./pages/register";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

function App() {
  useEffect(() => {
    Notification.requestPermission();

    const socket = io.connect("http://localhost:3312/", {
      transport: ["websocket"],
    });

    socket.on("new-message", (data) => {
      if (
        Notification.permission === "granted" &&
        data.userId !== Number(localStorage.getItem("userId"))
      ) {
        // var notification = alertify.notify(
        //   `${data.users.name} send "${data.text}"`,
        //   "success",
        //   5,
        //   function(isClicked) {
        //     if (isClicked) console.log("notification dismissed by user");
        //     else console.log("notification auto-dismissed");
        //   }
        // );
        new Notification(data.users.name, {
          body: data.text,
        });

        events.emit("nova-mensagem", data);
      }
    });
  }, []);

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
            !localStorage.getItem("token") ? (
              <Redirect to="/login" />
            ) : (
              <PageList {...props} />
            )
          }
        ></Route>
      </Switch>
    </Router>
  );
}

export default App;
