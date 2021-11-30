import React from "react";
import styled from "styled-components";

const Switch = ({ check, setCheck }) => {
  const handleCheck = (e) => {
    let checkToggle = e.target.checked;
    setCheck(checkToggle);
  };
  return (
    <SwitchContainer>
      <HideInput
        type="checkbox"
        checked={check}
        onChange={(e) => handleCheck(e)}
      />
      <Slider />
    </SwitchContainer>
  );
};

export default Switch;

const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 28px;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 28px;
  :before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    border-radius: 28px;
    transition: 0.4s;
  }
`;

const HideInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${Slider} {
    background-color: rgb(9 225 168);
    :before {
      transform: translateX(32px);
    }
  }
`;
