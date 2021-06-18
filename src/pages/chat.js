import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {} from "./style.css";
import { useFormik } from "formik";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";
import mensagens from "../data/mensagens.json";
import conversas from "../data/conversas.json";
import { useAllocate } from "../context/allocate";

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
  const [mensage, setMensage] = useState("");

  const formik = useFormik({
    initialValues: {
      mensage: "",
    },
    onSubmit: async (value) => {
      setChat([...chat, value]);
      sendMensage();
      cancelCourse();
    },
  });

  const classes = useStyles();

  const { token, data, setData, touch, dadosOtherUser } = useAllocate();

  function cancelCourse() {
    document.getElementById("chatBoxIn").reset();
  }

  let identificar = useParams();

  useEffect(() => {
    async function showMessage() {
      await axios
        .get(
          `http://localhost:3312/message/showMessage/${identificar.idChat}`,
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        )
        .then(function(result) {
          setChat(result.data);
          setTimeout(() => {
            showMessage();
          }, 30000);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    showMessage();
  }, []);

  function sendMensage() {
    axios
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
      .then((resposta) => console.log(resposta.data));
  }

  console.log("chat-->", chat);
  console.log("TOUCH -->", touch);
  console.log("token -->", token);
  console.log("otherUser -->", dadosOtherUser)

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
        {dadosOtherUser.name}
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
