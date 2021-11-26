import styled from "styled-components";

const ContainerStyled = styled.div`
  max-width: 1560px;
  width: 80%;
  display: flex;
  padding-bottom: 2rem;
  margin: 0 auto;
  margin-top: 3rem;
  gap: 1rem;
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

const InputCtn = styled.input`
  padding: 10px;
  font-size: 1.2rem;
  margin: 1rem 0;
  border: 1px solid #b5b2b0;
  border-radius: 4px;
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
  }
`;

const SettingWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
  padding: 10px;
  gap: 10px;
  border: 1px solid #b5b2b0;
  border-radius: 4px;
`;

const EditorArea = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const LabelCtn = styled.label`
  font-size: 1.1rem;
  font-weight: 550;
  margin-right: 10px;
`;

const SideLabel = styled.label`
  font-size: 1.1rem;
  font-weight: 550;
  text-align: center;
  margin-bottom: 10px;
`;

const UploadBtn = styled.label`
  background-color: transparent;
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

const Introduce = styled.textarea`
  border: none;
  background-color: #fff;
  padding: 10px;
`;

const PreViewCtn = styled.img`
  width: 100%;
  margin: 10px 0;
  cursor: pointer;
  @media only screen and (max-width: 992px) {
    width: 60%;
  }
  @media only screen and (max-width: 500px) {
    width: 100%;
  }
`;

export {
  ContainerStyled,
  MainContainer,
  InputCtn,
  SideSetting,
  SettingWrapper,
  EditorArea,
  LabelCtn,
  SideLabel,
  UploadBtn,
  SubmitBtn,
  Introduce,
  PreViewCtn,
};
