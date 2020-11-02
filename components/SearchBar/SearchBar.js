import React, { useState } from "react";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { TYPES as LOGOTRIGGER } from "../../redux/reducers/logoHideReducer";
import styles from "./style.module.scss";
import isMobileUtil from "../../utils/isMobile";

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
        {isMobile ? (
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
            className={`${styles.buttonContent} ${styles.buttonGlass} ${styles.shown}`}
          />
        )}
      </form>
    </div>
  );
}

export default SearchBar;
