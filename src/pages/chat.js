import React from "react";
import ReactDOM, { useHistory } from "react-router-dom";
function Chat() {
  let history = useHistory();
  const redirectList = () => {
    history.push(`/`);
  };

  return (
    <div className="chatMain">
      <div className="Nav">
        <button onClick={() => redirectList()}>return</button>
        <h1>login("numero do celular")</h1>
      </div>
      <hr></hr>
      <div className="chatPlace">
        <p>(CS)vamos trocar menmsagem</p>
        <p>(LO) estamos convesando </p>
      </div>
      <hr></hr>
      <div className="textPlace">
        <p>Digitando texto</p>
        <button>enviar Mensagem</button>
      </div>
    </div>
  );
}
export default Chat;
