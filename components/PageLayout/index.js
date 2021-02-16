import styled from "styled-components";

const MAIN = styled.main`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 600px;

  @media only screen and (min-width: 1024px) {
    margin-bottom: 400px;
  }
`;

const COLUMNED_PAGE = styled.div`
  width: 100%;
  margin-top: 0;
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: auto 635px 45px 292px auto;
  }
  @media only screen and (min-width: 1280px) {
    grid-template-columns: auto 673px 38px 320px auto;
  }
`;

const PAGE_MAIN_COL = styled.div`
  width: calc(100% - 40px);
  padding: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media only screen and (min-width: 1024px) {
    width: 100%;
    grid-column: 2 / span 1;
    margin: 0;
  }
`;

const SIDEBAR = styled.aside`
  width: calc(100% - 40px);
  padding: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media only screen and (min-width: 1024px) {
    width: 100%;
    margin-top: 0px;
    margin-bottom: 20px;
    grid-column: 4 / span 1;
  }

  @media only screen and (min-width: 1280px) {
    padding-top: 10px;
    margin-bottom: 5px;
  }
`;

export { MAIN, COLUMNED_PAGE, PAGE_MAIN_COL, SIDEBAR };
