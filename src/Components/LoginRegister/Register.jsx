import React, { useState } from "react";
import {  Button, Form, FormGroup, Label } from "reactstrap";
//import { Link } from "react-router-dom";


import APIURL from '../../Helpers/concert';


const RegisterComponent = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");

  //const nextURL = "localhost:3000";
  //const nextTitle = "Home";
  //const nextState = { additionalInformation: "Updated the URL with JS" };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      password.length < 5 ||
      password !== passwordConfirm ||
      username.length < 4
    ) {
      if (password.length < 5) {
        setPasswordMessage("password must be at least 5 characters long");
      } else {
        setPasswordMessage("");
      }

      if (password !== passwordConfirm) {
        setPasswordConfirmMessage("passwords must match");
      } else {
        setPasswordConfirmMessage("");
      }

      if (username.length < 4) {
        setUsernameMessage("username must be at least 4 characters long");
      } else {
        setUsernameMessage("");
      }

      return;
    }

    console.log("fetching...");
    let url = `${APIURL}/test/register`;
  

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        props.updateSessionToken(json.sessionToken);
        // window.location.href = "http://localhost:3000"; //! WOULD LIKE TO CHANGE
        // window.history.replaceState(nextState, nextTitle, nextURL); //! STILL NOT A WORKING SOLUTION
      });
  };

  return (
    <>
      <div className="form-background"></div>
      <Form className="auth-form-register" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <FormGroup>
          <Label htmlFor="username">Username</Label>

          {usernameMessage ? (
            <span className="reg-error">{usernameMessage}</span>
          ) : null}

          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password</Label>

          {passwordMessage ? (
            <span className="reg-error">{passwordMessage}</span>
          ) : null}

          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="passwordConfirm">Confirm Password</Label>

          {passwordConfirmMessage ? (
            <span className="reg-error">{passwordConfirmMessage}</span>
          ) : null}

          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </FormGroup>

        <Button type="submit">Register</Button>
      </Form>
    </>
  );
};

export default RegisterComponent;
