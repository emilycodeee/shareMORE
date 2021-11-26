import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Card from "../Home/components/MilestonesCard";
import { getTotalDocList, getGroupBookShelf } from "../../utils/firebase";
import BookContent from "../Bookshelf/component/BookContent";
import algolia from "../../utils/algolia";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DisappearedLoading } from "react-loadingg";
import { settings } from "../../components/SliderSetting";
import {
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
} from "./style/MilestonesPage.style";

const MilestonesPage = () => {
  const groupsList = useSelector((state) => state.groupsList);
  const articlesList = useSelector((state) => state.articlesList);
  const usersList = useSelector((state) => state.usersList);
  const userData = useSelector((state) => state.userData);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [bookList, setBookList] = useState([]);
  const [bookContent, setBookContent] = useState({});
  const [showBookContent, setShowBookContent] = useState(false);
  const [renderMilestone, setRenderMileStone] = useState([]);
  const [latestFiveMilestone, setLatestFiveMilestone] = useState([]);
  const [gorden, setGorden] = useState({});
  const [searchLoading, setSearchLoading] = useState(false);

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
      setSearchLoading(true);
      const keyWord = e.target.value.trim();
      algolia.search(keyWord).then((result) => {
        const key = result.hits.map((r) => r.objectID);
        const finalFilter = articlesList
          .filter((el) => key.includes(el.milestoneID))
          .filter((a) => a.public === true);
        setSearchLoading(false);
        setRenderMileStone(finalFilter);
      });
    }
  };

  const handleSearchBtn = () => {
    setSearchLoading(true);
    algolia.search(inputValue.trim()).then((result) => {
      const key = result.hits.map((r) => r.objectID);
      const finalFilter = articlesList
        .filter((el) => key.includes(el.milestoneID))
        .filter((a) => a.public === true);
      setSearchLoading(false);
      setRenderMileStone(finalFilter);
    });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      setRenderMileStone(articlesList.filter((a) => a.public === true));
    }
  };

  useEffect(() => {
    if (groupsList.length > 0) {
      setRenderMileStone(articlesList.filter((a) => a.public === true));
      setLatestFiveMilestone(
        articlesList.filter((a) => a.public === true).slice(0, 5)
      );
      setIsLoading(false);
    }
  }, [articlesList, groupsList]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      getTotalDocList("gorden").then((res) => {
        const random = Math.floor(Math.random() * res.length);
        setGorden(res[random]);
      });
      getGroupBookShelf().then((res) => {
        setBookList(res);
      });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  if (userData === undefined || isLoading) {
    return <DisappearedLoading />;
  } else if (!isLoading)
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
                        <BookImg src={b.mainCover} />
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

            <div>
              <Label>
                <Bookmark />
                金句放送
              </Label>
              <GoldenCtn>
                <div>{gorden?.content}</div>
                <div> ─ {gorden?.from}</div>
              </GoldenCtn>
            </div>
          </SlideShow>
          <LastBlock>
            <ArticleList>
              <LastLabel>Latest 5</LastLabel>
              <ArticleCtn>
                {latestFiveMilestone.map((item, i) => {
                  return (
                    <LinkStyle
                      to={`/article/${item.milestoneID}`}
                      key={item.milestoneID}
                    >
                      <Number>{i + 1}.</Number>
                      <div>
                        <TitleStyle>{item.title}</TitleStyle>
                        <PStyle>啟發自：{findGroup(item)}</PStyle>
                        <Author>
                          <Ptag>作者：{findAuthor(item)}</Ptag>
                          <Ptag>
                            {item.creationTime
                              ?.toDate()
                              .toLocaleString("zh-TW")}
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
          <Container>
            <SearchBarInput
              placeholder="文章標題、文章內容..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleSearch}
            />
            <SubmitBtn onClick={handleSearchBtn}>
              <SearchIcon />
            </SubmitBtn>
          </Container>
        </SearchWrapper>
        <div>
          {searchLoading && (
            <Empty>
              <lottie-player
                src="https://assets6.lottiefiles.com/packages/lf20_aj9jghqr.json"
                background="transparent"
                speed="1"
                style={{ maxWidth: "300px", maxHeight: "300px" }}
                loop
                autoplay
              />
            </Empty>
          )}
          {!searchLoading && renderMilestone.length === 0 && (
            <>
              <Empty>
                <div>
                  找不到相關的分享文章，就由你來
                  <MoreLink to="/articles/post">建立第一篇</MoreLink>吧！
                </div>
                <lottie-player
                  src="https://assets6.lottiefiles.com/private_files/lf30_bn5winlb.json"
                  background="transparent"
                  speed="1"
                  style={{ maxWidth: "300px", maxHeight: "300px" }}
                  loop
                  autoplay
                />
              </Empty>
            </>
          )}

          {!searchLoading && renderMilestone.length > 0 && (
            <Wrapper>
              {renderMilestone.map((item) => {
                return <Card item={item} key={item.milestoneID} />;
              })}
            </Wrapper>
          )}
        </div>
      </MainCtn>
    );
};

export default MilestonesPage;
