import React from "react";
import { useState, useEffect, useRef } from "react";
import RichTextEditor from "../../components/RichTextEditor";
import { getMilestone, editArticles, postArticles } from "../../utils/firebase";
import Select from "react-select";
import Switch from "../../components/Switch";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { DisappearedLoading } from "react-loadingg";
import { uploadPicture } from "../../utils/common";
import {
  successAlert,
  warningAlert,
  errorAlert,
  textAlert,
} from "../../utils/alert";
import {
  ContainerStyled,
  MainContainer,
  SideSetting,
  LabelCtn,
  InputCtn,
  UploadBtn,
  SubmitBtn,
  SwitchCtn,
  SettingLb,
  PreViewCtn,
  EditorArea,
  SettingWrapper,
  Introduce,
  OriginLabel,
} from "./style/MilestoneEditor.style";

const MilestoneEditor = () => {
  const history = useHistory();
  const groupsList = useSelector((state) => state.groupsList);
  const userData = useSelector((state) => state.userData);
  const { milestoneID } = useParams();
  const pathname = useLocation().pathname;
  const [originContent, setOriginContent] = useState(null);
  const [title, setTitle] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [groupsName, setgroupsName] = useState("");
  const [selected, setSelected] = useState(null);
  const [check, setCheck] = useState(true);
  const [originLabel, setOriginLabel] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/sharemore-discovermore.appspot.com/o/web-default%2Fdefault.jpg?alt=media&token=da2e2f35-7239-4961-94bb-89af13aaca66"
  );
  const editMode = useRef(false);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (pathname.includes("edit") && userData === null) history.push("/");
      if (milestoneID && userData !== null) {
        editMode.current = true;
        getMilestone("articles", milestoneID).then((res) => {
          if (
            userData !== undefined &&
            groupsList.length > 0 &&
            Object.keys(userData).length > 0
          ) {
            if (res.creatorID !== userData.uid) history.push("/");
            setTitle(res.title);
            setIntroduce(res.introduce);
            setOriginLabel(
              groupsList.find((item) => item.groupID === res.groupID).name
            );
            setSelected(res.groupID);
            setValue(res.content);
            setCheck(res.public);
            setOriginContent(res);
            setPreviewUrl(res.coverImage);
            setIsLoading(false);
            editMode.current = true;
            setIsLoading(false);
          }
        });
      }

      if (groupsList.length > 0 && userData) {
        const myGroups = groupsList.filter((g) =>
          g.membersList?.includes(userData.uid)
        );
        const myCreateGroups = groupsList.filter(
          (g) => g.creatorID === userData.uid
        );

        const groupOpt = [...myGroups, ...myCreateGroups].map((g) => {
          return { value: g.groupID, label: g.name };
        });

        if (groupOpt.length === 0) {
          textAlert("????????????????????????????????????????????????????????????????????????");
          history.push("/");
        }
        setgroupsName(groupOpt);
        setIsLoading(false);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [userData, groupsList]);

  const editorHandler = (e) => {
    setValue(e);
  };

  const handleSubmit = () => {
    if (userData === null) {
      warningAlert("??????????????????????????????");
      return;
    }

    if (value.length === 0 || introduce.length === 0) {
      errorAlert("?????????????????????!");
      return;
    }

    if (selected === null) {
      errorAlert("?????????????????????!");
      return;
    }

    if (editMode.current) {
      const data = {
        coverImage: originContent.coverImage,
        content: value,
        groupID: selected,
        public: check,
        title,
        introduce,
      };

      editArticles(data, file, milestoneID, originContent.coverImage).then(
        () => {
          successAlert("????????????");
          history.push(`/article/${milestoneID}`);
        }
      );
    } else {
      const data = {
        creatorID: userData.uid,
        content: value,
        groupID: selected,
        public: check,
        creationTime: new Date(),
        title,
        introduce,
      };

      postArticles(data, file).then((res) => {
        successAlert("????????????");
        history.push(`/article/${res}`);
      });
    }
  };

  const previewImg = file ? URL.createObjectURL(file) : previewUrl;
  if (userData === undefined || isLoading) {
    return <DisappearedLoading />;
  } else if (!isLoading)
    return (
      <ContainerStyled>
        <MainContainer>
          <LabelCtn>????????????????????????</LabelCtn>
          <InputCtn
            placeholder="???????????????..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <EditorArea>
            <RichTextEditor value={value} editorHandler={editorHandler} />
          </EditorArea>
        </MainContainer>
        <SideSetting>
          <SettingLb> ????????????</SettingLb>
          <SettingWrapper>
            <SwitchCtn>
              <div>????????????</div>
              <Switch check={check} setCheck={setCheck} />
            </SwitchCtn>
            {editMode.current && (
              <OriginLabel>?????????????????????{originLabel}</OriginLabel>
            )}
            <Select
              defaultValue={selected}
              onChange={(e) => {
                setSelected(e.value);
              }}
              options={groupsName}
            />
            <Introduce
              value={introduce}
              placeholder="?????????????????????"
              onChange={(e) => setIntroduce(e.target.value)}
            />
            <input
              type="file"
              id="upload-img"
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => {
                uploadPicture(e, setFile);
              }}
            />
            <UploadBtn htmlFor="upload-img">
              <PreViewCtn src={previewImg} />
            </UploadBtn>
          </SettingWrapper>
          <SubmitBtn onClick={handleSubmit}>????????????</SubmitBtn>
        </SideSetting>
      </ContainerStyled>
    );
};

export default MilestoneEditor;
