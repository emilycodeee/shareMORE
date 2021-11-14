import React from "react";
import * as firebase from "../utils/firebase";
import { useState } from "react";
import facebookIcon from "../sources/facebook.png";
import googleIcon from "../sources/google.png";
import styled from "styled-components";
import { TouchBallLoading } from "react-loadingg";
import greenhouse from "../sources/greenhouse.gif";
import growing from "../sources/growing.gif";

const Container = styled.div`
  max-width: 800px;
  width: 70%;
  display: flex;
  justify-content: center;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-right: 120px;
  outline: none;
  z-index: 99;
  border-radius: 10px;
  min-height: 150px;
  @media only screen and (max-width: 992px) {
    width: 80%;
    flex-direction: column;
    /* border-radius: 0; */
  }
`;

const AuthCtn = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  border: #dcdee1 1px solid;
  align-items: center;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: rgb(255, 255, 255);
  padding: 50px;
  width: auto;
  @media only screen and (max-width: 992px) {
    width: 100%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top: 4px solid #f27e59;
    padding: 20px;
    /* border-bottom-left-radius: 0;
    border-bottom-right-radius: 0; */
    /* display: none; */
  }
`;

const Sider = styled.div`
  padding: 0 1rem;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: #f27e59;
  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

const AuthButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  border: #dcdee1 1px solid;
  height: 40px;
  font-weight: 700;

  border-radius: 4px;
  padding: 1rem;
  background-color: #fff;
  margin-bottom: 10px;
  &:hover {
    background-color: rgba(0, 35, 51, 0.04);
  }
`;

const SocialIconCtn = styled.img`
  height: 20px;
  margin-right: 10px;
`;

const InputStyled = styled.input`
  margin-bottom: 10px;
  height: 38px;
  padding: 0px 14px;
  border-radius: 4px;
  border: #dcdee1 1px solid;
  width: 100%;
  box-shadow: inset 0 2px 4px 0 hsla(0, 0%, 0%, 0.08);
`;

const ShowSignUp = styled.button`
  color: #f27e59;
  font-size: 18px;
  background: none;
  margin-top: 2rem;
  font-weight: 700;
  border-style: none;
  cursor: pointer;
`;

const ErrorMsg = styled.p`
  text-align: center;
  color: red;
  font-size: 1rem;
  font-weight: 600;
`;

const Slogan = styled.h2`
  margin: 0;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const Tree = styled.img`
  width: 4rem;
  height: 4rem;
`;

const SigninPopup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [message, setMessage] = useState("");

  const handleOnLogin = (provider) => {
    setMessage("");
    firebase.socialMediaAuth(provider, setMessage);
  };

  const handleRegister = () => {
    setIsLoading(true);
    setMessage("");
    firebase.register(name, email, password, setMessage).then(() => {
      setIsLoading(false);
    });
  };

  const handleLogin = () => {
    setIsLoading(true);
    setMessage("");
    firebase.logIn(email, password, setMessage).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <Container>
      <Sider>
        <Slogan>一起 走得更遠</Slogan>
        <Slogan>
          TOGETHER <br />
          WE ARE STRONGER.
        </Slogan>
      </Sider>
      <AuthCtn>
        {!showMore && (
          <>
            <Tree src={growing} />
            {isLoading && <TouchBallLoading />}
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
            <AuthButton onClick={handleLogin}>登入</AuthButton>
            {message && <ErrorMsg>{message}</ErrorMsg>}

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
            <Tree src={growing} />
            {isLoading && <TouchBallLoading />}
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
            <AuthButton onClick={handleRegister}>註冊</AuthButton>
            {message && <ErrorMsg>{message}</ErrorMsg>}

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
