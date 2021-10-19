import React from "react";
import styled from "styled-components";
import * as firebase from "../../utils/firebase";
import { useState, useEffect } from "react";

const TempCtn = styled.div`
  margin: 0 auto;
  padding: 10px;
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.subscribeToUser((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log("iiiiii");
        console.log(currentUser);
      } else {
        // User is signed out
        setUser(null);
        console.log("nooooo");
      }
    });
  }, []);

  const handleOnLogin = (provider) => {
    firebase.socialMediaAuth(provider);
  };

  return (
    <TempCtn>
      <h1>home</h1>
      <h1>現在登入狀態為：{user ? `${user.email}` : `login${user}`}</h1>
      <hr />
      <input
        placeholder="請輸入信箱"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      <input
        placeholder="請輸入密碼"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={() => firebase.register(email, password)}>註冊</button>
      <hr />
      <input
        placeholder="請輸入信箱"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      <input
        placeholder="請輸入密碼"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={() => firebase.logIn(email, password)}>登入</button>
      <hr />
      <button onClick={() => handleOnLogin(firebase.facebookProvider)}>
        facebook
      </button>
      <button onClick={() => handleOnLogin(firebase.googleProvider)}>
        google
      </button>
      <button onClick={() => firebase.logOut()}>logOut</button>
    </TempCtn>
  );
};

export default HomePage;
