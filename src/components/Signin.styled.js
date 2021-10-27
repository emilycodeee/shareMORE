import React from "react";
import styled from "styled-components";

export const EmbedSignIn = styled.div`
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
