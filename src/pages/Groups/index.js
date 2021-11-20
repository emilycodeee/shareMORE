import React from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import * as firebase from "../../utils/firebase";
import HtmlParser from "react-html-parser";
import styled from "styled-components";
import PostContainer from "./components/PostContainer";
import GroupHeader from "./components/GroupHeader";
import MemberAvatar from "./components/MemberAvatar";
import { dateCounter } from "../../utils/commonText";
import { BsPencilSquare, BsCheckLg } from "react-icons/bs";
import BestBoard from "./components/BestBoard";
import { AiOutlineCrown } from "react-icons/ai";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import SimpleEditor from "../../components/SimpleEditor";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { DisappearedLoading } from "react-loadingg";

const SectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const LabelStyled = styled.label`
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const ContentStyled = styled.div`
  line-height: 1.5rem;
  border: 1px solid #d1cbcb;
  padding: 1rem;
`;

const ContentCtn = styled.textarea`
  box-shadow: 2px 2px 3px #d1cbcb;
  border-radius: 4px;
  height: 15vh;
  outline: none;
  padding: 1rem;
  border: ${(props) =>
    props.actEdit ? " 1px solid black" : " 1px solid #d1cbcb"};
`;

const PostArea = styled.textarea`
  resize: none;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 1rem 1rem;
  border-radius: 4px;
  color: black;
  background-color: #fff4e4;
`;

const PostBtn = styled.button`
  margin-top: 0.5rem;
  font-weight: 600;
  padding: 0;
  width: 3rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  align-self: flex-end;
  border-radius: 3px;
  border: 1px solid #f27e59;
  color: #f27e59;
  background-color: transparent;
  outline: none;
  &:hover {
    background-color: #f27e59;
    color: white;
  }
`;

const GoalDate = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: co;
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  .slick-list {
    width: 100%;
    padding: 0 !important;
  }
  .slick-prev:before,
  .slick-next:before {
    color: black;
  }
`;

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
  const [actEditImage, setActEditImage] = useState(false);
  const [file, setFile] = useState(null);
  const [aboutValue, setAboutValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [goal, setGoal] = useState("");
  const [imageCover, setImageCover] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  // if (groupsList.length > 0) {
  //   const checkGroup = groupsList.findIndex((g) => g.groupID === groupID);
  //   if (checkGroup < 0) {
  //     history.push("/404");
  //   }
  // }
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
          setImageCover(currentGroupData.coverImage);
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
    Swal.fire({
      position: "center",
      icon: "success",
      title: "資料修改成功",
      showConfirmButton: false,
      timer: 1500,
    });
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
        <GroupHeader />
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

              {/* </GoalDate> */}
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

const TagStyle = styled.div`
  background-color: rgba(255, 244, 228);
  padding: 8px 16px;
  border-radius: 100px;
  box-shadow: 0px 2px 7px -3px rgb(132 131 126 / 20%);
`;

const EditIcon = styled(BsPencilSquare)`
  cursor: pointer;
  margin-left: 10px;
`;

const ConfirmIcon = styled(BsCheckLg)`
  cursor: pointer;
  margin-left: 10px;
`;

const CateTag = styled.div`
  display: flex;
  gap: 10px;
`;

const HeadDiv = styled.div`
  position: relative;
`;

const FolderIcon = {
  width: "1.2rem",
  height: " 1.2rem",
  color: "white",
};

const Crown = styled(AiOutlineCrown)`
  ${FolderIcon}
  width: 1.3rem;
  height: 1.3rem;
  position: absolute;
  top: 0;
  right: -3px;
  transform: rotate(5deg);
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  display: none;
`;

const MainBlock = styled.div`
  width: 60%;
  padding: 0 3%;
  @media only screen and (max-width: 992px) {
    width: 100%;
  }
`;

const AboutContent = styled.div`
  white-space: pre-wrap;
`;

const SideBlock = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgba(230, 230, 230, 1);
  width: 40%;
  margin-bottom: 2rem;
  padding: 0 3%;
  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

const MobileBlock = styled.div`
  display: none;
  @media only screen and (max-width: 992px) {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 0 3%;
  }
`;

const Wrapper = styled.div`
  border-radius: 4px;
  max-width: 1560px;
  width: 80%;
  /* padding: 0 3rem; */
  margin: 0 auto;
  margin-bottom: 1.5rem;
  display: flex;
  background-color: #fff;
  /* background-color: #fff4e4; */
  padding: 1rem 0;
  @media only screen and (max-width: 992px) {
    flex-direction: column;
  }
`;

const HeadAvatar = styled.img`
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  margin: 5px;
  border-radius: 50%;
  border: 2px solid #f27e59;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  /* box-shadow: 0px 17px 16px -11px #ffae96; */
`;

const MemberContainer = styled.div`
  width: 100%;
  min-height: 35px;
  box-shadow: 1px 1px 1px #d1cbc6;
  border-radius: 4px;
  border: 1px solid #d1cbcb;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  margin-bottom: 1rem;
`;
