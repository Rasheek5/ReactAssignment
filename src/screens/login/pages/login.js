import React, { useState } from "react";

//components
import { ButtonComp as Button } from "../../../components";

//constants
import {
  EMPTY_ERROR,
  PASSWORD_INVALID,
  USERNAME_INVALID,
  PASSWORD_PATTERN,
  USERNAME_PATTERN,
  USERNAME_PASSEORD_NOT_SAME,
  DASHBOARD_ROUTE,
} from "../../../constants";

//styles
import "../styles/login.styles.css";

// npm
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [errorMsg, seterrorMsg] = useState("");

  const navigation = useNavigate();

  const handlesubmit = () => {
    if (!username.trim().length || !password.trim().length) {
      return seterrorMsg(EMPTY_ERROR);
    }

    if (!USERNAME_PATTERN.test(username)) {
      return seterrorMsg(USERNAME_INVALID);
    }
    if (!PASSWORD_PATTERN.test(password)) {
      return seterrorMsg(PASSWORD_INVALID);
    }
    if (username.toLowerCase() === password.toLowerCase()) {
      return seterrorMsg(USERNAME_PASSEORD_NOT_SAME);
    }
    navigation(DASHBOARD_ROUTE);
  };

  return (
    <div className="homecontainer">
      <div className="loginbox">
        <h2>Login</h2>
        <div>
          <TextField
            id="outlined-basic"
            label="enter your username*"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="standard-basic"
            label=" enter password*"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {errorMsg && <p className="errormessage">{errorMsg}</p>}

        <Button title={"Submit"} onClick={() => handlesubmit()} />
      </div>
    </div>
  );
};
