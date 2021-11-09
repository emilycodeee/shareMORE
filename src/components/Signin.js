import React from "react";
import styled from "styled-components";
import * as firebase from "../utils/firebase";
import { useState } from "react";
import facebookIcon from "../sources/facebook.png";
import googleIcon from "../sources/google.png";
import { TouchBallLoading } from "react-loadingg";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList } from "../redux/actions";

const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [message, setMessage] = useState("");
  const d = useDispatch();
  const handleOnLogin = (provider) => {
    setMessage("");
    firebase.socialMediaAuth(provider, setMessage).then(() => {
      firebase
        .getTotalDocList("users")
        .then((res) => d(getUsersList(res)))
        .catch((err) => console.log(err));
    });
  };

  const handleRegister = () => {
    setMessage("");
    setIsLoading(true);
    firebase.register(name, email, password, setMessage).then(() => {
      setIsLoading(false);
      firebase
        .getTotalDocList("users")
        .then((res) => d(getUsersList(res)))
        .catch((err) => console.log(err));
    });
  };

  const handleLogin = () => {
    setMessage("");
    setIsLoading(true);
    firebase.logIn(email, password, setMessage).then(() => {
      setIsLoading(false);
    });
    // message && alert(message);
  };

  return (
    <EmbedSignIn>
      {!showSignUp && (
        <>
          {isLoading && <TouchBallLoading />}
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
          <AuthButton onClick={handleLogin}>登入</AuthButton>

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

const EmbedSignIn = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 346px;
  left: 16px;
  top: 180px;
  z-index: 12;
  background-color: white;
  padding: 32px 24px;
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
  /* height: 40px; */
`;

const Horizontal = styled.div`
  height: 1px;
  margin: 14px 0px;
  border-color: #002333;
  border-style: solid;

  border-top-width: 1px;
`;

const Ptag = styled.p`
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

const ShowSignUp = styled.button`
  color: #3722d3;
  font-size: 18px;
  background: none;
  font-family: "GT Walsheim Pro", Arial, sans-serif;
  font-weight: 700;
  border-style: none;
  margin-bottom: 16px;
  cursor: pointer;
`;

const ErrorMsg = styled.p`
  text-align: center;
  color: red;
  font-size: 1rem;
  font-weight: 600;
`;
