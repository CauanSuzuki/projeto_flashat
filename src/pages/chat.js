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

  const { token, data, setData, touch } = useAllocate();

  function cancelCourse() {
    document.getElementById("chatBoxIn").reset();
  }

  let identificar = useParams();
console.log(identificar.idChat)

  useEffect(() => {
    function createChat() {
      axios
        .post(
          "http://localhost:3312/chat/createchat",
          {
            data: { userId: identificar.idChat },
          },
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        )
        .then((resposta) => console.log(resposta.data));
    }
    createChat();
  }, []);
  // async function showMessage() {
  //   axios
  //     .get(`http://localhost:3312/message/showMessage/${identificar}`, {})
  //     .then(function(result) {
  //       setChat(result.data);
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // }
  // function sendMensage() {
  //   axios
  //     .post(`http://localhost:3312/message/sendMessage/${identificar}`, {
  //       text: chat,
  //     })
  //     .then((resposta) => console.log(resposta.data));
  // }

  async function showMessage() {
    axios
      .get(`http://localhost:3312/message/showMessage/${identificar}`, {})
      .then(function(result) {
        setChat(result.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  function sendMensage() {
    axios
      .post(`http://localhost:3312/message/sendMessage/${identificar}`, {
        text: chat,
      })
      .then((resposta) => console.log(resposta.data));
  }

  console.log("chat-->", chat);
  console.log("TOUCH -->", touch);
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
        {/* <p>{data.map((item)=> item.name === )}</p> */}
      </div>

      <div className="chatPlace">
        <ScrollToBottom
          className="ROOT_CSS"
          initialScrollBehavior="smooth"
          mode="bottom"
        >
          {mensagens.map((item) => (
            <div className="externMsg">{item.text}</div>
          ))}

          {chat.map((item) => (
            <div className="myMsg">{item.mensage}</div>
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
