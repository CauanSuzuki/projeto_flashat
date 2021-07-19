import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";
import "react-chat-elements/dist/main.css";
import { ChatItem } from "react-chat-elements";
import {} from "./style.css";
import { useAllocate } from "../context/allocate";
import axios from "axios";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { io } from "socket.io-client";

function List() {
  let history = useHistory();

  const redirectContacts = () => {
    history.push(`/contacts`);
  };
  const redirectAccount = () => {
    history.push(`/account`);
  };
  const redirectList = () => {
    history.push(`/list`);
  };

  const {
    data,
    token,
    listaConversas,
    setListaConversas,
    setdadosOtherUser,
    chat,
    lastMessage,
    setChat,
  } = useAllocate();

  const [atualizacao, setAtualizacao] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const reserch = (contato) => {
    setAtualizacao(data.filter((value) => value.name.includes(pesquisa)));
  };

  const [read, setRead] = useState([]);

  useEffect(() => {
    async function showChats() {
      await axios
        .get(`http://localhost:3312/chat/showchats`, {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        })
        .then(function(result) {
          setListaConversas(result.data);
          setTimeout(() => {
            showChats();
          }, 30000);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    showChats();
  }, []);

  async function createChat(value) {
    await axios
      .post(
        "http://localhost:3312/chat/createchat",
        { userId: value },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      )
      .then((resposta) => {
        console.log("resposta contatos -->", resposta);
        setdadosOtherUser(resposta.data);
        history.push(`/chat/${resposta.data.chat.id}`);
      });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  console.log("listaConversas list-->", listaConversas);
  return (
    <div className="listMain">
      <nav>
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="text primary button group"
        >
          <Button onClick={() => redirectList()}>conversas</Button>
          <Button onClick={() => redirectContacts()}>contatos</Button>
          <Button onClick={() => redirectAccount()}>conta</Button>
        </ButtonGroup>
      </nav>
      <div>
        <Button href="#text-buttons" color="primary" onClick={() => reserch()}>
          Search
        </Button>
        <TextField
          id="standard-basic"
          onChange={(event) => setPesquisa(event.target.value)}
        />
        <div>
          <dl>
            <label>
              <div>
                {atualizacao.length === 0
                  ? listaConversas.map((item) => (
                      <ChatItem
                        key={item.id}
                        avatar={
                          "data:image/jpeg;base64,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"
                        }
                        alt={"Reactjs"}
                        title={item.otherUser.nome}
                        subtitle={item.lastMessage}
                        date={new Date()}
                        unread={0}
                        onClick={() => createChat(item.otherUser.userId)}
                      />
                    ))
                  : atualizacao.map((item) => (
                      <ChatItem
                        key={item.id}
                        avatar={
                          "https://static.clubedaanamariabraga.com.br/wp-content/uploads/2021/04/frango-assado-em-pe.jpg"
                        }
                        alt={"Reactjs"}
                        title={item.name}
                        subtitle={item.lastMensage}
                        date={new Date()}
                        unread={0}
                        onClick={() => createChat(item.id)}
                      />
                    ))}
              </div>
            </label>
          </dl>
        </div>
      </div>
    </div>
  );
}
export default List;
