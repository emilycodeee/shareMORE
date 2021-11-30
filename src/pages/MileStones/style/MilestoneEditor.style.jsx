import styled from "styled-components";

const ContainerStyled = styled.div`
  gap: 1rem;
  max-width: 1560px;
  width: 80%;
  display: flex;
  margin: 0 auto;
  margin-top: 3rem;
  padding-bottom: 2rem;
  @media only screen and (max-width: 992px) {
    flex-direction: column;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  @media only screen and (max-width: 992px) {
    width: 100%;
  }
`;

const SideSetting = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  @media only screen and (max-width: 992px) {
    margin: 0;
    width: 100%;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

const LabelCtn = styled.label`
  font-size: 1.1rem;
  font-weight: 550;
  margin-right: 10px;
`;

const InputCtn = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1.2rem;
  margin: 1rem 0;
  border: 1px solid #b5b2b0;
  border-radius: 4px;
`;

const UploadBtn = styled.label`
  background-color: transparent;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const SubmitBtn = styled.button`
  border-radius: 4px;
  list-style: none;
  font-weight: 600;
  font-size: 1rem;
  height: auto;
  text-decoration: none;
  color: #f27e59;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin: 0 auto;
  margin-bottom: 2rem;
  border: none;
  padding: 0.6rem;
  cursor: pointer;
  border: 1px solid #f27e59;
  background-color: transparent;
  &:hover {
    background-color: #f27e59;
    color: white;
  }
  @media only screen and (max-width: 992px) {
    margin: 0;
    width: 100%;
    align-items: flex-end;
  }
`;

const SwitchCtn = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  div {
    font-weight: 550;
  }
`;

const SettingLb = styled.label`
  align-self: center;
  font-size: 1.1rem;
  font-weight: 550;
  margin-bottom: 10px;
  @media only screen and (max-width: 992px) {
    align-self: flex-start;
  }
`;

const PreViewCtn = styled.img`
  cursor: pointer;
  width: 100%;
  margin: 10px 0;
  @media only screen and (max-width: 992px) {
    width: 60%;
  }
  @media only screen and (max-width: 500px) {
    width: 100%;
  }
`;

const EditorArea = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const SettingWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #b5b2b0;
  border-radius: 4px;
  gap: 10px;
`;

const Introduce = styled.textarea`
  border: none;
  background-color: #fff;
  padding: 10px;
`;

const OriginLabel = styled.label`
  font-weight: 550;
  text-align: center;
  color: rgb(255 182 0);
`;

export {
  ContainerStyled,
  MainContainer,
  SideSetting,
  LabelCtn,
  InputCtn,
  UploadBtn,
  SubmitBtn,
  SwitchCtn,
  SettingLb,
  PreViewCtn,
  EditorArea,
  SettingWrapper,
  Introduce,
  OriginLabel,
};
