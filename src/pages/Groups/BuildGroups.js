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
import Swal from "sweetalert2/dist/sweetalert2.js";
import { DisappearedLoading } from "react-loadingg";
const MainContainer = styled.div`
  max-width: 1560px;
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 3rem;
  gap: 1rem;
`;

const LabelCtn = styled.label`
  font-size: 1.1rem;
  font-weight: 550;
  /* margin-right: 10px; */
  /* margin-bottom: 10px; */
  @media only screen and (max-width: 600px) {
    font-size: 0.8rem;
    margin-right: 0;
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  /* margin-left: 1rem; */
  @media only screen and (max-width: 600px) {
    flex-wrap: wrap;
    /* flex-direction: column; */
  }
`;

const Field = styled.div`
  display: flex;
  gap: 1rem;
  /* margin-bottom: 10px; */
  align-items: center;
  justify-content: end;
  width: 100%;
  @media only screen and (max-width: 500px) {
    gap: 0.8rem;
    /* flex-direction: column; */
  }
`;

const InputCtn = styled.input`
  flex-grow: 1;
  /* width: 80%; */
  border-radius: 4px;
  padding: 3px 10px;
  font-size: 1.2rem;
  border: 1px solid #b5b2b0;
`;

const TextareaCtn = styled.textarea`
  flex-grow: 1;
  border-radius: 4px;
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
  @media only screen and (max-width: 600px) {
    font-size: 1.2rem;
    /* flex-direction: column; */
  }
`;

const UploadBtn = styled.label`
  background-color: transparent;
  margin: 0 auto;
`;

const ImgField = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
  padding: 10px;
`;

const SubmitBtn = styled.button`
  border-radius: 4px;
  list-style: none;
  font-weight: 600;
  font-size: 1rem;
  height: auto;
  text-decoration: none;
  color: #f27e59;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin: 0 auto;
  margin-bottom: 2rem;
  border: none;
  padding: 0.6rem;
  cursor: pointer;
  border: 1px solid #f27e59;
  background-color: transparent;
  width: 100%;
  &:hover {
    background-color: #f27e59;
    color: white;
  }
`;

const BuildGroups = () => {
  const d = useDispatch();
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
  // const [isLoading, setIsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  //status
  const [name, setName] = useState("");
  const [goal, setGoal] = useState(initText);
  const [goalDate, setGoalDate] = useState("");
  const [introduce, setIntroduce] = useState("");

  // useEffect(() => {
  //   if (userData !== null) {
  //     setIsLoading(false);
  //   } else if (userData === null) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "請先登入或註冊會員！",
  //     });

  //   }
  // }, [userData]);

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
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "請先登入或註冊會員！",
      });
      return;
    }

    if (goal.length === 0 || name.length === 0 || goalDate.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "請填寫完整資訊",
      });

      // alert("請填寫完整資訊");
      return;
    }

    if (selectedCategory === null || selectedSubClass === null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "請填選社群類別",
      });
      // alert("請填選社群類別");
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
    firebase.createGroup(data, file).then((res) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "新社團建立成功",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push(`/group/${res}`);
    });
  };

  const today = new Date().toISOString().split("T")[0];
  // document.getElementsByName("somedate")[0].setAttribute("min", today);

  // if (isLoading) {
  //   return <DisappearedLoading />;
  // } else {
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
          style={{ display: "none" }}
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <UploadBtn htmlFor="upload-img">
          <PreViewCtn src={previewImg} style={{ width: "300px" }} />
        </UploadBtn>
      </ImgField>
      <SubmitBtn onClick={handleSubmit}>確認送出</SubmitBtn>
    </MainContainer>
  );
  // }
};

export default BuildGroups;

const PreViewCtn = styled.img`
  width: 100%;
  margin: 10px 0;
  cursor: pointer;
  @media only screen and (max-width: 992px) {
    width: 60%;
  }
  @media only screen and (max-width: 500px) {
    width: 100%;
  }
`;
