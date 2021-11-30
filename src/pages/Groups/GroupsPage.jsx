import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { DisappearedLoading } from "react-loadingg";
import {
  MainCtn,
  Wrapper,
  ListStyle,
  SubList,
  ContentCtn,
  Side,
  TopCtn,
  MoreLink,
  Empty,
  SearchWrapper,
  SearchIcon,
  SContainer,
  SubmitBtn,
  SearchBarInput,
} from "./style/GroupsPage.style";
import GroupsCard from "../Home/components/GroupsCard";

const GroupsPage = () => {
  const groupsList = useSelector((state) => state.groupsList);
  const categoryList = useSelector((state) => state.categoryList);
  const userData = useSelector((state) => state.userData);
  const [isLoading, setIsLoading] = useState(true);
  const [subClassesName, setSubClassesName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [renderGroups, setRenderGroups] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchLoading(true);
      const keyWord = e.target.value.trim();
      const search = groupsList.filter((g) => g.name.includes(keyWord));
      setSearchLoading(false);
      setRenderGroups(search);
    }
  };

  const handleSearchBtn = () => {
    setSearchLoading(true);
    const keyWord = inputValue.trim();
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
  };

  const handleCategory = (e) => {
    const target = e.target.innerText;
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
    if (groupsList.length > 0) {
      setRenderGroups(groupsList);
      setIsLoading(false);
    }
  }, [groupsList]);

  if (userData === undefined || isLoading) {
    return <DisappearedLoading />;
  } else if (!isLoading)
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
