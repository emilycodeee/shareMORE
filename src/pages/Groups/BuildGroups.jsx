import React from "react";
import SimpleEditor from "../../components/SimpleEditor";
import Select from "react-select";
import { useState, useEffect } from "react";
import { createGroup } from "../../utils/firebase";
import { useHistory } from "react-router-dom";
import { initText, uploadPicture } from "../../utils/common";
import { useSelector } from "react-redux";
import { errorAlert, successAlert, warningAlert } from "../../utils/alert";
import {
  MainContainer,
  LabelCtn,
  LabelWrapper,
  Field,
  ImgField,
  InputCtn,
  TextareaCtn,
  EditArea,
  Slogan,
  UploadBtn,
  SubmitBtn,
  PreViewCtn,
} from "./style/BuildGroups.style";

const BuildGroups = () => {
  const history = useHistory();
  const categoryList = useSelector((state) => state.categoryList);
  const userData = useSelector((state) => state.userData);

  const CategoryOpt = categoryList.map((item) => {
    return { value: item.name, label: item.name };
  });

  const [file, setFile] = useState(null);
  const [subClassesName, setSubClassesName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubClass, setSelectedSubClass] = useState(null);

  //status
  const [name, setName] = useState("");
  const [goal, setGoal] = useState(initText);
  const [goalDate, setGoalDate] = useState("");
  const [introduce, setIntroduce] = useState("");

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const subCategoryObj = categoryList.find(
        (item) => item.name === selectedCategory
      );
      const subCategoryOpt = subCategoryObj?.subClasses.map((item) => {
        return { value: item, label: item };
      });
      setSubClassesName(subCategoryOpt);
    }
    return () => {
      isMounted = false;
    };
  }, [selectedCategory]);

  const previewImg = file
    ? URL.createObjectURL(file)
    : "https://firebasestorage.googleapis.com/v0/b/sharemore-discovermore.appspot.com/o/web-default%2Fdefault.jpg?alt=media&token=da2e2f35-7239-4961-94bb-89af13aaca66";

  const handleSubmit = () => {
    if (userData === null) {
      warningAlert("請先登入或註冊會員！");
      return;
    }

    if (goal.length === 0 || name.length === 0 || goalDate.length === 0) {
      errorAlert("請填寫完整資訊");
      return;
    }

    if (selectedCategory === null || selectedSubClass === null) {
      errorAlert("請填選社群類別");
      return;
    }

    const data = {
      name,
      goal,
      goalDate,
      category: selectedCategory,
      subClass: selectedSubClass,
      creationTime: new Date(),
      introduce,
      creatorID: userData.uid,
      public: true,
    };
    createGroup(data, file).then((res) => {
      successAlert("新社團建立成功");
      history.push(`/group/${res}`);
    });
  };

  const today = new Date().toISOString().split("T")[0];
  return (
    <MainContainer>
      <Slogan>shareMore。一起，走得更遠</Slogan>
      <Field>
        <LabelWrapper>
          <LabelCtn>主題類別</LabelCtn>
          <Select
            defaultValue={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.value);
            }}
            options={CategoryOpt}
          />
        </LabelWrapper>
        <LabelWrapper>
          <LabelCtn>子類別</LabelCtn>
          <Select
            defaultValue={selectedSubClass}
            onChange={(e) => {
              setSelectedSubClass(e.value);
            }}
            options={subClassesName}
          />
        </LabelWrapper>
      </Field>

      <Field>
        <LabelCtn>社群名稱</LabelCtn>
        <InputCtn
          placeholder="為社群取個喜歡的名字吧"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </Field>
      <EditArea>
        <LabelCtn>學習目標</LabelCtn>
        <SimpleEditor goal={goal} setGoal={setGoal} />
      </EditArea>
      <Field>
        <LabelCtn>目標完成日</LabelCtn>
        <InputCtn
          type="date"
          min={today}
          onChange={(e) => {
            setGoalDate(e.target.value);
          }}
        />
      </Field>
      <Field>
        <LabelCtn>社群介紹</LabelCtn>
        <TextareaCtn
          style={{ minHeight: "100px" }}
          placeholder="我想這樣介紹這個社群......"
          value={introduce}
          onChange={(e) => {
            setIntroduce(e.target.value);
          }}
        />
      </Field>
      <ImgField>
        <InputCtn
          type="file"
          id="upload-img"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            uploadPicture(e, setFile);
          }}
        />
        <UploadBtn htmlFor="upload-img">
          <PreViewCtn src={previewImg} style={{ width: "300px" }} />
        </UploadBtn>
      </ImgField>
      <SubmitBtn onClick={handleSubmit}>確認送出</SubmitBtn>
    </MainContainer>
  );
};

export default BuildGroups;
