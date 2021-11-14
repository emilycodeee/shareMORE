import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../Home/components/Card";
import * as firebase from "../../utils/firebase";
import Slider from "react-slick";
import BookContent from "../Bookshelf/component/BookContnet";
import algolia from "../../utils/algolia";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GiBookmarklet } from "react-icons/gi";

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
  /* padding: 0 1rem; */
  width: 60%;
  margin: 0 auto;
  /* border: 1px solid blue; */
  @media only screen and (max-width: 992px) {
    width: 80%;
  }
`;

const LastBlock = styled.div`
  width: 30%;

  /* margin-left: 2rem; */
  /* border: 1px solid salmon; */

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
  /* border: ; */
  justify-content: space-between;
  /* overflow: hidden; */
  gap: 10px;
  /* justify-content: end; */
  /* align-items: flex-end; */
`;

const Ptag = styled.div`
  /* margin-right: 10px; */
  font-weight: 550;
  color: rgb(111 104 102);
  /* &:last-child {
    margin-left: 10px;
  } */
`;

const Search = styled.input`
  width: 80%;
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

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 0 auto;
`;

const BookImg = styled.img`
  background-position: center center;
  background-size: cover;
  box-shadow: rgb(0 0 0 / 16%) 0px 5px 11px 0px;
  /* height: 20vmin;
  width: 15vmin; */
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
  /* .slick-dots li button:before {
    height: 2px;
    width: 2px;
  } */
`;

const MilestonesPage = () => {
  const [milestonesList, setMilestonesList] = useState([]);
  const groupsList = useSelector((state) => state.groupsList);
  const categoryList = useSelector((state) => state.categoryList);
  const articlesList = useSelector((state) => state.articlesList);
  const usersList = useSelector((state) => state.usersList);
  const [inputValue, setInputValue] = useState("");
  const [bookList, setBookList] = useState([]);
  const [bookContent, setBookContent] = useState({});
  const [showBookContent, setShowBookContent] = useState(false);
  const [renderMilestone, setRenderMileStone] = useState([]);
  const [gorden, setGorden] = useState([]);

  const settings = {
    // dots: true,
    infinite: true,
    // speed: 500,
    lazyLoad: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          // dots: true,
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

  const convertGroupName = (groupID) => {
    const g = groupsList.find((b) => b.groupID === groupID);
    if (g) return g.name;
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

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      algolia.search(e.target.value).then((result) => {
        const key = result.hits.map((r) => r.objectID);
        // console.log(key);

        const finalFilter = articlesList.filter((el) =>
          key.includes(el.milestoneID)
        );
        setRenderMileStone(finalFilter);
      });
    }
  };

  const handleSearchBtn = () => {
    // if (e.key === "Enter") {
    algolia.search(inputValue).then((result) => {
      const key = result.hits.map((r) => r.objectID);
      // console.log(key);

      const finalFilter = articlesList.filter((el) =>
        key.includes(el.milestoneID)
      );
      setRenderMileStone(finalFilter);
    });
    // }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      setRenderMileStone(articlesList.filter((a) => a.public === true));
    }
  };

  useEffect(() => {
    setRenderMileStone(articlesList.filter((a) => a.public === true));
  }, [articlesList]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      // firebase.getContentsListSort("articles", setMilestonesList);
      firebase.getTotalDocList("gorden").then((res) => setGorden(res));
      firebase.getGroupBookShelf().then((res) => {
        setBookList(res);
      });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // console.log(milestonesList);

  return (
    <MainCtn>
      {showBookContent && (
        <ContentShield
          data-target="shield-content"
          onClick={(e) => {
            e.target.dataset.target === "shield-content" &&
              setShowBookContent(!showBookContent);
          }}
        >
          <BookContent
            bookContent={bookContent}
            setShowBookContent={setShowBookContent}
          />
        </ContentShield>
      )}
      <TopSection>
        <SlideShow>
          <Div1>
            <BookLabel>看看大家在看什麼書？</BookLabel>
          </Div1>
          <StyledSlider {...settings}>
            {bookList.length > 0 &&
              bookList.map((b) => {
                return (
                  <SelectedBook key={b.groupBookID}>
                    <BookImgWrapper
                      onClick={() => {
                        setShowBookContent(true);
                        setBookContent(b);
                      }}
                    >
                      <BookImg src={b.volumeInfo.imageLinks?.thumbnail} />
                    </BookImgWrapper>
                    <BookBrief>
                      <Title>{b.volumeInfo.title}</Title>
                      <SubTitle>
                        作者/譯者：{b.volumeInfo.authors?.join(",")}
                      </SubTitle>
                      <GroupLink to={`/group/${b.groupID}`}>
                        <SubTitleLink>
                          選自：{convertGroupName(b.groupID)}
                        </SubTitleLink>
                      </GroupLink>
                    </BookBrief>
                  </SelectedBook>
                );
              })}
          </StyledSlider>

          <Golden>
            <Label>
              <Bookmark />
              金句放送
            </Label>
            <GoldenCtn>
              <div>{gorden[0]?.content}</div>
              <div> ─ {gorden[0]?.from}</div>
            </GoldenCtn>
          </Golden>
        </SlideShow>
        <LastBlock>
          <ArticleList>
            <LastLabel>Latest 5</LastLabel>
            <ArticleCtn>
              {renderMilestone.slice(0, 5).map((item, i) => {
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
            </ArticleCtn>
          </ArticleList>
        </LastBlock>
      </TopSection>
      <SearchWrapper>
        <Search
          placeholder="文章標題、文章內容..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleSearch}
        />
        <SerachButton onClick={handleSearchBtn}>搜尋</SerachButton>
      </SearchWrapper>
      <div>
        <Wrapper>
          {renderMilestone.map((item) => {
            return <Card item={item} key={item.milestoneID} />;
          })}
        </Wrapper>
      </div>
    </MainCtn>
  );
};

export default MilestonesPage;

const GroupLink = styled(Link)`
  text-decoration: none;
`;

const SelectedBook = styled.div`
  margin: 0 1vmin;
`;

const BookBrief = styled.div`
  margin: 10px 0;
  gap: 5px;
  /* margin: 1vmin 0; */
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

const Golden = styled.div`
  /* width: 100%;
  background-color: salmon; */
  /* border: 1px solid red; */
`;

const GoldenCtn = styled.div`
  width: 100%;
  background-color: #fffdfd;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 4px;
  line-height: 1.2rem;
  box-shadow: rgb(153 153 153 / 16%) 0px 5px 11px 0px;
`;

const SerachButton = styled.button`
  align-self: center;
  text-align: center;
  width: 8%;
  padding: 1% 0;
  margin-left: 1rem;
  border-radius: 25px;
  background-color: #f5f5f5;
  box-shadow: rgb(0 0 0 / 10%) 0px 2px 6px;
  cursor: pointer;
  border: none;
`;

const SubTitle = styled.p`
  /* margin-bottom: 5px; */
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

  /* margin-bottom: 5px; */
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ContentShield = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  position: fixed;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  /* cursor: zoom-out; */
`;
