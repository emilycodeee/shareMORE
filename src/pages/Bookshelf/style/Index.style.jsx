import styled from "styled-components";

const Wrapper = styled.div`
  border-radius: 4px;
  max-width: 1560px;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  display: flex;
  background-color: #fff;
  padding: 1rem 0;
  flex-direction: column;
`;

const PageShield = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  position: fixed;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
`;

const SerchButton = styled.button`
  border-radius: 4px;
  list-style: none;
  font-weight: 600;
  font-size: 1rem;
  height: auto;
  text-decoration: none;
  cursor: pointer;
  color: #f27e59;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 20px;
  border: none;
  padding: 0.6rem;
  cursor: pointer;
  border: 1px solid #f27e59;
  background-color: transparent;
  &:hover {
    background-color: #f27e59;
    color: #fff;
  }
`;

const Empty = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  gap: 1rem;
  div {
    margin-top: 1rem;
    font-weight: 600;
    color: rgb(242, 126, 89);
  }
  @media only screen and (max-width: 500px) {
    font-size: 0.8rem;
  }
`;

const ShelfWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-row-gap: 1rem;
  grid-column-gap: 1rem;
  text-align: center;
  padding: 10px;
  @media only screen and (max-width: 1024px) {
    width: 80%;
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media only screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export { Wrapper, PageShield, SerchButton, Empty, ShelfWrapper };
