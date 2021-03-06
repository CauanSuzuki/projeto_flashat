import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Button from "@material-ui/core/Button";
import axios from "axios";

import { useHistory, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";

import { useAllocate } from "../context/allocate";
import {} from "./style.css";

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

  const formik = useFormik({
    initialValues: {
      mensage: "",
    },
    onSubmit: async (value) => {
      sendMensage();
      cancelCourse();
    },
  });

  const classes = useStyles();

  const {
    token,
    dadosOtherUser,
    chat,
    setChat,
    lastMessage,
    setLastMessage,
    setChatAtual,
  } = useAllocate();

  let identificar = useParams();

  const [dados, setDados] = useState([dadosOtherUser]);

  const endMessage = lastMessage[lastMessage.length - 1];

  const [read, setRead] = useState([]);

  useEffect(() => {
    async function showMessage() {
      await axios
        .get(
          `http://localhost:3312/message/showMessage/${dadosOtherUser?.chat?.id}`,
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        )
        .then(function(result) {
          if (identificar.idChat == dadosOtherUser.chat.id) {
            setChat(result.data.showMessage);
            setLastMessage(result.data.showMessage);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    showMessage();

    setChatAtual(identificar.idChat);
  }, []);

  async function sendMensage() {
    await axios
      .post(
        `http://localhost:3312/message/sendMessage/${identificar.idChat}`,
        {
          text: formik.values.mensage,
        },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      )
      .then((resposta) => {
        setChat([...chat, resposta.data.result]);
      });
  }

  function cancelCourse() {
    document.getElementById("chatBoxIn").reset();
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
        {dadosOtherUser?.otherUser?.name}
      </div>

      <ScrollToBottom
        className="ROOT_CSS"
        initialScrollBehavior="smooth"
        mode="bottom"
      >
        <div className="chatPlace">
          {chat.map((item) =>
            item.userId == token.user.id ? (
              <div className="externMsg">{item.text}</div>
            ) : (
              <div className="myMsg">{item.text}</div>
            )
          )}
        </div>
      </ScrollToBottom>

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
