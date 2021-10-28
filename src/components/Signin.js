import React from "react";
import * as firebase from "../utils/firebase";
import { useState } from "react";
import facebookIcon from "../sources/facebook.png";
import googleIcon from "../sources/google.png";
import { BlockLoading } from "react-loadingg";
import {
  EmbedSignIn,
  AuthButton,
  SocialIconCtn,
  InputStyled,
  Horizontal,
  Ptag,
  ShowSignUp,
  ErrorMsg,
} from "./Signin.styled";

const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [message, setMessage] = useState("");

  const handleOnLogin = (provider) => {
    setMessage("");
    firebase.socialMediaAuth(provider, setMessage);
  };
  // console.log("😍😍", message);
  return (
    <EmbedSignIn>
      {!showSignUp && (
        <>
          {isLoading && <BlockLoading />}
          {/* {} */}
          <AuthButton
            onClick={() => {
              handleOnLogin(firebase.googleProvider);
            }}
          >
            <SocialIconCtn src={googleIcon} />
            Continue with Google
          </AuthButton>
          <AuthButton
            onClick={() => {
              handleOnLogin(firebase.facebookProvider);
            }}
          >
            <SocialIconCtn src={facebookIcon} />
            Continue with Facebook
          </AuthButton>

          <InputStyled
            placeholder="請輸入信箱"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <InputStyled
            placeholder="請輸入密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <AuthButton
            onClick={() => {
              setMessage("");
              setIsLoading(true);
              firebase.logIn(email, password, setMessage);
              // message && alert(message);
            }}
          >
            登入
          </AuthButton>

          {message && <ErrorMsg>{message}</ErrorMsg>}

          <Horizontal>
            <Ptag>or</Ptag>
          </Horizontal>
          <ShowSignUp
            onClick={() => {
              setShowSignUp(!showSignUp);
            }}
          >
            使用Email進行註冊
          </ShowSignUp>
        </>
      )}
      {showSignUp && (
        <>
          {isLoading && <BlockLoading />}
          <InputStyled
            placeholder="請輸入使用者名稱"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <InputStyled
            placeholder="請輸入信箱"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <InputStyled
            placeholder="請輸入密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <AuthButton
            onClick={() => {
              setMessage("");
              setIsLoading(true);
              firebase.register(name, email, password, setMessage);
              // message && alert(message);
            }}
          >
            註冊
          </AuthButton>
          <ShowSignUp
            onClick={() => {
              setShowSignUp(!showSignUp);
            }}
          >
            {message && <ErrorMsg>{message}</ErrorMsg>}
            <Horizontal>
              <Ptag>or</Ptag>
            </Horizontal>
            透過Google/Facebook快速登入
          </ShowSignUp>
        </>
      )}
    </EmbedSignIn>
  );
};

export default Signin;
