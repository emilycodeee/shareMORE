import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation, useParams, useRouteMatch } from "react-router-dom";
import ApplicationPopup from "./ApplicationPopup";
import { useState } from "react";
import * as firebase from "../../../utils/firebase";
import { useSelector } from "react-redux";
import { BsFillFolderFill, BsPencilSquare, BsCheckLg } from "react-icons/bs";
import { AiOutlineTrophy } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { BsMailbox } from "react-icons/bs";
import camera from "../../../sources/camera.png";
import checked from "../../../sources/checked.png";
import { ImBooks } from "react-icons/im";

const GroupHeader = ({ tag }) => {
  const { groupID } = useParams();
  const { path, url } = useRouteMatch();
  const userData = useSelector((state) => state.userData);
  const usersList = useSelector((state) => state.usersList);
  const groupsList = useSelector((state) => state.groupsList);
  const [actEditImage, setActEditImage] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [applicationData, setApplicationData] = useState({});
  const [appliedData, setAppliedData] = useState("");
  const [imageCover, setImageCover] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [actEdit, setActEdit] = useState(false);
  const [groupOwner, setGroupOwner] = useState({});
  const [content, setContent] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      firebase.getTotalApplicationList(groupID, setApplicationData);
      // firebase.getBookApplication(groupID, setBookListData);
      const currentGroupData = groupsList?.find((g) => g.groupID === groupID);

      if (currentGroupData) {
        setTitleValue(currentGroupData?.name);
        setContent(currentGroupData);
        setImageCover(currentGroupData.coverImage);
        const owner = usersList.find(
          (p) => p.uid === currentGroupData.creatorID
        );
        setGroupOwner(owner);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [groupsList]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      const data = applicationData.data?.find(
        (each) => each.applicantID === userData?.uid
      );
      if (data) {
        setAppliedData(data);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [applicationData]);
  console.log(applicationData);

  const root = window.location.host;
  const pathname = useLocation().pathname;

  const handleSubmitImg = () => {
    setActEditImage(!actEditImage);
    firebase.editGroupImage(file, content.groupID).then(() =>
      Swal.fire({
        position: "center",
        icon: "success",
        title: "修改成功！",
        showConfirmButton: false,
        timer: 1500,
      })
    );
  };

  const handleApplicationBtn = () => {
    if (userData === null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "請先登入或加入會員",
      });
      return;
    }
    setShowApplication(!showApplication);
  };

  const previewImg = file ? URL.createObjectURL(file) : imageCover;

  let checkMember, checkOwner, checkGeneralMember;

  const checkStatus = () => {
    let isMounted = true;

    if (isMounted) {
      checkMember =
        (userData !== null && content?.membersList?.includes(userData?.uid)) ||
        content?.creatorID === userData?.uid;
      checkOwner = content?.creatorID === userData?.uid;
      checkGeneralMember =
        userData !== null && content?.membersList?.includes(userData?.uid);
    }

    return () => {
      isMounted = false;
    };
  };
  checkStatus();

  const submitTitle = () => {
    setActEdit(false);
    const data = {
      name: titleValue,
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

  if (showApplication) {
    return (
      <Shield
        data-target="shield"
        onClick={(e) => {
          e.target.dataset.target === "shield" &&
            setShowApplication(!showApplication);
        }}
      >
        <ApplicationPopup
          appliedData={appliedData}
          groupData={content}
          applicationData={applicationData}
        />
      </Shield>
    );
  }
  return (
    // <>
    <>
      <ImgWrapper>
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
          <CameraIcon>
            <DivCtn as="label" htmlFor="uploadImg">
              <EditImage src={camera} />
            </DivCtn>
          </CameraIcon>
        )}
        {checkOwner && actEditImage && (
          <SaveImage src={checked} onClick={handleSubmitImg} />
        )}
      </ImgWrapper>
      <WelcomeToggle>
        <ShareStyled
          onClick={() => {
            navigator.clipboard.writeText(root + pathname);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "成功複製連結！",
              showConfirmButton: false,
              timer: 1500,
            });
          }}
        >
          <ShareIcon />
        </ShareStyled>
        {content?.creatorID === userData?.uid && (
          <>
            <LiStyled
              setShowApplication={setShowApplication}
              onClick={() => {
                setShowApplication(!showApplication);
              }}
            >
              {`待審申請 ${applicationData?.count} 則`}
            </LiStyled>
          </>
        )}
        {!checkGeneralMember && !checkOwner && (
          <LiStyled onClick={handleApplicationBtn}>
            {appliedData ? "等候審核" : "申請加入"}
          </LiStyled>
        )}
      </WelcomeToggle>
      <Wrapper>
        <TitleBar>
          {!actEdit && (
            <NameLogo to={`/group/${groupID}`}>{titleValue}</NameLogo>
          )}
          {actEdit && (
            <NameInput
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              actEdit={actEdit}
            />
          )}
          {checkOwner && !actEdit && (
            <EditIcon
              onClick={() => {
                setActEdit(!actEdit);
              }}
            />
          )}
          {checkOwner && actEdit && <SubmitIcon onClick={submitTitle} />}
        </TitleBar>

        <UlStyled>
          <LinkStyled
            to={`/group/${groupID}/bookshelf`}
            tag={(tag === "bookShelf").toString()}
          >
            <Bookshelf />
            <span>社團書櫃</span>
          </LinkStyled>
          {checkMember && (
            <>
              <LinkStyled
                to={`/group/${groupID}/articles`}
                tag={(tag === "milestone").toString()}
              >
                <Miles />
                <span> 成果分享</span>
              </LinkStyled>
              <LinkStyled
                to={`/group/${groupID}/notes`}
                tag={(tag === "note").toString()}
              >
                <Folder />
                <span>社團筆記</span>
              </LinkStyled>
            </>
          )}
        </UlStyled>
      </Wrapper>
    </>
  );
};
// };

