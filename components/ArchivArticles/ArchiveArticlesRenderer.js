import React from "react";

import LoadingSpinner from "../LoadingSpinner";
import ReactPaginate from "react-paginate";
import ArticlesPanel from "../ArticlesPanel";

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
  currentPage,
  pageClickCallback
}) {

  return isLoading ? (
    <LoadingSpinner />
  ) : error ? (
    <p>{error}</p>
  ) : articles.length === 0 ? (
    <div className={styles.noneFoundPanel}>
      <img alt="logo"></img>
      <span>Nenašli sme žiadne články</span>
    </div>
  ) : showPagination ? (
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
        //selected \in {0, 1, 2,...}, therefore pageNumber is selected + 1
        onPageChange={({ selected }) => pageClickCallback(selected + 1)}
        containerClassName={styles.paginateContainer}
        activeClassName={styles.active}
        previousClassName={"enabled"}
      />
    </>
  ) : (
    <ArticlesPanel posts={articles} />
  );
}

export default ArchiveArticlesRenderer;
