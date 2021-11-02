import React from "react";
import * as firebase from "../utils/firebase";
import { useState } from "react";
import facebookIcon from "../sources/facebook.png";
import googleIcon from "../sources/google.png";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  padding: 0px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-right: 120px;
  width: 668px;
  outline: none;
`;

const AuthCtn = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: rgb(255, 255, 255);
  padding: 50px;
`;

const Sider = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: rgb(255 234 182);
  /* width: 284px; */
  padding: 10px;
`;

export const AuthButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  border: 1px;
  height: 40px;
  font-size: 14.98px;
  font-family: "GT Walsheim Pro", Arial, sans-serif;
  font-weight: 700;
  border-color: #394649;
  border-style: solid;
  border-radius: 4px;
  letter-spacing: 0.2px;
  background-color: #fff;
  margin-bottom: 10px;
  &:hover {
    background-color: rgba(0, 35, 51, 0.04);
  }
`;

export const SocialIconCtn = styled.img`
  height: 20px;
  margin-right: 10px;
`;

export const InputStyled = styled.input`
  margin-bottom: 10px;
  height: 38px;
  padding: 0px 14px;
  border-radius: 4px;
  border: #dcdee1 1px solid;
  width: auto;
  /* height: 40px; */
`;

export const Horizontal = styled.div`
  height: 1px;
  margin: 14px 0px;
  border-color: #002333;
  border-style: solid;

  border-top-width: 1px;
`;

export const Ptag = styled.p`
  font-family: "GT Walsheim Pro", Arial, sans-serif;
  background: rgb(255, 255, 255);
  color: rgb(0, 35, 51);
  display: block;
  margin: -7px auto;
  text-align: center;
  width: 30px;
  font-size: 13px;
  font-weight: bold;
`;

export const ShowSignUp = styled.button`
  color: #3722d3;
  font-size: 18px;
  background: none;
  font-family: "GT Walsheim Pro", Arial, sans-serif;
  font-weight: 700;
  border-style: none;
  margin-bottom: 16px;
  cursor: pointer;
`;

export const ErrorMsg = styled.p`
  text-align: center;
  color: red;
  font-size: 1rem;
  font-weight: 600;
`;

const SigninPopup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [message, setMessage] = useState("");

  const handleOnLogin = (provider) => {
    setMessage("");
    firebase.socialMediaAuth(provider, setMessage);
  };

  return (
    <Container>
      <Sider>
        <h2>一起 走得更遠</h2>
        <h4>Sign in to continue to your account.</h4>
      </Sider>
      <AuthCtn>
        {!showMore && (
          <>
            <AuthButton onClick={() => handleOnLogin(firebase.googleProvider)}>
              <SocialIconCtn src={googleIcon} />
              Continue with Google
            </AuthButton>
            <AuthButton
              onClick={() => handleOnLogin(firebase.facebookProvider)}
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
                firebase.logIn(email, password, setMessage);
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
                setShowMore(!showMore);
              }}
            >
              使用Email進行註冊
            </ShowSignUp>
          </>
        )}
        {showMore && (
          <>
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
                firebase.register(name, email, password, setMessage);
              }}
            >
              註冊
            </AuthButton>
            {message && <ErrorMsg>{message}</ErrorMsg>}
            <Horizontal>
              <Ptag>or</Ptag>
            </Horizontal>
            <ShowSignUp
              onClick={() => {
                setShowMore(!showMore);
              }}
            >
              透過Google/Facebook快速登入
            </ShowSignUp>
          </>
        )}
      </AuthCtn>
    </Container>
  );
};

export default SigninPopup;
