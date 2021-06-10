import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {} from "./style.css";
import { useFormik } from "formik";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function Chat() {
  let history = useHistory();

  const redirectList = () => {
    history.push(`/list`);
  };

  const [chat, setChat] = useState([]);

  const formik = useFormik({
    initialValues: {
      mensage: "",
    },
    onSubmit: async (value) => {
      setChat([...chat, value]);
      cancelCourse();
    },
  });

  const classes = useStyles();

  function cancelCourse() {
    document.getElementById("chatBoxIn").reset();
  }

  async function list() {
    axios
      .get("http://localhost:3312/message/showMessage/1", {})
      .then(function (result) {
        setChat(result.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="chatMain">
      <div className="Nav">
        <Button
          type="submit"
          value="send"
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => redirectList()}
        >
          RETURN
        </Button>
        <p>login("numero do celular")</p>
      </div>

      <div className="chatPlace">
        <ScrollToBottom
          className="ROOT_CSS"
          initialScrollBehavior="smooth"
          mode="bottom"
        >
          {chat.map((item) => (
            <div>{item.mensage}</div>
          ))}
        </ScrollToBottom>
      </div>

      <div className="textPlace">
        <form id="chatBoxIn" onSubmit={formik.handleSubmit}>
          <textarea
            id="mensage"
            type="text"
            name="mensage"
            placeholder="text mensage"
            onChange={formik.handleChange}
          />

          <Button
            type="submit"
            value="send"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
export default Chat;