export default GroupHeader;

const FolderIcon = {
  width: "1.2rem",
  height: " 1.2rem",
  color: "white",
};

const Bookshelf = styled(ImBooks)`
  ${FolderIcon}
  width: 1.3rem;
  height: 1.3rem;
  @media only screen and (max-width: 992px) {
    width: 1rem;
    height: 1rem;
  }
  @media only screen and (max-width: 500px) {
    width: 0.8rem;
    height: 0.8rem;
  }
`;

const Miles = styled(AiOutlineTrophy)`
  ${FolderIcon}
  width: 1.3rem;
  height: 1.3rem;
  @media only screen and (max-width: 992px) {
    width: 1rem;
    height: 1rem;
  }
  @media only screen and (max-width: 500px) {
    width: 0.8rem;
    height: 0.8rem;
  }
`;

const Folder = styled(BsFillFolderFill)`
  ${FolderIcon}
  @media only screen and (max-width: 992px) {
    width: 1rem;
    height: 1rem;
  }
  @media only screen and (max-width: 500px) {
    width: 0.8rem;
    height: 0.8rem;
  }
`;

const Mailbox = styled(BsMailbox)`
  ${FolderIcon}
  @media only screen and (max-width: 992px) {
    width: 1rem;
    height: 1rem;
  }
  @media only screen and (max-width: 500px) {
    width: 0.8rem;
    height: 0.8rem;
  }
`;

const SaveImage = styled.img`
  margin-right: 5px;
  position: absolute;
  width: 2rem;
  height: 2rem;
  bottom: -20px;
  right: 0;
  cursor: pointer;
`;

const TopCover = styled.div`
  opacity: 0.9;
  width: 100%;
  height: 30vw;
  background-size: cover;
  background-position: center;
`;

const EditImage = styled.img`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  margin-right: 5px;
`;

const DivCtn = styled.div`
  position: absolute;
  bottom: -20px;
  right: 0;
`;

const CameraIcon = styled.div``;

const ImgWrapper = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: 2rem;
  max-width: 1560px;
  width: 80%;
  margin-bottom: -1px;
  display: flex;
  justify-content: space-between;
`;

const AvatarImg = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  box-shadow: 0px 2px 6px grey;
`;

const NameLogo = styled(Link)`
  text-decoration: none;
  font-weight: 550;
  font-size: 2rem;
  outline: none;
  width: auto;
  margin-bottom: 0.5rem;
  color: black;
  @media only screen and (max-width: 992px) {
    font-size: 1.8rem;
  }
  @media only screen and (max-width: 500px) {
    font-size: 1.5rem;
  }
`;
const NameInput = styled.input`
  font-weight: 550;
  font-size: 2rem;
  outline: none;
  width: 60%;
  background-color: transparent;
  @media only screen and (max-width: 992px) {
    font-size: 1.8rem;
  }
  @media only screen and (max-width: 500px) {
    font-size: 1.5rem;
  }
`;

const UlStyled = styled.ul`
  display: flex;
  align-items: flex-end;
  position: relative;
  padding-bottom: 0;
  gap: 15px;
  @media only screen and (max-width: 992px) {
    gap: 5px;
  }
  @media only screen and (max-width: 500px) {
    gap: 3px;
  }
`;

const WelcomeToggle = styled.div`
  width: 80%;
  max-width: 1560px;
  margin: 0 auto;
  display: flex;
  margin-top: 1rem;
  justify-content: flex-end;
  gap: 20px;
`;

const LiStyled = styled.div`
  display: flex;
  border-radius: 4px;
  padding: 0.3rem 0.4rem;
  border: 1px solid #f27e59;
  list-style: none;
  font-weight: 600;
  font-size: 1rem;
  height: auto;
  text-decoration: none;
  cursor: pointer;
  color: #f27e59;
  &:hover {
    background-color: #f27e59;
    color: white;
  }
`;

const ShareStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: #f27e59;
  }
`;

const LinkStyled = styled(Link)`
  color: #ffffff;
  text-align: center;
  font-weight: 600;
  text-decoration: none;
  font-size: 1rem;
  display: inline-block;
  background: ${(props) =>
    props.tag === "true" ? "#f27e59" : "rgb(255 193 174)"};
  padding: 0.5rem 1rem;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom: none;
  white-space: nowrap;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 3px;
  &:hover {
    background-color: #f27e59;
  }
  @media only screen and (max-width: 992px) {
    span {
      display: none;
    }
  }
  @media only screen and (max-width: 500px) {
    padding: 0.5rem 1rem;
  }
`;

const LinkAvatar = styled(Link)`
  padding: 0;
  height: auto;
  display: inline-block;
  margin-right: 1rem;
`;

const Shield = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  position: fixed;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.8);
`;

const EditIcon = styled(BsPencilSquare)`
  cursor: pointer;
  margin-left: 1rem;
  height: 1rem;
  width: 1rem;
`;
const ShareIcon = styled(FiShare2)`
  cursor: pointer;
  margin-left: 1rem;
  height: 1rem;
  width: 1rem;
  color: #f27e59;
`;

const SubmitIcon = styled(BsCheckLg)`
  cursor: pointer;
  margin-left: 1rem;
  height: 1rem;
  width: 1rem;
`;

const TitleBar = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
`;
