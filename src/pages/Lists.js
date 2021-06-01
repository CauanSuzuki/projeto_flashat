import React from "react";
import ReactDOM, { useHistory } from "react-router-dom";

function List() {
  let history = useHistory();
  const redirectContacts = () => {
    history.push(`/contacts`);
  };
  const redirectAccount = () => {
    history.push(`/account`);
  };
  const redirectList = () => {
    history.push(`/`);
  };
  const redirectChat = () => {
    history.push(`/chat`);
  };



  return (
    <div className="listMain">
      <nav>
        <button onClick={() => redirectList()}>conversas</button>
        <button onClick={() => redirectContacts()}>contatos</button>
        <button onClick={() => redirectAccount()}>conta</button>
      </nav>
      <div>
        <button>Search</button>
        <input></input>
        <div>
          <lu>
            <li><button onClick={() => redirectChat()}>conversa</button></li>
            <hr></hr>
            <li>conversa</li>
            <hr></hr>
            <li>conversa</li>
            <hr></hr>
            <li>conversa</li>
            <hr></hr>
            <li>conversa</li>
            <hr></hr>
            <li>conversa</li>
            <hr></hr>
            <li>conversa</li>
          </lu>
        </div>
        <hr></hr>
      </div>
    </div>
  );
}
export default List;
