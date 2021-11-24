import React from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import * as firebase from "../../utils/firebase";
import HtmlParser from "react-html-parser";

import PostContainer from "./components/PostContainer";
import MemberAvatar from "./components/MemberAvatar";
import { dateCounter } from "../../utils/common";

import BestBoard from "./components/BestBoard";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";
import SimpleEditor from "../../components/SimpleEditor";
import { DisappearedLoading } from "react-loadingg";
import { successAlert } from "../../utils/alert";
import {
  EditIcon,
  ConfirmIcon,
  Wrapper,
  MobileBlock,
  LabelStyled,
  MemberContainer,
  HeadDiv,
  HeadAvatar,
  MainBlock,
  SectionStyled,
  ContentCtn,
  ContentStyled,
  PostArea,
  PostBtn,
  TagStyle,
  CateTag,
  AboutContent,
  SideBlock,
} from "./style/Index.style.jsx";

const GroupPage = () => {
  const userData = useSelector((state) => state.userData);
  const usersList = useSelector((state) => state.usersList);
  const groupsList = useSelector((state) => state.groupsList);
  const { groupID } = useParams();
  const [showBtn, setShowBtn] = useState(false);
  const [content, setContent] = useState({});
  const [textValue, setTextValue] = useState("");
  const [renderPost, setRenderPost] = useState([]);
  const [renderMember, setRenderMember] = useState([]);
  //edit
  const [actEdit, setActEdit] = useState(false);
  const [actEditGoal, setActEditGoal] = useState(false);
  const [actEditDate, setActEditDate] = useState(false);
  const [aboutValue, setAboutValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [goal, setGoal] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (groupsList.length > 0) {
        const checkGroup = groupsList.findIndex((g) => g.groupID === groupID);
        if (checkGroup < 0) {
          history.push("/404");
        } else {
          const currentGroupData = groupsList?.find(
            (g) => g.groupID === groupID
          );
          setContent(currentGroupData);
          setAboutValue(currentGroupData.introduce);
          setDateValue(currentGroupData.goalDate);
          setGoal(currentGroupData.goal);
        }
      }
      const postQ = query(
        collection(firebase.db, "groups", groupID, "posts"),
        orderBy("creationTime", "desc")
      );
      const postUnsubscribe = onSnapshot(postQ, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setRenderPost(data);
      });

      const memberQ = query(
        collection(firebase.db, "groups", groupID, "members"),
        orderBy("joinTime", "desc")
      );
      const memberUnsubscribe = onSnapshot(memberQ, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setRenderMember(data);
      });
      setIsLoading(false);
      return () => {
        postUnsubscribe();
        memberUnsubscribe();
      };
    }
    return () => {
      isMounted = false;
    };
  }, [groupsList, groupID]);

  const postHandler = () => {
    const data = {
      content: textValue,
      creationTime: new Date(),
      creatorID: userData.uid,
      groupID: groupID,
    };
    firebase.sendGroupsPost(groupID, data);
    setShowBtn(false);
    setTextValue("");
  };
  const stationHead = usersList.find(
    (item) => item?.uid === content?.creatorID
  );

  const dateText = `${dateValue}，還有
            ${dateCounter(dateValue)} 天`;

  const handleSubmit = () => {
    setActEdit(false);
    setActEditGoal(false);
    setActEditDate(false);
    const data = {
      introduce: aboutValue,
      goal: goal,
      goalDate: dateValue,
    };
    firebase.editGroupData(data, content.groupID);
    successAlert("資料修改成功");
  };

  const checkMember =
    (userData !== null && content?.membersList?.includes(userData?.uid)) ||
    content?.creatorID === userData?.uid;
  const checkOwner = content.creatorID === userData?.uid;

  if (userData === undefined || isLoading) {
    return <DisappearedLoading />;
  } else if (!isLoading)
    return (
      <>
        <Wrapper>
          <MobileBlock>
            <LabelStyled>學習夥伴</LabelStyled>
            <MemberContainer>
              <HeadDiv Link to={`/profile/${stationHead?.uid}`}>
                <Link to={`/profile/${stationHead?.uid}`}>
                  <HeadAvatar src={stationHead?.avatar} />
                </Link>
              </HeadDiv>

              {renderMember.map((item) => (
                <MemberAvatar key={item.memberID} data={item} />
              ))}
            </MemberContainer>
          </MobileBlock>
          <MainBlock>
            <SectionStyled>
              <LabelStyled>
                關於我們
                {checkOwner && !actEdit && (
                  <EditIcon
                    onClick={() => {
                      setActEdit(!actEdit);
                    }}
                  />
                )}
                {checkOwner && actEdit && (
                  <ConfirmIcon onClick={handleSubmit} />
                )}
              </LabelStyled>
              {actEdit && (
                <ContentCtn
                  actEdit={actEdit}
                  readOnly={!actEdit}
                  value={aboutValue}
                  onChange={(e) => setAboutValue(e.target.value)}
                />
              )}
              {!actEdit && <AboutContent>{aboutValue}</AboutContent>}
            </SectionStyled>
            <SectionStyled>
              <LabelStyled>
                學習目標
                {checkOwner && !actEditGoal && (
                  <EditIcon
                    onClick={() => {
                      setActEditGoal(!actEditGoal);
                    }}
                  />
                )}
                {checkOwner && actEditGoal && (
                  <ConfirmIcon onClick={handleSubmit} />
                )}
              </LabelStyled>
              {!actEditGoal && (
                <ContentStyled className="ql-editor">
                  {HtmlParser(goal)}
                </ContentStyled>
              )}
              {actEditGoal && <SimpleEditor goal={goal} setGoal={setGoal} />}
            </SectionStyled>
            <SectionStyled>
              <LabelStyled>
                預計完成日：
                {!actEditDate && dateText}
                {checkOwner && !actEditDate && (
                  <EditIcon
                    onClick={() => {
                      setActEditDate(!actEditDate);
                    }}
                  />
                )}
              </LabelStyled>
              {checkOwner && actEditDate && (
                <div>
                  <input
                    type="date"
                    min={today}
                    onChange={(e) => setDateValue(e.target.value)}
                  />
                  <ConfirmIcon onClick={handleSubmit} />
                </div>
              )}
            </SectionStyled>
            {checkMember && (
              <SectionStyled>
                <PostArea
                  value={textValue}
                  placeholder="開始新的討論吧..."
                  onFocus={() => {
                    setShowBtn(true);
                  }}
                  onChange={(e) => setTextValue(e.target.value)}
                />
                {showBtn && <PostBtn onClick={postHandler}>留言</PostBtn>}

                {renderPost?.map((item) => {
                  return (
                    <PostContainer
                      key={item.postID}
                      item={item}
                      content={content}
                    />
                  );
                })}
              </SectionStyled>
            )}
          </MainBlock>
          <SideBlock>
            <BestBoard renderPost={renderPost} />
            <LabelStyled>學習夥伴</LabelStyled>
            <MemberContainer>
              <HeadDiv>
                <Link to={`/profile/${stationHead?.uid}`}>
                  <HeadAvatar src={stationHead?.avatar} />
                </Link>
              </HeadDiv>

              {renderMember.map((item) => (
                <MemberAvatar key={item.memberID} data={item} />
              ))}
            </MemberContainer>
            <LabelStyled>社群類別</LabelStyled>
            <CateTag>
              <TagStyle>{content.category}</TagStyle>
              <TagStyle>{content.subClass}</TagStyle>
            </CateTag>
          </SideBlock>
        </Wrapper>
      </>
    );
};

export default GroupPage;
