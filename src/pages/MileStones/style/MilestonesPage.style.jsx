import styled from "styled-components";
import { GiBookmarklet } from "react-icons/gi";
import { BiSearchAlt2 } from "react-icons/bi";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const MainCtn = styled.div`
  max-width: 1560px;
  width: 80%;
  padding: 1rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const ContentShield = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  position: fixed;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Wrapper = styled.div`
  display: grid;
  width: 90%;
  padding: 1em;
  align-items: flex-start;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 1.2rem;
  grid-row-gap: 2rem;
  margin: 0 auto;

  @media only screen and (max-width: 992px) {
    width: 80%;
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media only screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const SlideShow = styled.div`
  width: 60%;
  margin: 0 auto;
  @media only screen and (max-width: 992px) {
    width: 80%;
  }
`;

const LastBlock = styled.div`
  width: 30%;
  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

const TopSection = styled.section`
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;
`;

const LastLabel = styled.label`
  font-size: 1.5rem;
  font-style: italic;
`;

const BookLabel = styled.label`
  font-size: 1.2rem;
  font-weight: 550;
`;

const Div1 = styled.div`
  margin-bottom: 1rem;
`;

const ArticleCtn = styled.div`
  margin-top: 10px;
`;

const ArticleList = styled.div`
  margin: 0 0.5rem 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const LinkStyle = styled(Link)`
  width: 100%;
  text-decoration: none;
  color: rgb(17 17 17);
  display: flex;
  padding: 0.5rem 0;

  border-bottom: 1px solid #3e2914;
`;

const TitleStyle = styled.h4`
  margin: 3px 0;
  font-weight: 600;
`;

const PStyle = styled.p`
  margin: 3px 0;
  font-size: 12px;
  font-weight: 550;
  color: rgb(111 104 102);
`;

const Number = styled.label`
  font-size: 1.2rem;
  font-style: italic;
  margin-right: 1rem;
`;

const Author = styled.div`
  font-size: 8px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Ptag = styled.div`
  font-weight: 550;
  color: rgb(111 104 102);
`;

const BookImg = styled.img`
  background-position: center center;
  background-size: cover;
  box-shadow: rgb(0 0 0 / 16%) 0px 5px 11px 0px;
  height: 200px;
  width: auto;
  @media only screen and (max-width: 800px) {
    height: 150px;
    width: auto;
  }
  @media only screen and (max-width: 600px) {
    height: 100px;
    width: auto;
  }
`;

const StyledSlider = styled(Slider)`
  .slick-list {
    padding: 0 !important;
  }
  .slick-prev:before,
  .slick-next:before {
    color: black;
  }
`;

const MoreLink = styled(Link)`
  text-decoration: none;
  font-weight: 700;
`;

const Empty = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 0 10px;
  div {
    margin-top: 1rem;
    font-weight: 600;
    color: rgb(242, 126, 89);
  }
  @media only screen and (max-width: 500px) {
    font-size: 0.8rem;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #f27e59;
  margin: 2rem 10%;
  width: 80%;
`;

const SearchIcon = styled(BiSearchAlt2)`
  width: 2rem;
  height: 2rem;
`;

const Container = styled.div`
  border: 2px solid #f27e59;
  display: flex;
  justify-content: flex-end;
  border-radius: 100px;
  overflow: hidden;
  font-size: 1.25em;
  position: relative;
  width: 60px;
  height: 60px;
  transition: width 450ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
  padding: 3px;

  &:focus-within {
    width: 100%;

    input {
      opacity: 1;
      z-index: initial;
      cursor: initial;
      width: calc(100% - 60px);
    }

    button {
      background: #f27e59;
      color: white;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
      &:hover,
      &:focus {
        outline: 0;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.65);
      }
    }
  }
`;

const SubmitBtn = styled.button`
  font-size: 1.5rem;
  margin-left: auto;
  background: 0;
  border: 0;
  cursor: pointer;
  border-radius: 50%;
  transition: background 200ms ease-out;
  width: calc(60px - 10px);
  height: calc(60px - 10px);
  color: black;
`;

const SearchBarInput = styled.input`
  border: 0;
  padding: 0.25em 1em;
  flex-grow: 1;
  outline: 0;
  z-index: 2;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background: transparent;
  opacity: 0;
  cursor: pointer;
`;

const GroupLink = styled(Link)`
  text-decoration: none;
`;

const SelectedBook = styled.div`
  margin: 0 1vmin;
`;

const BookBrief = styled.div`
  margin: 10px 0;
  gap: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BookImgWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
`;

const Label = styled.div`
  font-size: 1.2rem;
  font-weight: 550;
  margin: 10px 0 5px 0;
`;

const Bookmark = styled(GiBookmarklet)`
  margin-right: 0.8rem;
`;

const GoldenCtn = styled.div`
  width: 100%;
  background-color: #fffdfd;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 4px;
  line-height: 1.2rem;
  box-shadow: rgb(153 153 153 / 16%) 0px 5px 11px 0px;
`;

const SubTitle = styled.p`
  color: gray;
  font-size: 12px;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SubTitleLink = styled(SubTitle)`
  color: rgb(242 126 89);
  font-weight: 600;
  cursor: pointer;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export {
  MainCtn,
  ContentShield,
  Wrapper,
  SlideShow,
  LastBlock,
  TopSection,
  LastLabel,
  BookLabel,
  Div1,
  ArticleCtn,
  ArticleList,
  LinkStyle,
  TitleStyle,
  PStyle,
  Number,
  Author,
  Ptag,
  BookImg,
  StyledSlider,
  MoreLink,
  Empty,
  SearchWrapper,
  SearchIcon,
  Container,
  SubmitBtn,
  SearchBarInput,
  GroupLink,
  SelectedBook,
  BookBrief,
  BookImgWrapper,
  Label,
  Bookmark,
  GoldenCtn,
  SubTitle,
  SubTitleLink,
  Title,
};
