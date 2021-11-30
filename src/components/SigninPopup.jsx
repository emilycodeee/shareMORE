import React from "react";
import {
  socialMediaAuth,
  register,
  logIn,
  googleProvider,
  facebookProvider,
} from "../utils/firebase";
import { useState } from "react";
import facebookIcon from "../sources/facebook.png";
import googleIcon from "../sources/google.png";
import { TouchBallLoading } from "react-loadingg";
import growing from "../sources/growing.gif";

import {
  Container,
  FormStyle,
  AuthCtn,
  Sider,
  AuthButton,
  SocialIconCtn,
  InputStyled,
  ShowSignUp,
  ErrorMsg,
  Slogan,
  Tree,
} from "./style/SigninPopup.style";

const SigninPopup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [message, setMessage] = useState("");

  const handleOnLogin = (provider) => {
    setMessage("");
    socialMediaAuth(provider, setMessage);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    register(name, email, password, setMessage).then(() => {
      setIsLoading(false);
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    logIn(email, password, setMessage).then(() => {
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
            <AuthButton onClick={() => handleOnLogin(googleProvider)}>
              <SocialIconCtn src={googleIcon} />
              Continue with Google
            </AuthButton>
            <AuthButton onClick={() => handleOnLogin(facebookProvider)}>
              <SocialIconCtn src={facebookIcon} />
              Continue with Facebook
            </AuthButton>
            <FormStyle>
              <InputStyled
                placeholder="請輸入信箱"
                autoComplete="on"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <InputStyled
                type="password"
                placeholder="請輸入密碼"
                autoComplete="on"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <AuthButton onClick={(e) => handleLogin(e)}>登入</AuthButton>
              {message && <ErrorMsg>{message}</ErrorMsg>}
            </FormStyle>
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
            <FormStyle>
              <InputStyled
                placeholder="請輸入使用者名稱"
                value={name}
                autoComplete="on"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <InputStyled
                placeholder="請輸入信箱"
                value={email}
                autoComplete="on"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <InputStyled
                type="password"
                placeholder="請輸入密碼"
                autoComplete="on"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <AuthButton
                onClick={(e) => {
                  handleRegister(e);
                }}
              >
                註冊
              </AuthButton>
              {message && <ErrorMsg>{message}</ErrorMsg>}
            </FormStyle>

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
