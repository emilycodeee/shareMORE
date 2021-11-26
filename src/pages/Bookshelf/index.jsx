import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { BsBookHalf } from "react-icons/bs";
import { JumpCircleLoading } from "react-loadingg";
import { DisappearedLoading } from "react-loadingg";
import SearchBook from "./component/SearchBook";
import { getGroupBook } from "../../utils/firebase";
import BookContent from "./component/BookContent";
import BookItem from "./component/BookItem";
import {
  Wrapper,
  PageShield,
  SerchButton,
  Empty,
  ShelfWrapper,
} from "./style/Index.style";

const Bookshelf = () => {
  const { groupID } = useParams();
  const history = useHistory();
  const userData = useSelector((state) => state.userData);
  const groupsList = useSelector((state) => state.groupsList);
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [bookContent, setBookContent] = useState({});
  const [showBookContent, setShowBookContent] = useState(false);
  const [renderBookData, setRenderBookData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInsider, setIsInsider] = useState(null);
  const [isOwner, setIsOwner] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (groupsList.length > 0) {
        const checkGroup = groupsList.findIndex((g) => g.groupID === groupID);
        if (checkGroup < 0) {
          history.push("/404");
        } else {
          const groupDetail = groupsList.find((g) => g.groupID === groupID);
          const checkMembership =
            groupDetail?.membersList?.includes(userData?.uid) ||
            groupDetail?.creatorID === userData?.uid;
          setIsInsider(checkMembership);

          const groupOwner = groupDetail?.creatorID === userData?.uid;
          setIsOwner(groupOwner);
          setIsLoading(false);
        }
      }
    }
    return () => {
      isMounted = false;
    };
  }, [groupsList]);

  useEffect(() => {
    const unsubscribe = getGroupBook(groupID, setRenderBookData);
    return () => {
      unsubscribe();
    };
  }, []);

  if (userData === undefined || isLoading) {
    return <DisappearedLoading />;
  } else if (!isLoading)
    return (
      <>
        <Wrapper>
          {isLoading && <JumpCircleLoading />}
          {isInsider && (
            <SerchButton
              onClick={() => {
                setShowSearchPage(true);
              }}
            >
              推薦選書
              <BsBookHalf />
            </SerchButton>
          )}

          {showSearchPage && (
            <PageShield
              data-target="shield"
              onClick={(e) => {
                e.target.dataset.target === "shield" &&
                  setShowSearchPage(!showSearchPage);
              }}
            >
              <SearchBook />
            </PageShield>
          )}
          {renderBookData.length === 0 && (
            <>
              <Empty>
                <div>
                  社團書櫃空空的
                  {isInsider && `，一起建立我們的社團書櫃！`}
                </div>
                <lottie-player
                  src="https://assets5.lottiefiles.com/packages/lf20_tnrzlN.json"
                  background="transparent"
                  speed="1"
                  style={{ maxWidth: "300px", maxHeight: "300px" }}
                  loop
                  autoplay
                />
              </Empty>
            </>
          )}

          <ShelfWrapper>
            {renderBookData.map((b) => {
              return (
                <BookItem
                  book={b}
                  groupID={groupID}
                  key={b.groupBookID}
                  isOwner={isOwner}
                  setShowBookContent={setShowBookContent}
                  setBookContent={setBookContent}
                />
              );
            })}
          </ShelfWrapper>

          {showBookContent && (
            <PageShield
              data-target="shield-content"
              onClick={(e) => {
                e.target.dataset.target === "shield-content" &&
                  setShowBookContent(!showBookContent);
              }}
            >
              <BookContent
                bookContent={bookContent}
                setShowBookContent={setShowBookContent}
              />
            </PageShield>
          )}
        </Wrapper>
      </>
    );
};

export default Bookshelf;
