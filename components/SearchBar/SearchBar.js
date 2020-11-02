import React, { useState } from "react";
import Router from "next/router";
import { useDispatch } from "react-redux";
import Media from "react-media";
import { TYPES as LOGOTRIGGER } from "../../redux/reducers/logoHideReducer";
import styles from "./style.module.scss";

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

  return (
    <div className={styles.container}>
      <form
        className={`${styles.searchForm} ${isOpenedMobile ? styles.shown : ""}`}
      >
        <input
          type="text"
          value={searchPhrase}
          placeholder="Hľadať"
          className={`ifont ${isOpenedMobile ? styles.show : ""}`}
          aria-label="Search"
          onChange={e => setSearchPhrase(e.target.value)}
        />
        <Media query={{ maxWidth: 1023 }}>
          {matches =>
            matches ? (
              //MOBILE
              <>
                <button
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
                  className={`${isOpenedMobile ? styles.shown : ""} ${
                    styles.buttonContent
                  } ${styles.buttonGlass}`}
                />
                <button
                  onClick={e => {
                    e.preventDefault();
                    if (searchPhrase.length === 0) {
                      isOpenedChange();
                    }
                    setSearchPhrase("");
                  }}
                  style={{
                    display: `${isOpenedMobile ? "inline-block" : "none"}`
                  }}
                  className={`${isOpenedMobile ? styles.shown : ""} ${
                    styles.buttonContent
                  } ${styles.buttonx}`}
                />
              </>
            ) : (
              //DESKTOP
              <button
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
                className={`${styles.shown} ${styles.buttonContent} ${styles.buttonGlass}`}
              />
            )
          }
        </Media>
        {/*button*/}
      </form>
    </div>
  );
}

export default SearchBar;
