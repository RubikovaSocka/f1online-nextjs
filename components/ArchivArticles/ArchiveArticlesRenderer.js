import React from "react";
import { useDispatch } from "react-redux";

import LoadingSpinner from "../LoadingSpinner";
import ReactPaginate from "react-paginate";
import ArticlesPanel from "../ArticlesPanel/ArticlesPanel";
import { fetchArchiveArticles } from "../../redux/actions/archiveActions";

import styles from "./style.module.scss";

const getPageCount = (totalItems, perPage) => {
  return Math.ceil(totalItems / perPage);
};

function ArchiveArticlesRenderer({
  isLoading,
  articles,
  error,
  totalPosts,
  perPage,
  showPagination,
  currentPage
}) {
  const dispatch = useDispatch();

  const handlePageClick = ({ selected }) => {
    window.scrollTo(0, 0);
    dispatch(
      fetchArchiveArticles({
        pageNumber: selected + 1,
        perPage: perPage,
        isServer: false
      })
    );
  };

  if (isLoading) {
    return <LoadingSpinner />;
  } else if (error) {
    return <p>{error}</p>;
  } else if (articles.length === 0) {
    return (
      <div className={styles.noneFoundPanel}>
        <img alt="logo"></img>
        <span>Nenašli sme žiadne články</span>
      </div>
    );
  } else if (showPagination) {
    return (
      <>
        <ArticlesPanel posts={articles} />
        <ReactPaginate
          forcePage={currentPage - 1}
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={getPageCount(totalPosts, perPage)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={styles.paginateContainer}
          activeClassName={styles.active}
          previousClassName={"enabled"}
        />
      </>
    );
  } else return <ArticlesPanel posts={articles} />;
}

export default ArchiveArticlesRenderer;
