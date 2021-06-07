import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {} from "./style.css";
import { useFormik } from "formik";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

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
        {chat.map((item) => (
          <div>{item.mensage}</div>
        ))}{" "}
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
