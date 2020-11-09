import { useState } from "react";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { TYPES as LOGOTRIGGER } from "../../redux/reducers/logoHideReducer";
import isMobileUtil from "../../utils/onMobile";
import styled from "styled-components";

const Container = styled.div`
  float: right;

  @media only screen and (min-width: 1024px) {
    width: 170px;
    border: solid 1px #c0c0c0;
    border-radius: 30px;
  }
`;

const Form = styled.form`
  margin-top: -2px;
  display: flex;
  flex-direction: row;

  ${props =>
    props.isOpenedMobile
      ? ` @media only screen and (max-width: 1023px) {
            border: solid 1px #c0c0c0;
            border-radius: 30px;
            padding: 0 15px;
          }`
      : ""}

  @media only screen and (min-width: 1024px) {
    margin-left: 15px;
    margin-top: 0;
  }

  input {
    display: none;
    border: none;
    background-color: unset;

    font-family: "HK Grotesk";

    ${props =>
      props.isOpenedMobile
        ? ` height: 30px;
            width: 135px;

            display: inline-block;

            font-size: 14px;
            font-weight: 400;
            color: #5e6b6e;`
        : ""}

    @media only screen and (min-width: 1024px) {
      height: 30px;
      width: 120px;

      display: inline-block;

      font-size: 14px;
      font-weight: 400;
      color: ${props => props.theme.SEARCH_TEXT_COLOR};
      padding-right: 5px;
    }
  }
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;

  width: 22px;
  height: 22px;
  padding: 0;

  ${props =>
    props.isOpenedMobile
      ? ` width: 18px;
          height: 18px;
          margin: auto 0 auto 10px;

          @media only screen and (min-width: 1024px) {
            width: 16px;
            height: 16px;
            margin-left: 0;
          }`
      : ""}
`;

const XButton = styled(Button)`
  background-image: url(${props => props.theme.XBUTTON});
  ${props =>
    props.isOpenedMobile ? `display: inline-block;` : `display: none;`}
`;

const SearchButton = styled(Button)`
  background-image: url(${props => props.theme.SEARCH_BUT});
`;

function SearchBar() {
  const dispatch = useDispatch();
  const [isOpenedMobile, setIsOpenedMobile] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");

  const isOpenedChange = () => {
    setIsOpenedMobile(wasOpened => {
      dispatch({ type: `${wasOpened ? LOGOTRIGGER.SHOW : LOGOTRIGGER.HIDE}` });
      return !wasOpened;
    });
  };

  const isMobile = isMobileUtil();

  return (
    <Container>
      <Form isOpenedMobile={isOpenedMobile}>
        <input
          type="text"
          value={searchPhrase}
          placeholder="Hľadať"
          //className={`ifont ${isOpenedMobile ? styles.show : ""}`}
          aria-label="Search"
          onChange={e => setSearchPhrase(e.target.value)}
        />
        {isMobile ? (
          <>
            <SearchButton
              onClick={e => {
                e.preventDefault();
                if (isOpenedMobile) {
                  isOpenedChange();
                  Router.push({
                    pathname: "/archiv",
                    query: {
                      search: searchPhrase
                    }
                  });
                } else {
                  isOpenedChange();
                }
              }}
              type={"submit"}
              isOpenedMobile={isOpenedMobile}
            />
            <XButton
              onClick={e => {
                e.preventDefault();
                if (searchPhrase.length === 0) {
                  isOpenedChange();
                }
                setSearchPhrase("");
              }}
              isOpenedMobile={isOpenedMobile}
            />
          </>
        ) : (
          <SearchButton
            onClick={e => {
              e.preventDefault();
              Router.push({
                pathname: "/archiv",
                query: {
                  search: searchPhrase
                }
              });
            }}
            type={"submit"}
            isOpenedMobile
          />
        )}
      </Form>
    </Container>
  );
}

export default SearchBar;
