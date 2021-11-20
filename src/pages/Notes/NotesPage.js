import React from "react";
import styled from "styled-components";
import { useParams, useHistory, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as firebase from "../../utils/firebase";
import GroupHeader from "../Groups/components/GroupHeader";
import { DisappearedLoading } from "react-loadingg";

const NotesPage = () => {
  const { groupID } = useParams();
  const history = useHistory();
  const endpoint = useLocation().pathname;
  const [contentsList, setContentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const groupsList = useSelector((state) => state.groupsList);
  const usersList = useSelector((state) => state.usersList);
  const userData = useSelector((state) => state.userData);

  if (userData === null) {
    history.push(`/group/${groupID}`);
  }

  useEffect(() => {
    if (groupsList.length > 0) {
      const checkGroup = groupsList.findIndex((g) => g.groupID === groupID);
      if (checkGroup < 0) {
        history.push("/404");
      } else {
        const groupDetail = groupsList.find((g) => g.groupID === groupID);
        const checkMembership =
          groupDetail?.membersList?.includes(userData?.uid) ||
          groupDetail?.creatorID === userData?.uid;

        if (!checkMembership) {
          history.push(`/group/${groupID}`);
        }
        setIsLoading(false);
      }
    }
  }, [userData, groupsList]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      firebase
        .getGroupNotes("groups", groupID, "notes")
        .then((res) => setContentsList(res))
        .catch((err) => console.log(err));
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const getTime = (content) => {
    const time = new Date(content.creationTime?.toDate()).toLocaleString(
      "zh-TW"
    );
    return time;
  };

  if (userData === undefined || isLoading) {
    return <DisappearedLoading />;
  } else if (!isLoading)
    return (
      <>
        <GroupHeader tag="note" />
        <Wrapper>
          {endpoint.includes("notes") && (
            <CreateButton to={`/group/${groupID}/new/notes`}>
              建立社團筆記
            </CreateButton>
          )}

          {contentsList?.length === 0 && (
            <Empty>
              <div>目前尚未建立社群筆記，就從你開始吧</div>
              <lottie-player
                src="https://assets5.lottiefiles.com/packages/lf20_n2m0isqh.json"
                background="transparent"
                speed="1"
                style={{ maxWidth: "250px", maxHeight: "250px" }}
                loop
                autoplay
              />
            </Empty>
          )}

          <NotesArea>
            {contentsList?.map((item) => {
              let url;
              if (endpoint.includes("notes")) {
                url = `/group/${groupID}/notes/${item?.noteID}`;
              } else if (endpoint.includes("milestones")) {
                url = `/article/${item.milestoneID}`;
              }
              return (
                <Notes key={item?.noteID || item?.milestoneID} to={url}>
                  <Cover itemImg={item.coverImage} />
                  <Content>
                    <TitleStyle>{item.title}</TitleStyle>
                    <TimeTag>
                      {
                        usersList.find((p) => p.uid === item.creatorID)
                          ?.displayName
                      }
                    </TimeTag>
                    <TimeTag>{getTime(item)}</TimeTag>
                    <TextTag>{item.introduce}</TextTag>
                  </Content>
                </Notes>
              );
            })}
          </NotesArea>
        </Wrapper>
      </>
    );
};

export default NotesPage;

const Empty = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  gap: 1rem;
  div {
    margin-top: 1rem;
    font-weight: 600;
    color: rgb(242, 126, 89);
  }
  @media only screen and (max-width: 500px) {
    font-size: 0.8rem;
  }
`;

const CreateButton = styled(Link)`
  border-radius: 4px;
  list-style: none;
  font-weight: 600;
  font-size: 1rem;
  height: auto;
  text-decoration: none;
  cursor: pointer;
  color: #f27e59;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 1rem;
  border: none;
  padding: 0.6rem;
  cursor: pointer;
  border: 1px solid #f27e59;
  background-color: transparent;
  &:hover {
    background-color: #f27e59;
    color: #fff;
  }
`;

const Wrapper = styled.div`
  border-radius: 4px;
  max-width: 1560px;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  display: flex;
  background-color: #fff;
  padding: 2rem 0;
  flex-direction: column;
`;

const Notes = styled(Link)`
  box-shadow: 0 2px 4px #a2a2a2;
  text-decoration: none;
  color: black;
  /* border: 1px solid rgb(204, 204, 204); */
  display: flex;
  border-radius: 4px;
  padding: 1rem;
  margin: 0 auto;
  width: 100%;
  justify-content: space-between;
  @media only screen and (max-width: 992px) {
  }
`;

const NotesArea = styled.div`
  width: 90%;
  padding: 0 1rem;
  /* padding-bottom: 1rem; */
  margin: 0 auto;
  /* border: 1px solid salmon; */
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Content = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  @media only screen and (max-width: 500px) {
    margin: 0;
    width: 100%;
  }
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.itemImg});
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  background-size: cover;
  background-position: center;
  @media only screen and (max-width: 500px) {
    display: none;
  }
`;

const TitleStyle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  /* margin-top: 1rem; */
  /* line-height: 28px; */
`;

const TimeTag = styled.p`
  align-self: flex-end;
  margin: 3px 0;
  font-size: 12px;
  font-weight: 550;
  color: rgb(111 104 102);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  @media only screen and (max-width: 992px) {
    align-self: flex-start;
  }
`;

const TextTag = styled.p``;
