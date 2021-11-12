import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import GroupsCard from "../Home/components/GroupsCard";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Animated } from "react-animated-css";
import algolia from "../../utils/algolia";
// import algoliasearch from "algoliasearch";

const MainCtn = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
`;

const Wrapper = styled.div`
  display: grid;
  width: 80%;
  padding: 1em;
  align-items: flex-start;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 1.2rem;
  grid-row-gap: 1.2rem;
  margin: 0 auto;
  /* border: 1px solid red; */

  @media only screen and (max-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media only screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ListStyle = styled.li`
  display: flex;
  justify-content: center;
  cursor: pointer;
  /* text-decoration: none; */
  list-style: none;
  font-weight: 600;
  /* margin: 1rem 0; */
  font-size: 1.2rem;
  padding: 0.6rem 0;
`;

const SubList = styled.li`
  display: ${(props) => (props.active === props.category ? "block" : "none")};
  cursor: pointer;
  list-style: none;
  /* display: flex; */
  /* justify-content: center; */
  font-weight: 500;
  font-size: 1rem;
  padding: 0.4rem 0;
  margin-bottom: 0.5rem;
  text-align: center;
  /* margin: 0 auto; */
`;

const ContentCtn = styled.div`
  display: flex;
`;

const Search = styled.input`
  width: 70%;
  height: 1.8rem;
  border-radius: 25px;
  box-shadow: none;
  border: 1px solid rgb(204, 204, 204);
  padding: 4px 0px 4px 50px;
  font-size: 18px;
  margin: 2rem 0;
`;

const Side = styled.div`
  width: 20%;
`;

const TopCtn = styled.div`
  display: flex;
  justify-content: center;
`;

const TopBtn = styled.div`
  /* flex-grow: 1; */
  align-self: center;
  text-align: center;
  width: 8%;
  padding: 1% 0;
  margin-left: 1rem;
  border-radius: 25px;
  background-color: #f5f5f5;
  box-shadow: rgb(0 0 0 / 10%) 0px 2px 6px;
  cursor: pointer;
`;

const GroupsPage = () => {
  const groupsList = useSelector((state) => state.groupsList);
  const categoryList = useSelector((state) => state.categoryList);
  const [active, setActive] = useState(false);
  const [subClassesName, setSubClassesName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubClass, setSelectedSubClass] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [renderGroups, setRenderGroups] = useState([]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const keyWord = e.target.value;
      const search = groupsList.filter((g) => g.name.includes(keyWord));
      setRenderGroups(search);
      // algolia.search(e.target.value).then((result) => {
      //   console.log(result.hits);
      // });
    }
  };

  const handleSearchBtn = (e) => {
    const keyWord = inputValue;
    console.log(keyWord);
    const search = groupsList.filter((g) => g.name.includes(keyWord));
    setRenderGroups(search);
    // algolia.search(e.target.value).then((result) => {
    //   console.log(result.hits);
    // });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      setRenderGroups(groupsList);
    }
  };

  const handleSubCategory = (e) => {
    const target = e.target.innerText;
    const filterCategory = groupsList.filter((g) => g.subClass === target);
    setRenderGroups(filterCategory);
    // console.log(target);
  };

  const handleCategory = (e) => {
    const target = e.target.innerText;
    console.log(target);
    if (target === "全部") {
      setRenderGroups(groupsList);
    } else {
      const filterCategory = groupsList.filter((g) => g.category === target);
      setRenderGroups(filterCategory);
      setSubClassesName(target);
    }
  };

  useEffect(() => {
    setRenderGroups(groupsList);
  }, [groupsList]);

  return (
    <MainCtn>
      <TopCtn>
        <Search
          placeholder="請輸入社群名稱..."
          value={inputValue}
          onKeyPress={handleSearch}
          onChange={handleInputChange}
        />
        {/* <TopBtn>最新發起</TopBtn> */}
        <TopBtn onClick={handleSearchBtn}>搜尋</TopBtn>
      </TopCtn>
      <ContentCtn>
        <Side>
          <ListStyle key={"all"} onClick={handleCategory}>
            全部
          </ListStyle>

          {categoryList.map((item, i) => (
            <div key={i}>
              <ListStyle onClick={handleCategory}>{item.name}</ListStyle>
              {item.subClasses.map((sitem, i) => (
                <SubList
                  key={i}
                  category={item.name}
                  active={subClassesName}
                  onClick={handleSubCategory}
                >
                  {sitem}
                </SubList>
              ))}
            </div>
          ))}
        </Side>

        <Wrapper>
          {renderGroups.map((item) => {
            return <GroupsCard item={item} key={item.groupID} />;
          })}
        </Wrapper>
      </ContentCtn>
    </MainCtn>
  );
};

export default GroupsPage;
