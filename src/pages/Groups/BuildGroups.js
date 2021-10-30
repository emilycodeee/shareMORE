import React from "react";
import SimpleEditor from "../../components/SimpleEditor";
import Select from "react-select";
import { useState, useEffect } from "react";
import styled from "styled-components";
import * as firebase from "../../utils/firebase";
import { useHistory } from "react-router-dom";
import { initText } from "../../utils/commonText";
import { useSelector, useDispatch } from "react-redux";
import { getGroupsList } from "../../redux/actions";
const MainContainer = styled.div`
  border-radius: 20px;
  border: 1px solid #3e2914;
  display: flex;
  flex-direction: column;

  margin: 3rem 5rem;
  padding: 3rem 5rem;
`;

const LabelCtn = styled.label`
  font-size: 1.1rem;
  font-weight: 550;
  margin-right: 10px;
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  margin-left: 1rem;
`;

const Field = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  justify-content: end;
`;

const InputCtn = styled.input`
  flex-grow: 1;
  resize: none;
  height: 2rem;
  border-radius: 10px;
  padding: 3px 10px;
  font-size: 1.2rem;
  border: 1px solid #b5b2b0;
`;

const TextareaCtn = styled.textarea`
  flex-grow: 1;
  border-radius: 10px;
  border: 1px solid #b5b2b0;
  padding: 10px;
`;

const EditArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Slogan = styled.div`
  align-self: center;
  font-weight: 550;
  font-size: 2rem;
  margin-bottom: 3rem;
`;

const UploadBtn = styled.label`
  background-color: black;
  color: white;
  padding: 1rem;
  width: 10rem;
  align-self: end;
  text-align: center;
`;

const ImgField = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
  padding: 10px;
`;

const SubmitBtn = styled.button`
  padding: 10px;
`;

const BuildGroups = () => {
  const d = useDispatch();
  const history = useHistory();
  const categoryList = useSelector((state) => state.categoryList);
  const userData = useSelector((state) => state.userData);

  const CategoryOpt = categoryList.map((item) => {
    return { value: item.name, label: item.name };
  });
  console.log(categoryList);
  // arr.push({ value: doc.data().name, label: doc.data().name });

  // const subCategoryObj = categoryList.find((item) => item.name === "商業管理");
  // console.log(subCategoryObj);

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
    const subCategoryObj = categoryList.find(
      (item) => item.name === selectedCategory
    );
    // console.log(subCategoryObj);
    const subCategoryOpt = subCategoryObj?.subClasses.map((item) => {
      return { value: item, label: item };
    });
    setSubClassesName(subCategoryOpt);
    // subClasses;
    //  console.log();
    // firebase
    //   .getQueryFilter("categories", "name", selectedCategory)
    //   .then((res) => setSubClassesName(res))
    //   .catch((err) => console.log(err));
  }, [selectedCategory]);

  const previewImg = file
    ? URL.createObjectURL(file)
    : "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image.jpg";

  const handleSubmit = () => {
    if (goal.length === 0 || name.length === 0 || goalDate.length === 0) {
      alert("請填寫完整資訊");
      return;
    }

    if (selectedCategory === null || selectedSubClass === null) {
      alert("請填選社群類別");
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
    firebase.createGroup(data, file).then(() => {
      firebase
        .getTotalDocList("groups")
        .then((res) => d(getGroupsList(res)))
        .catch((err) => console.log(err));
      alert("新社團建立成功");
      history.push("/");
    });
  };

  return (
    <div>
      <MainContainer>
        <Slogan>shareMore。一起，走得更遠</Slogan>
        <Field>
          <LabelWrapper>
            <LabelCtn>主題類別</LabelCtn>
            <Select
              defaultValue={selectedCategory}
              onChange={(e) => {
                console.log(e);
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
                console.log(e);
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
            style={{ display: "none" }}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <img src={previewImg} style={{ width: "300px" }} />
          <UploadBtn htmlFor="upload-img">上傳封面圖片</UploadBtn>
        </ImgField>
        <SubmitBtn onClick={handleSubmit}>確認送出</SubmitBtn>
      </MainContainer>
    </div>
  );
};

export default BuildGroups;
