import React from "react";
import styled from "styled-components";
import { useLocation, useParams, useHistory } from "react-router";
import { useState, useEffect } from "react";
import * as firebase from "../../utils/firebase";
import { useSelector } from "react-redux";
import HtmlParser from "react-html-parser";
import { convertTime } from "../../utils/commonText";
import {
  BsPencilSquare,
  BsFillTrashFill,
  BsFillHouseDoorFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
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

const Wrapper = styled.div`
  max-width: 1560px;
  width: 80%;
  margin: 0 auto;
  padding: 1rem;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
`;

const ContentStyle = styled.div`
  height: fit-content;
  margin: 0 auto;
  background-color: #fff;
  img {
    max-width: 100%;
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

const IconLink = styled(Link)`
  background-color: transparent;
  border: none;
  /* padding: 0.5rem; */
  /* margin-left: 0.3rem; */
  cursor: pointer;
`;

const IconsWrapper = styled.div`
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
  console.log("筆記業");
  const { groupID, postID } = useParams();
  const userData = useSelector((state) => state.userData);
  const groupsList = useSelector((state) => state.groupsList);
  const currentGroupData = groupsList.find((item) => item.groupID === groupID);
  const usersList = useSelector((state) => state.usersList);
  console.log(currentGroupData);
  const [noteContent, setNoteContent] = useState("");
  const [noteCreator, setNoteCreator] = useState({});
  const [checkNoteCreator, setCheckNoteCreator] = useState(false);
  const history = useHistory();
  const checkGroupCreator = currentGroupData?.creatorID === userData?.uid;
  // const checkCreator = currentGroupData?.creatorID === userData?.uid;
  console.log(checkGroupCreator);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      firebase
        .getGroupsNoteContent("groups", groupID, "notes", postID)
        .then((res) => {
          setNoteContent(res);
          setCheckNoteCreator(res.creatorID === userData?.uid);
          setNoteCreator(usersList.find((p) => p.uid === res.creatorID));
        })
        .catch((err) => console.log(err));
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // const handleEdit = () => {};

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

    // const check = window.confirm("刪除後將不可恢復，確認要刪除嗎？");
    // if (check) {
    //   firebase.deleteDocc("groups", groupID, "notes", postID).then(() => {
    //     history.push(`/group/${groupID}/notes`);
    //   });
    // }
  };

  console.log(noteContent);

  return (
    <Wrapper>
      <TopCover
        style={{ backgroundImage: `url(${noteContent?.coverImage})` }}
      />
      <IconsWrapper>
        {(checkGroupCreator || checkNoteCreator) && (
          <>
            {checkNoteCreator && (
              <IconLink to={`/group/${groupID}/notes/${postID}/edit`}>
                <BsPencilSquare />
              </IconLink>
            )}
            <IconCtn>
              <BsFillTrashFill onClick={handleDelete} />
            </IconCtn>
          </>
        )}
        <IconLink to={`/group/${groupID}`}>
          <BsFillHouseDoorFill />
        </IconLink>
      </IconsWrapper>
      <TopArea>
        <h2>{noteContent?.title}</h2>
      </TopArea>
      <label>撰寫自：{noteCreator?.displayName}</label>
      <label>{convertTime(noteContent?.creationTime)}</label>

      <ContentStyle>
        <div className="ql-editor">{HtmlParser(noteContent?.content)}</div>
      </ContentStyle>
      <hr />
    </Wrapper>
  );
};

export default NotePage;
