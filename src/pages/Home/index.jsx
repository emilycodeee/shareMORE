import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MilestonesCard from "./components/MilestonesCard";
import GroupsCard from "./components/GroupsCard";
import main from "../../sources/main.png";
import bg from "../../sources/bg.jpg";
import MainText from "./components/MainText";
import { DisappearedLoading } from "react-loadingg";
import {
  Container,
  CoverContainer,
  SecondWrapper,
  InnerWrapper,
  Left,
  Animation,
  Img,
  CateBtn,
  Empty,
  ListWrapper,
  Wrapper,
  Section,
  LinkStyled,
  Slogan,
} from "./style/Index.style";

const HomePage = ({ userList, groupList }) => {
  const categoryList = useSelector((state) => state.categoryList);
  const groupsList = useSelector((state) => state.groupsList);
  const articlesList = useSelector((state) => state.articlesList);
  const [groupsIntro, setGroupsIntro] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setGroupsIntro(groupsList);
    setIsLoading(false);
  }, [groupsList]);

  const filterPublicArticles = articlesList.filter((a) => a.public === true);

  const handleSelected = (e) => {
    const target = e.target.textContent;

    const targetFilter = groupsList.filter((g) => g.category === target);
    setGroupsIntro(targetFilter);
    if (target === "全部") {
      setGroupsIntro(groupsList.slice(0, 8));
    }
  };

  if (isLoading) {
    return <DisappearedLoading />;
  } else
    return (
      <Container>
        <CoverContainer bg={bg}>
          <SecondWrapper>
            <InnerWrapper>
              <Left>
                <MainText />
              </Left>
              <Animation>
                <Img src={main} />
              </Animation>
            </InnerWrapper>
          </SecondWrapper>
        </CoverContainer>
        <div>
          <ListWrapper>
            <CateBtn key="all" onClick={handleSelected}>
              全部
            </CateBtn>
            {categoryList.map((item, i) => {
              return (
                <CateBtn key={i} onClick={handleSelected}>
                  {item.name}
                </CateBtn>
              );
            })}
          </ListWrapper>
        </div>
        <Section>
          <Slogan>看看最近大家在學些什麼</Slogan>
          {groupsIntro.length === 0 && (
            <>
              <Empty>
                <div>目前找不到相關社團，就由你來建立第一個吧！</div>
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

          {groupsIntro.length > 0 && (
            <Wrapper>
              {groupsIntro.slice(0, 8).map((item) => {
                return <GroupsCard item={item} key={item.groupID} />;
              })}
            </Wrapper>
          )}
          <LinkStyled to="/groups">查看更多</LinkStyled>
        </Section>
        <Section>
          <Slogan>一起的日子 分享我們的學習成果</Slogan>
          <Wrapper>
            {filterPublicArticles.slice(0, 8).map((item) => {
              return (
                <MilestonesCard
                  item={item}
                  key={item.milestoneID}
                  userList={userList}
                  groupList={groupList}
                />
              );
            })}
          </Wrapper>
          <LinkStyled to="/articles">查看更多</LinkStyled>
        </Section>
      </Container>
    );
};

export default HomePage;
