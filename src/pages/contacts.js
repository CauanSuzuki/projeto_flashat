import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";
import "react-chat-elements/dist/main.css";
import { ChatItem } from "react-chat-elements";
import {} from "./style.css";
import axios from "axios";
import { useAllocate } from "../context/allocate";

function Contacts({ children }) {
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

  const reserch = (contato) => {
    setAtualizacao(data.filter((value) => value.name.includes(pesquisa)));
  };

  useEffect(() => {
    async function showContact() {
      axios
        .get(`http://localhost:3312/contacts/mycontacts`, {
          headers: {
            Authorization: `token ${token.token}`,
          },
        })
        .then(function(result) {
          setData(result.data);
          setTimeout(() => {
            showContact();
          }, 30000);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    showContact();
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
        console.log("resposta create chat", resposta);
        setdadosOtherUser(resposta.data);
        history.push(`/chat/${resposta.data.chat.id}`);
      });
  }

  const {
    data,
    token,
    setData,
    atualizacao,
    setAtualizacao,
    pesquisa,
    setPesquisa,
    setdadosOtherUser,
    setChat,
    lastMessage,
    setLastMessage,
  } = useAllocate();

  return (
    <div className="listMain">
      <div className="head">
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

        <Button href="#text-buttons" color="primary" onClick={() => reserch()}>
          Search
        </Button>
        <TextField
          id="standard-basic"
          onChange={(event) => setPesquisa(event.target.value)}
        />
      </div>

      <div className="c">
        <dl>
          <label>
            {atualizacao.length === 0
              ? data.map((item) => (
                  <ChatItem
                    key={item.id}
                    avatar={
                      "https://static.clubedaanamariabraga.com.br/wp-content/uploads/2021/04/frango-assado-em-pe.jpg"
                    }
                    alt={"Reactjs"}
                    title={item.name}
                    date={new Date()}
                    unread={0}
                    onClick={() => createChat(item.id)}
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
          </label>
        </dl>
      </div>
    </div>
  );
}
export default Contacts;
