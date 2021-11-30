import styled from "styled-components";

const MainContainer = styled.div`
  max-width: 1560px;
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 3rem;
  gap: 1rem;
`;

const LabelCtn = styled.label`
  font-size: 1.1rem;
  font-weight: 550;
  @media only screen and (max-width: 600px) {
    font-size: 0.8rem;
    margin-right: 0;
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  @media only screen and (max-width: 600px) {
    flex-wrap: wrap;
  }
`;

const Field = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: end;
  width: 100%;
  @media only screen and (max-width: 500px) {
    gap: 0.8rem;
  }
`;

const InputCtn = styled.input`
  flex-grow: 1;
  border-radius: 4px;
  padding: 3px 10px;
  font-size: 1.2rem;
  border: 1px solid #b5b2b0;
`;

const TextareaCtn = styled.textarea`
  flex-grow: 1;
  border-radius: 4px;
  border: 1px solid #b5b2b0;
  padding: 10px;
`;

const EditArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Slogan = styled.div`
  align-self: center;
  font-weight: 550;
  font-size: 2rem;
  margin-bottom: 3rem;
  @media only screen and (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const UploadBtn = styled.label`
  background-color: transparent;
  margin: 0 auto;
`;

const ImgField = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
  padding: 10px;
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
  width: 100%;
  &:hover {
    background-color: #f27e59;
    color: white;
  }
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
  ImgField,
  MainContainer,
  LabelCtn,
  LabelWrapper,
  Field,
  InputCtn,
  TextareaCtn,
  EditArea,
  Slogan,
  UploadBtn,
  SubmitBtn,
  PreViewCtn,
};
