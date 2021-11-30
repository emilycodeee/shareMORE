import styled from "styled-components";
import { FaRegThumbsUp, FaThumbsUp, FaRegCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const iconStyle = {
  width: "1.3rem",
  height: "1.3rem",
  color: "#f27e59",
};

const ThumbsUpFilled = styled(FaThumbsUp)`
  ${iconStyle}
`;

const ThumbsUp = styled(FaRegThumbsUp)`
  ${iconStyle}
`;

const Comment = styled(FaRegCommentAlt)`
  ${iconStyle}
`;

const OuterWrapper = styled.div`
  max-width: 100%;
  background-color: rgba(255, 244, 228, 0.5);
  margin-top: 10px;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0.8rem 0.8rem 0.3rem 0.8rem;
  position: relative;
  border-bottom: 1px solid #fffdfd;
`;
const PostArea = styled.textarea`
  margin-top: 0.5rem;
  font-size: 1rem;
  padding: 1rem 1.5rem;
  margin: 0.8rem 1rem;
  border-radius: 4px;
  background-color: gray;
  box-shadow: 0px 1px 5px -3px rgb(132 131 126 / 20%);
  background-color: #fffdfd;
  border: none;
  outline: none;
  color: black;
`;

const AvatarCtn = styled.img`
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  margin-right: 10px;
`;

const UserWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const UserDetail = styled.div`
  height: 30px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Pstyled = styled.div`
  color: black;
  font-size: 14px;
  font-weight: 550;
`;

const DateStyled = styled.div`
  color: rgba(117, 117, 117);
  font-size: 14px;
`;

const IconWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  margin-top: 10px;
`;

const HeadIcon = styled.img`
  cursor: pointer;
  height: 15px;
  margin-right: 5px;
`;

const IconDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 5px;
  &:hover {
    background-color: #fffdfd;
  }
`;

const CountWrapper = styled.div`
  display: flex;
  position: relative;
`;

const DropDown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;

  top: 2.5rem;
  right: 0;
  z-index: 99;
`;

const MoreBtn = styled.div`
  cursor: pointer;
  width: 6rem;
  text-align: center;
  background-color: #fff4e4;
  font-weight: 500;
  padding: 0.5rem 0.2rem;
  box-shadow: 0px 2px 7px -3px rgb(132 131 126 / 20%);
  &:hover {
    font-weight: 600;
  }
`;

const Count = styled.div`
  position: absolute;
  color: #f27e59;
  font-weight: 500;
  top: -5px;
  right: -10px;
  font-size: 12px;
`;

const CommentCtn = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonSet = styled.div`
  display: flex;
  justify-content: end;
`;

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
`;

const ButtonStyled = styled.button`
  cursor: pointer;
  width: 60px;
  height: 30px;
  background-color: transparent;
  font-weight: 600;
  outline: none;
  border: 1px solid #f27e59;
  border-radius: 3px;
  color: #f27e59;
  font-size: 10px;
  margin: 0.5rem;
  &:hover {
    background-color: #f27e59;
    color: white;
  }
`;

const ContentArea = styled.div`
  width: 100%;
  line-height: 1.4rem;
  padding: 0.5rem 0.5rem;
  word-break: break-all;
  white-space: pre-wrap;
`;

const EditContentArea = styled.textarea`
  width: 100%;
  margin-left: 1rem;
  border-radius: 4px;
  background-color: #fffdfd;
  border: none;
  outline: none;
  padding: 0.5rem 0.5rem;
  height: auto;
`;

const EditAreaWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditSubmitBtn = styled.button`
  cursor: pointer;
  width: 60px;
  height: 30px;
  background-color: transparent;
  font-weight: 600;

  outline: none;
  border: 1px solid #f27e59;
  border-radius: 3px;
  color: #f27e59;
  font-size: 10px;
  margin-left: 0.5rem;
  &:hover {
    background-color: #f27e59;
    color: white;
  }
`;

export {
  ThumbsUpFilled,
  ThumbsUp,
  Comment,
  OuterWrapper,
  Wrapper,
  PostArea,
  AvatarCtn,
  UserWrapper,
  UserDetail,
  Pstyled,
  DateStyled,
  IconWrapper,
  HeadIcon,
  IconDiv,
  CountWrapper,
  DropDown,
  MoreBtn,
  Count,
  CommentCtn,
  ButtonSet,
  LinkStyle,
  ButtonStyled,
  ContentArea,
  EditContentArea,
  EditAreaWrapper,
  EditSubmitBtn,
};
