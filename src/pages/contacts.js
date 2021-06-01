import React from "react";
import ReactDOM, { useHistory } from "react-router-dom";
function Contacts() {
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
            <li>contato</li>
            <hr></hr>
            <li>contato</li>
            <hr></hr>
            <li>contato</li>
            <hr></hr>
            <li>contato</li>
            <hr></hr>
            <li>contato</li>
            <hr></hr>
            <li>contato</li>
            <hr></hr>
            <li>contato</li>
          </lu>
        </div>
        <hr></hr>
      </div>
    </div>
  );
}
export default Contacts;
