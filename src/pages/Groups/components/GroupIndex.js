import React from "react";
import { useParams } from "react-router";
import { useState, useEffect, useRef } from "react";
import * as firebase from "../../../utils/firebase";
import HtmlParser from "react-html-parser";
import styled from "styled-components";
import PostContainer from "../components/PostContainer";
// import GroupHeader from "./components/GroupHeader";
import MemberAvatar from "../components/MemberAvatar";
import { dateCounter } from "../../../utils/commonText";
import { BsPencilSquare, BsCheckLg } from "react-icons/bs";

import { query, collection, orderBy, onSnapshot } from "firebase/firestore";

import { useSelector } from "react-redux";
import SimpleEditor from "../../../components/SimpleEditor";

const SectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const MemberContainer = styled.div`
  min-height: 35px;
  box-shadow: 2px 2px 3px #d1cbcb;
  border-radius: 20px;
  border: 1px solid #d1cbcb;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  padding: 0.6rem;
`;

const LabelStyled = styled.label`
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 2px;
  padding: 10px;
`;

const ContentStyled = styled.div`
  line-height: 1.5rem;
  box-shadow: 2px 2px 3px #d1cbcb;
  border-radius: 20px;
  border: 1px solid #d1cbcb;
  padding: 1rem;
`;

const ContentCtn = styled.textarea`
  line-height: 1.5rem;
  box-shadow: 2px 2px 3px #d1cbcb;
  border-radius: 20px;
  outline: none;
  padding: 1rem;
  border: ${(props) =>
    props.actEdit ? " 1px solid black" : " 1px solid #d1cbcb"};
`;

const Wrapper = styled.div`
  max-width: 1560px;
  border: 1px solid red;
  width: 100%;
  padding: 0 10%;
  /* max-width: 1000px; */
  margin: 0 auto;
`;

const Text = styled.div`
  align-self: center;
`;

const PostArea = styled.textarea`
  resize: none;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  background-color: #eeeeee;
  color: black;
`;

const PostBtn = styled.button`
  margin-top: 0.5rem;
  height: 2rem;
  cursor: pointer;
  border-radius: 10px;
  border: none;
  border-radius: 10px;
  outline: none;
`;

const GoalDate = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GroupIndex = () => {
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
  const [actEditImage, setActEditImage] = useState(false);
  const [file, setFile] = useState(null);
  const [aboutValue, setAboutValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [goal, setGoal] = useState("");
  const [imageCover, setImageCover] = useState("");

  useEffect(() => {
    const currentGroupData = groupsList?.find((g) => g.groupID === groupID);

    // if (isMounted) {
    if (currentGroupData) {
      setContent(currentGroupData);
      setAboutValue(currentGroupData.introduce);
      setDateValue(currentGroupData.goalDate);
      setGoal(currentGroupData.goal);
      setImageCover(currentGroupData.coverImage);
      // setRenderMember(currentGroupData.membersList);
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

    return () => {
      postUnsubscribe();
      memberUnsubscribe();
    };
  }, [groupsList]);

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

  const dateText = ` 預計完成日：${dateValue}，還有
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
  };

  const checkMember =
    (userData !== null && content?.membersList?.includes(userData?.uid)) ||
    content?.creatorID === userData?.uid;
  const checkOwner = content.creatorID === userData?.uid;

  return (
    <>
      {/* <ImgWrapper>
        <input
          type="file"
          id="uploadImg"
          style={{ display: "none" }}
          onChange={(e) => {
            setFile(e.target.files[0]);
            setActEditImage(!actEditImage);
          }}
        />
        <TopCover style={{ backgroundImage: `url(${previewImg})` }} />
        {checkOwner && !actEditImage && (
          <DivCtn as="label" htmlFor="uploadImg">
            <EditImage />
          </DivCtn>
        )}
        {checkOwner && actEditImage && <SaveImage onClick={handleSubmitImg} />}
      </ImgWrapper> */}
      {/* <GroupHeader /> */}
      <Wrapper>
        <SectionStyled>
          <LabelStyled>學習夥伴</LabelStyled>
          <MemberContainer>
            {renderMember.length === 0 && (
              <Text>再等一下，夥伴們正在火速趕來中</Text>
            )}
            {/* src={fish} */}
            {renderMember.map((item) => (
              <MemberAvatar key={item.memberID} data={item} />
            ))}
          </MemberContainer>
        </SectionStyled>
        <SectionStyled>
          <LabelStyled>
            關於我們
            {checkOwner && !actEdit && (
              <BsPencilSquare
                onClick={() => {
                  setActEdit(!actEdit);
                }}
              />
            )}
            {checkOwner && actEdit && <BsCheckLg onClick={handleSubmit} />}
          </LabelStyled>
          {actEdit && (
            <ContentCtn
              actEdit={actEdit}
              readOnly={!actEdit}
              value={aboutValue}
              onChange={(e) => setAboutValue(e.target.value)}
            />
          )}
          {!actEdit && <div>{aboutValue}</div>}
        </SectionStyled>
        <SectionStyled>
          <GoalDate>
            <LabelStyled>
              學習目標
              {checkOwner && !actEditGoal && (
                <BsPencilSquare
                  onClick={() => {
                    setActEditGoal(!actEditGoal);
                  }}
                />
              )}
              {checkOwner && actEditGoal && (
                <BsCheckLg onClick={handleSubmit} />
              )}
            </LabelStyled>
            <LabelStyled>
              {dateText}

              {checkOwner && !actEditDate && (
                <BsPencilSquare
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
                  onChange={(e) => setDateValue(e.target.value)}
                />
                <BsCheckLg onClick={handleSubmit} />
              </div>
            )}
          </GoalDate>
          {!actEditGoal && (
            <ContentStyled className="ql-editor">
              {HtmlParser(goal)}
            </ContentStyled>
          )}
          {actEditGoal && <SimpleEditor goal={goal} setGoal={setGoal} />}
        </SectionStyled>
        <hr />
        {checkMember && (
          <SectionStyled>
            <PostArea
              value={textValue}
              placeholder="想討論什麼嗎..."
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
      </Wrapper>
    </>
  );
};

export default GroupIndex;
