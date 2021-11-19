import React from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router";
import { useState, useEffect } from "react";
import * as firebase from "../../utils/firebase";
import { useSelector } from "react-redux";
import HtmlParser from "react-html-parser";
import { convertTime } from "../../utils/commonText";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { DisappearedLoading } from "react-loadingg";

const TopCover = styled.div`
  width: 100%;
  height: 30vw;
  background-size: cover;
  background-position: center;
  margin: 1.5rem 0;

  /* opacity: 0.8; */
  /* 
  width: 700px;
  height: 300px; */
  /* border: 1px solid red; */
  /* background-size: cover;
  background-position: center; */
  /* margin: 0 auto; */
  /* margin-top: 2rem; */
`;

const Container = styled.div`
  max-width: 1560px;
  width: 80%;
  padding: 1rem;
  height: fit-content;
  /* display: flex; */
  margin: 0 auto;
  margin-top: 3rem;
  margin-bottom: 3rem;
  gap: 1rem;
  background-color: #fffdfd;
  @media only screen and (max-width: 992px) {
    /* flex-direction: column; */
    /* padding-bottom: 0; */
  }
  /* max-width: 1560px;
  width: 80%;
  margin: 0 auto;
  padding: 1rem;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff; */
`;

const Wrapper = styled.div`
  border-radius: 4px;
  padding: 30px;
  background-color: #fffdfd;
  border: none;

  @media only screen and (max-width: 992px) {
    /* position: fixed; */
    width: 100%;
  }
`;

const ContentStyle = styled.div`
  height: fit-content;
  margin: 0 auto;
  background-color: #fff;
  img {
    max-width: 100%;
  }

  .ql-editor {
    padding: 12px 0;
    .ql-video {
      width: 800px;
      height: 400px;
    }
  }
`;

const TopArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    margin: 0;
  }
  @media only screen and (max-width: 992px) {
    /* height: 10vh; */
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const IconCtn = styled.button`
  background-color: transparent;
  border: none;
  /* padding: 0.5rem; */
  /* margin-left: 0.3rem; */
  cursor: pointer;
`;

const EditLink = styled(Link)`
  height: 2rem;
  border-radius: 4px;
  list-style: none;
  font-weight: 600;
  font-size: 0.8rem;
  /* height: auto; */
  text-decoration: none;
  color: #f27e59;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border: none;
  /* min-width: 80px; */
  padding: 5px;
  cursor: pointer;
  border: 1px solid #f27e59;
  background-color: transparent;
  &:hover {
    background-color: #f27e59;
    color: white;
  }
  @media only screen and (max-width: 992px) {
    padding: 2px;
    font-size: 0.6rem;
  }
`;

const EditBtn = styled.button`
  height: 2rem;
  border-radius: 4px;
  list-style: none;
  font-weight: 600;
  font-size: 0.8rem;
  /* height: auto; */
  text-decoration: none;
  color: #f27e59;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border: none;
  /* min-width: 80px; */
  padding: 5px;
  cursor: pointer;
  border: 1px solid #f27e59;
  background-color: transparent;
  &:hover {
    background-color: #f27e59;
    color: white;
  }
  @media only screen and (max-width: 992px) {
    padding: 2px;
    font-size: 0.6rem;
  }
`;

const IconLink = styled(Link)`
  background-color: transparent;
  border: none;
  /* padding: 0.5rem; */
  /* margin-left: 0.3rem; */
  cursor: pointer;
`;

const BtnWrapper = styled.div`
  align-self: flex-end;
  display: flex;
  gap: 10px;
  /* margin-left: 1rem; */

  justify-content: flex-end;
  align-items: center;
  @media only screen and (max-width: 992px) {
    margin: 0;
  }
`;

const NotePage = () => {
  const { groupID, postID } = useParams();
  const userData = useSelector((state) => state.userData);
  const groupsList = useSelector((state) => state.groupsList);
  const usersList = useSelector((state) => state.usersList);
  const [noteContent, setNoteContent] = useState("");
  const [noteCreator, setNoteCreator] = useState({});
  const [checkNoteCreator, setCheckNoteCreator] = useState(false);
  const [checkGroupCreator, setCheckGroupCreator] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (userData === null) {
      history.push("/");
    } else if (
      userData !== undefined &&
      Object.keys(userData).length > 0 &&
      groupsList.length > 0
    ) {
      const currentG = groupsList.find((g) => g.groupID === groupID);
      setCheckGroupCreator(currentG.creatorID === userData.uid);
      if (
        !currentG.membersList?.includes(userData.uid) &&
        currentG.creatorID !== userData.uid
      ) {
        history.push("/");
      } else {
        let isMounted = true;
        if (isMounted) {
          firebase
            .getGroupsNoteContent("groups", groupID, "notes", postID)
            .then((res) => {
              setNoteContent(res);
              setCheckNoteCreator(res.creatorID === userData.uid);
              setNoteCreator(usersList.find((p) => p.uid === res.creatorID));
              setIsLoading(false);
            })
            .catch((err) => console.log(err));
        }

        return () => {
          isMounted = false;
        };
      }
    }
  }, [userData, groupsList]);

  const handleDelete = () => {
    Swal.fire({
      title: "確定要刪除嗎?",
      text: "刪除將不可恢復，請再次確認是否刪除！",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "確定",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.isConfirmed) {
        firebase.deleteDocc("groups", groupID, "notes", postID).then(() => {
          history.push(`/group/${groupID}/notes`);
        });
        Swal.fire("Deleted!", "文章已經刪除囉！", "success");
      }
    });
  };

  console.log(noteContent);

  if (userData === undefined || isLoading) {
    return <DisappearedLoading />;
  } else if (!isLoading)
    return (
      <Container>
        <Wrapper>
          <TopArea>
            <h1>{noteContent?.title}</h1>
          </TopArea>
          <TopCover
            style={{ backgroundImage: `url(${noteContent?.coverImage})` }}
          />
          <TopWrapper>
            <AuthorArea>
              <div>
                撰寫自：<span>{noteCreator?.displayName}</span>
              </div>
              <Time>{convertTime(noteContent?.creationTime)}</Time>
            </AuthorArea>
            <BtnWrapper>
              {(checkGroupCreator || checkNoteCreator) && (
                <>
                  {checkNoteCreator && (
                    <EditLink to={`/group/${groupID}/notes/${postID}/edit`}>
                      編輯
                    </EditLink>
                  )}

                  <EditBtn onClick={handleDelete}>刪除</EditBtn>
                </>
              )}
            </BtnWrapper>
          </TopWrapper>
          <ContentStyle>
            <div className="ql-editor">{HtmlParser(noteContent?.content)}</div>
          </ContentStyle>
        </Wrapper>
      </Container>
    );
};

export default NotePage;

const AuthorArea = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;
`;

const Time = styled.div`
  font-size: 0.8rem;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
