import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../Home/components/Card";
import * as firebase from "../../utils/firebase";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainCtn = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: grid;
  width: 90%;
  padding: 1em;
  align-items: flex-start;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 1.3em;
  grid-row-gap: 1.3em;
  margin: 0 auto;

  @media only screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ListStyle = styled.li`
  cursor: pointer;

  list-style: none;
  font-weight: 600;
  margin: 1rem 0;
  font-size: 1.2rem;
`;

const SubList = styled.li`
  display: ${(props) => (props.active === props.category ? "block" : "none")};

  list-style: none;
  font-weight: 500;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ContentCtn = styled.div`
  display: flex;
`;

// const Search = styled.input`
//   width: 70%;
//   border-radius: 25px;
//   box-shadow: none;
//   border: 1px solid rgb(204, 204, 204);
//   padding: 3px 0px 3px 50px;
//   font-size: 18px;
//   margin: 2rem 0;
// `;

const Slide = styled.div`
  width: 25%;
`;

const TopCtn = styled.div`
  display: flex;
  justify-content: center;
`;

const TopBtn = styled.div`
  /* flex-grow: 1; */
  align-self: center;
  text-align: center;
  width: 8%;
  padding: 1% 0;
  margin-left: 1rem;
  border-radius: 25px;
  background-color: #f5f5f5;
  box-shadow: rgb(0 0 0 / 10%) 0px 2px 6px;
  cursor: pointer;
`;

const SlideShow = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const ImgCtn = styled.img`
  width: 100%;
`;

const LastBlock = styled.div`
  width: 30%;
  margin-left: 1rem;
`;

const TopSection = styled.section`
  display: flex;
  align-items: flex-start;
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

const ListWrapper = styled.ul`
  margin: 3rem 0;
`;

const ListCtn = styled.li`
  /* background-color: red; */
  padding: 6px 6px;
  border-radius: 20px;
  border: 1px solid rgb(70 69 65);
  font-size: 1.2rem;
  padding-bottom: 5px;
  display: inline;
  text-align: center;
  margin-right: 10px;
  transition: 0.3s all;
  &:hover {
    border-bottom: 2px solid salmon;
    border-radius: 5px;
  }
`;

const ArticleList = styled.div`
  display: flex;
  flex-direction: column;
`;

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
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
  overflow: hidden;
  /* justify-content: end; */
  /* align-items: flex-end; */
`;

const Ptag = styled.p`
  margin-right: 10px;
  font-weight: 550;
  color: rgb(111 104 102);
  &:last-child {
    margin-left: 10px;
  }
`;

const Search = styled.input`
  width: 70%;
  height: 1.8rem;
  border-radius: 25px;
  box-shadow: none;
  border: 1px solid rgb(204, 204, 204);
  padding: 4px 0px 4px 50px;
  font-size: 18px;
  margin: 2rem 0;
  align-self: center;
  /* text-align: center; */
`;

const ImgxCtn = styled.img`
  height: 250px;
`;

const MilestonesPage = () => {
  const [milestonesList, setMilestonesList] = useState([]);
  const groupsList = useSelector((state) => state.groupsList);
  const categoryList = useSelector((state) => state.categoryList);
  const usersList = useSelector((state) => state.usersList);

  const [bookList, setBookList] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    // speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const findGroup = (article) => {
    const groupObj = groupsList.find(
      (item) => item.groupID === article?.groupID
    );
    return groupObj?.name;
  };

  const findAuthor = (article) => {
    const authorData = usersList.find(
      (item) => item.uid === article?.creatorID
    );
    return authorData?.displayName;
  };

  // const getTime = (content) => {
  //   const time = new Date(content.creationTime?.toDate()).toLocaleString(
  //     "zh-TW"
  //   );
  //   return time;
  // };

  useEffect(() => {
    firebase.getContentsListSort("articles", setMilestonesList);
    const groupID = "9HfGGlnlwvzrgVefq3XL";
    firebase.getGroupBook("books", groupID, setMilestonesList).then((res) => {
      console.log(res);
      setBookList(res);
    });
  }, []);

  // console.log("milllllllllll", milestonesList.slice(0, 5));

  return (
    <MainCtn>
      <TopSection>
        <SlideShow>
          <Div1>
            <BookLabel>看看大家在看什麼書？</BookLabel>
          </Div1>
          <Slider {...settings}>
            {bookList.map((b, i) => {
              return (
                <div key={i}>
                  <div>
                    <p>{b.title}</p>
                    <ImgxCtn src={b.imageLinks.thumbnail || ""} />
                  </div>
                </div>
              );
            })}
          </Slider>
        </SlideShow>
        <LastBlock>
          <ArticleList>
            <LastLabel>Latest 5</LastLabel>
            {milestonesList.slice(0, 5).map((item, i) => {
              console.log(item);
              return (
                <LinkStyle
                  to={`/milestone/${item.milestoneID}`}
                  key={item.milestoneID}
                >
                  <Number>{i + 1}.</Number>
                  <div>
                    <TitleStyle>{item.title}</TitleStyle>
                    <PStyle>啟發自：{findGroup(item)}</PStyle>
                    <Author>
                      <Ptag>作者：{findAuthor(item)}</Ptag>
                      <Ptag>
                        {item.creationTime?.toDate().toLocaleString("zh-TW")}
                      </Ptag>
                    </Author>
                  </div>
                </LinkStyle>
              );
            })}
          </ArticleList>
        </LastBlock>
      </TopSection>
      <Search />
      {/* <ListWrapper>
        {categoryList.map((item, i) => {
          return <ListCtn key={i}>{item.name}</ListCtn>;
        })}
      </ListWrapper> */}
      <div>
        <Wrapper>
          {milestonesList.map((item) => {
            return <Card item={item} key={item.milestoneID} />;
          })}
        </Wrapper>
      </div>
    </MainCtn>
  );
};

export default MilestonesPage;
