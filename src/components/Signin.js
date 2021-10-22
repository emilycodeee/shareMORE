import React from "react";
import * as firebase from "../utils/firebase";
import { useState } from "react";
import facebookIcon from "../sources/facebook.png";
import googleIcon from "../sources/google.png";
import {
  EmbedSignIn,
  AuthButton,
  SocialIconCtn,
  InputStyled,
  Horizontal,
  Ptag,
  ShowSignUp,
} from "./Signin.styled";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showSignUp, setShowSignUp] = useState(false);

  const handleOnLogin = (provider) => {
    firebase.socialMediaAuth(provider);
  };
  return (
    <EmbedSignIn>
      <AuthButton onClick={() => handleOnLogin(firebase.googleProvider)}>
        <SocialIconCtn src={googleIcon} />
        Continue with Google
      </AuthButton>
      <AuthButton onClick={() => handleOnLogin(firebase.facebookProvider)}>
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
        onClick={() => firebase.logIn(email, password)}
        disabled={showSignUp && "disabled"}
      >
        登入
      </AuthButton>
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
      {showSignUp && (
        <>
          <InputStyled
            placeholder="請輸入使用者名稱"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
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
          <AuthButton onClick={() => firebase.register(email, password)}>
            註冊
          </AuthButton>
        </>
      )}
    </EmbedSignIn>
  );
};

export default Signin;
