import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import GroupsCard from "../Home/components/GroupsCard";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Animated } from "react-animated-css";
import algolia from "../../utils/algolia";
import { BiSearchAlt2, BiUndo, BiX } from "react-icons/bi";
import { Link } from "react-router-dom";

const MainCtn = styled.div`
  max-width: 1560px;
  width: 80%;
  padding: 1rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 992px) {
    width: 90%;
    padding: 0;
  }
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
  @media only screen and (max-width: 500px) {
    font-size: 1rem;
  }
`;

const SubList = styled.li`
  display: ${(props) => (props.active === props.category ? "block" : "none")};
  cursor: pointer;
  list-style: none;
  /* display: flex; */
  /* justify-content: center; */
  color: gray;
  font-weight: 550;
  font-size: 1rem;
  padding: 0.4rem 0;
  margin-bottom: 0.5rem;
  text-align: center;
  /* margin: 0 auto; */
`;

const ContentCtn = styled.div`
  display: flex;
  /* padding: 0 1rem; */
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
  word-wrap: none;
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
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchLoading(true);
      const keyWord = e.target.value.trim();
      console.log(keyWord.trim());
      const search = groupsList.filter((g) => g.name.includes(keyWord));
      setSearchLoading(false);
      setRenderGroups(search);
    }
  };

  const handleSearchBtn = (e) => {
    setSearchLoading(true);
    const keyWord = inputValue.trim();
    console.log(keyWord);
    const search = groupsList.filter((g) => g.name.includes(keyWord));
    setSearchLoading(false);
    setRenderGroups(search);
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
      setSubClassesName("");
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
        <SearchWrapper>
          <SContainer>
            <SearchBarInput
              placeholder="請輸入社群名稱..."
              value={inputValue}
              onKeyPress={handleSearch}
              onChange={handleInputChange}
            />
            <SubmitBtn onClick={handleSearchBtn}>
              <SearchIcon />
            </SubmitBtn>
          </SContainer>
        </SearchWrapper>
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
        {searchLoading && (
          <Empty>
            <lottie-player
              src="https://assets6.lottiefiles.com/packages/lf20_aj9jghqr.json"
              background="transparent"
              speed="1"
              style={{ maxWidth: "300px", maxHeight: "300px" }}
              loop
              autoplay
            />
          </Empty>
        )}
        {!searchLoading && renderGroups.length === 0 ? (
          <>
            <Empty>
              <div>
                目前找不到相關社團，就由你來
                <MoreLink to="/groups/post">建立第一個</MoreLink>
                吧！
              </div>
              <lottie-player
                src="https://assets6.lottiefiles.com/private_files/lf30_bn5winlb.json"
                background="transparent"
                speed="1"
                style={{ maxWidth: "300px", maxHeight: "300px" }}
                loop
                autoplay
              />
            </Empty>
          </>
        ) : (
          <Wrapper>
            {renderGroups.map((item) => {
              return <GroupsCard item={item} key={item.groupID} />;
            })}
          </Wrapper>
        )}
      </ContentCtn>
    </MainCtn>
  );
};

export default GroupsPage;

const MoreLink = styled(Link)`
  text-decoration: none;
  font-weight: 700;
`;

const Empty = styled.div`
  /* background-color: red; */
  width: 80%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 0 10px;
  /* gap: 1rem; */
  div {
    margin-top: 1rem;
    font-weight: 600;
    color: rgb(242, 126, 89);
  }
  @media only screen and (max-width: 500px) {
    font-size: 0.8rem;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #f27e59;
  margin: 1rem;
  width: 100%;
`;

const SearchIcon = styled(BiSearchAlt2)`
  width: 2rem;
  height: 2rem;
`;

const SContainer = styled.div`
  border: 2px solid #f27e59;
  display: flex;
  justify-content: flex-end;
  border-radius: 100px;
  overflow: hidden;
  font-size: 1.25em;
  position: relative;
  width: 60px;
  height: 60px;
  // margin-left: auto;
  transition: width 450ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
  padding: 3px;

  &:focus-within {
    // box-shadow: 0 0 5px var(--clr-primary);
    width: 100%;

    input {
      opacity: 1;
      z-index: initial;
      cursor: initial;
      width: calc(100% - 60px);
    }

    button {
      background: #f27e59;
      color: white;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
      // transition: transform 500ms ease-out;

      &:hover,
      &:focus {
        outline: 0;
        // transform: rotate(1turn);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.65);
      }
    }
  }
`;

const SubmitBtn = styled.button`
  font-size: 1.5rem;
  margin-left: auto;
  background: 0;
  border: 0;
  cursor: pointer;
  border-radius: 50%;
  transition: background 200ms ease-out;
  width: calc(60px - 10px);
  height: calc(60px - 10px);
  color: black;
`;

const SearchBarInput = styled.input`
  border: 0;
  padding: 0.25em 1em;
  flex-grow: 1;
  outline: 0;
  z-index: 2;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background: transparent;
  opacity: 0;
  cursor: pointer;
`;

const Container = styled.div`
  width: 350px;
  margin: 60px auto;
  text-align: center;
  color: white;
`;

const Search2 = styled.div`
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 80px;
  height: 80px;
  background: crimson;
  border-radius: 50%;
  transition: all 1s;
  z-index: 4;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.4);
  // box-shadow: 0 0 25px 0 crimson;
  &:hover {
    cursor: pointer;
  }
  &::before {
    content: "";
    position: absolute;
    margin: auto;
    top: 22px;
    right: 0;
    bottom: 0;
    left: 22px;
    width: 12px;
    height: 2px;
    background: white;
    transform: rotate(45deg);
    transition: all 0.5s;
  }
  &::after {
    content: "";
    position: absolute;
    margin: auto;
    top: -5px;
    right: 0;
    bottom: 0;
    left: -5px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 2px solid white;
    transition: all 0.5s;
  }
`;

const SearchInput = styled.input`
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 50px;
  outline: none;
  border: none;
  // border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  background: crimson;
  color: white;
  text-shadow: 0 0 10px crimson;
  padding: 0 80px 0 20px;
  border-radius: 30px;
  box-shadow: 0 0 25px 0 crimson, 0 20px 25px 0 rgba(0, 0, 0, 0.2);
  // box-shadow: inset 0 0 25px 0 rgba(0, 0, 0, 0.5);
  transition: all 1s;
  opacity: 0;
  z-index: 5;
  font-weight: bolder;
  letter-spacing: 0.1em;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    width: 300px;
    opacity: 1;
    cursor: text;
  }
  &:focus ~ div {
    right: -250px;
    background: #151515;
    z-index: 6;
    &::before {
      top: 0;
      left: 0;
      width: 25px;
    }
    &::after {
      top: 0;
      left: 0;
      width: 25px;
      height: 2px;
      border: none;
      background: white;
      border-radius: 0%;
      transform: rotate(-45deg);
    }
  }
  &::placeholder {
    color: white;
    opacity: 0.5;
    font-weight: bolder;
  }
`;
