import styled from "styled-components";
import { Link } from "react-router-dom";
import { HiMenu, HiChevronDoubleRight } from "react-icons/hi";
import { MdLogout, MdOutlineNotificationsActive } from "react-icons/md";

const NotifiSet = styled.div`
  cursor: pointer;
  position: relative;
  width: 1.4rem;
  height: 1.4rem;
  margin: 0;
`;

const Count = styled.div`
  background-color: rgb(255 0 0);
  width: 15px;
  height: 15px;
  display: ${(props) => (props.count > 0 ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  font-size: 0.5rem;
  font-weight: 600;
  color: white;
  opacity: 0.9px;
  bottom: 10px;
  right: -4px;
`;

const Dot = styled.div`
  /* display: inline-block; */
  width: 10px;
  height: 10px;
  background-color: ${(props) => (props.status ? "#dbd3c6" : "#FCB643")};
  border-radius: 50%;
  margin-right: 5px;
`;

const NotiContent = styled.div`
  width: 95%;
`;

const TimeAgo = styled.div`
  color: gray;
  text-align: end;
`;

const NotificationsArea = styled.div`
  font-size: 0.9rem;
  position: absolute;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 20%;
  height: auto;
  right: 10px;
  z-index: 99;
  background-color: rgb(255 250 242);
  padding: 10px 0;
  overflow-y: auto;
  gap: 10px;
  box-shadow: 0px 2px 7px -3px rgb(132 131 126 / 20%);
  @media only screen and (max-width: 992px) {
    width: 40%;
  }
  @media only screen and (max-width: 400px) {
    width: 50%;
  }
`;

const NotifiDiv = styled.div`
  text-decoration: none;
  width: 100%;
  color: black;
  padding: 0 0.5rem;
  :hover {
    background-color: #ffae96;
  }
`;

const NotifiLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  color: black;
  padding: 0 0.5rem;
  :hover {
    background-color: #ffae96;
  }
  span {
    font-weight: 600;
  }
`;

const NotiWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ListContainer = styled.ul`
  display: flex;
  align-items: center;
  padding: 0 0 0 1rem;
  @media only screen and (max-width: 992px) {
    padding: 0;
  }
`;

const ListStyled = styled(Link)`
  font-weight: 600;
  margin-right: 1rem;
  list-style: none;
  text-decoration: none;
  font-size: 1rem;
  color: white;
  padding-bottom: 3px;
  border-bottom: 2px solid
    ${(props) => (props.active === props.children ? "white" : "none")};

  &:hover {
    border-bottom: 3px solid white;
  }

  &:nth-child(5) {
    border-bottom: none;
  }
  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

const LoginBtn = styled.button`
  color: #f27e59;
  margin-right: 20px;
  font-size: 1rem;
  padding: 0.3rem 1rem;
  cursor: pointer;
  font-weight: 550;
  border-radius: 2px;
  background-color: #ffebd7;
  transition: all 0.3s ease-in-out;
  border: none;
  text-decoration: none;
  &:hover {
    transform: translateY(-8px);
    color: #ff511d;
  }
`;

const LoginPage = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  position: fixed;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.8);
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1vw;
  max-width: 1560px;
  width: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  color: white;
  background-color: #f27e59;
  box-shadow: 0px -3px 16px -7px #ffffff;
  @media only screen and (max-width: 992px) {
    justify-content: space-between;
  }
`;

const LogoCtn = styled.img`
  max-width: 300px;
  @media only screen and (max-width: 992px) {
    max-width: 200px;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  right: 0;
  top: 42px;
  background-color: rgb(255 228 207);
  font-size: 1rem;
  z-index: 999999;
  top: 0px;
  bottom: 0px;
  min-width: 240px;
  width: 40%;
  gap: 10px;
  right: ${(props) => (props.toggleMobile ? "0%" : "-100%")};
  transition: right 0.3s ease 0s;
`;

const MLogo = styled.img`
  width: 200px;
  height: 40px;
  background-position: center;
`;

const MobileList = styled(Link)`
  text-decoration: none;
  color: #f27e59;
  font-weight: 600;
  cursor: pointer;
  height: 2rem;
  width: 100%;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:first-child {
    justify-content: start;
  }
  &:hover {
    color: white;
    background-color: #f27e59;
  }
`;

const MobileCtn = styled.div`
  text-decoration: none;
  color: rgb(17 17 17);
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
`;

const IconSet = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-bottom: 3px;
`;

const ImgCtn = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;
const iconStyle = {
  width: "1.4rem",
  height: "1.4rem",
  margin: "0.5rem 0 ",
  color: "#fff4e4",
};

const Close = styled(HiChevronDoubleRight)`
  ${iconStyle}
  margin-top:4rem;
  margin: 1rem;
  display: flex;
  justify-content: start;
  color: #f27e59;
`;

const Notifications = styled(MdOutlineNotificationsActive)`
  ${iconStyle}
  color:white;
  width: 1.6rem;
  height: 1.5rem;
  margin: 0;
  cursor: pointer;
`;

const LogoutBtn = styled(MdLogout)`
  ${iconStyle}
  cursor: pointer;
  color: white;
  @media only screen and (max-width: 992px) {
  }
`;

const MenuBurger = styled(HiMenu)`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  color: white;
  display: none;
  @media only screen and (max-width: 992px) {
    display: block;
  }
`;

export {
  NotifiSet,
  Count,
  Dot,
  NotificationsArea,
  NotifiDiv,
  NotifiLink,
  ListContainer,
  ListStyled,
  LoginBtn,
  LoginPage,
  InnerWrapper,
  HeaderContainer,
  LogoCtn,
  MobileMenu,
  MLogo,
  MobileList,
  MobileCtn,
  IconSet,
  ImgCtn,
  Close,
  Notifications,
  LogoutBtn,
  MenuBurger,
  NotiContent,
  TimeAgo,
  NotiWrap,
};
