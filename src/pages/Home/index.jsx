import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MilestonesCard from "./components/MilestonesCard";
import GroupsCard from "./components/GroupsCard";
import main from "../../sources/main.png";
import bg from "../../sources/bg.jpg";
import forarticles from "../../sources/forarticles.svg";
import forbookshelf from "../../sources/forbookshelf.svg";
import fornote from "../../sources/fornote.svg";
import forshare from "../../sources/forshare.svg";
import MainText from "./components/MainText";
import { DisappearedLoading } from "react-loadingg";
import {
  Container,
  SynopsisItem,
  SynopsisTitle,
  SynopsisImg,
  SynopsisWrap,
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
        <SynopsisWrap>
          <SynopsisItem>
            <div>
              <SynopsisImg src={forshare}></SynopsisImg>
            </div>

            <SynopsisTitle>一起走得更遠</SynopsisTitle>
            <p>
              <span>加入/創建社團討論</span>
              ，互相督促、彼此鼓勵，讓我們在學習路上，主動打造學習的支持環境。
            </p>
          </SynopsisItem>

          <SynopsisItem>
            <div>
              <SynopsisImg src={fornote}></SynopsisImg>
            </div>
            <SynopsisTitle>共享學習資訊</SynopsisTitle>
            <p>
              建立<span>社團筆記</span>
              共享學習資訊，養成輸入與輸出並進的高效學習。留言發起討論，點選更多有小彩蛋喔。
            </p>
          </SynopsisItem>
          <SynopsisItem>
            <div>
              <SynopsisImg src={forarticles}></SynopsisImg>
            </div>
            <SynopsisTitle>分享學習成果</SynopsisTitle>
            <p>
              發起
              <span>學習分享與反思</span>
              ，讓我們在學習的路上，也能記得與他人分享並給予彼此鼓勵。
            </p>
          </SynopsisItem>
          <SynopsisItem>
            <div>
              <SynopsisImg src={forbookshelf}></SynopsisImg>
            </div>
            <SynopsisTitle>建立社團書櫃</SynopsisTitle>
            <p>
              打造我們的<span>推薦書單</span>
              ，幫助夥伴快速查找主題書目，不怕臨時想起卻找不到「那一本書」。
            </p>
          </SynopsisItem>
        </SynopsisWrap>
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
