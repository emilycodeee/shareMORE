import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { GrCheckmark, GrClose } from "react-icons/gr";
import * as firebase from "../../../utils/firebase";

// import { getBooksList } from "../../../redux/actions";

const BookApplicationPopup = ({ bookListData }) => {
  const userData = useSelector((state) => state.userData);
  const usersList = useSelector((state) => state.usersList);
  const groupsList = useSelector((state) => state.groupsList);
  const [currentUserData, setCurrentUserData] = useState({});

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const currentUserData = usersList.find((p) => userData.uid === p.uid);
      setCurrentUserData(currentUserData);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleConfirm = (e) => {
    const docID = e.target.dataset.id;
    if (docID) {
      firebase.confirmBookApplication(docID);
    }
    console.log(docID);
  };
  const handleDelete = (e) => {
    const docID = e.target.dataset.id;
    if (docID) {
      firebase.rejectBookApplication(docID);
    }
    console.log(docID);
  };

  console.log(bookListData);
  return (
    <Container>
      <Sider>
        <h2>一起 走得更遠</h2>
        <h4>
          What I wamt is you to try, and the result will follow.If not today
          ,then some other day.
          <br />─ Jonas
        </h4>
      </Sider>
      <MainCtn>
        <div>
          {bookListData.data.length === 0 && <div>書單推薦已審核完畢</div>}
          {bookListData.data.map((b) => {
            return (
              <BookApplist key={b.groupBookID}>
                <RecmderWrapper>
                  <Recmder>
                    <Avatar src={currentUserData.avatar} />
                    <div>{currentUserData.displayName} 推薦:</div>
                  </Recmder>
                  <BookTitle>{b.volumeInfo.title}</BookTitle>
                  <BookAuthor>
                    作者/譯者：{b.volumeInfo.authors?.join(",")}
                  </BookAuthor>
                  <RecText>{b.recReason}</RecText>
                  <Footer>
                    <Astyle href={b.volumeInfo.previewLink} target="_blank">
                      試讀連結
                    </Astyle>
                    <div>
                      <CheckIcon
                        onClick={handleConfirm}
                        data-id={b.groupBookID}
                      />
                      <RejectIcon
                        onClick={handleDelete}
                        data-id={b.groupBookID}
                      />
                    </div>
                  </Footer>
                </RecmderWrapper>
                <RecmderImgWrapper>
                  <BookCover src={b.volumeInfo.imageLinks.smallThumbnail} />
                </RecmderImgWrapper>
              </BookApplist>
            );
          })}
        </div>
      </MainCtn>
    </Container>
  );
};

export default BookApplicationPopup;

const Footer = styled.div`
  display: flex;
`;

const style = {
  cursor: "pointer",
  height: "2vmin",
  width: "2vmin",
};

const CheckIcon = styled(GrCheckmark)`
  ${style}
  margin:  0 1vmin;
`;

const RejectIcon = styled(GrClose)`
  ${style}
`;

const RecText = styled.div`
  /* color: gray; */
  /* font-size: 1.8vmin;
  font-weight: 600;
  margin: 5px 0; */
  background-color: #f1eded;
  margin-bottom: 5px;
  border-radius: 3px;
  padding: 3px;
`;

const RecmderWrapper = styled.div`
  width: 70%;
`;

const Astyle = styled.a`
  text-decoration: none;
  font-size: 2.5vmin;
  /* color: black; */
  /* margin: 10px 0; */
`;

const BookTitle = styled.div`
  /* color: gray; */
  font-size: 2.5vmin;
  font-weight: 600;
  margin: 5px 0;
`;

const BookAuthor = styled.div`
  color: gray;
  font-size: 1.3vmin;
  font-weight: 600;
  margin-bottom: 5px;
`;

const RecmderImgWrapper = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
`;

const BookApplist = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.3rem;
  border: 1px solid red;
`;

const BookCover = styled.img`
  height: 15vmin;
  width: auto;
`;

const Avatar = styled.img`
  border-radius: 50%;
  height: 5vmin;
  width: 5vmin;
  margin-right: 1vmin;
`;

const Recmder = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
`;

const Container = styled.div`
  width: 50%;
  display: flex;
  padding: 0px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-right: 120px;
  max-width: 80%;
  outline: none;

  /* overflow-y: auto; */
`;
// 多欄會破版
const MainCtn = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  width: 70%;
  height: 500px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: rgb(255, 255, 255);
  /* background-color: red; */
  padding: 10px;
  overflow-y: auto;
  scroll-behavior: smooth;
`;

const Sider = styled.div`
  max-width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: rgb(255 234 182);
  padding: 10px;
`;
