import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import LoadingSpinner from "../LoadingSpinner";
import ReactPaginate from "react-paginate";
import ArticlesPanel from "../ArticlesPanel/ArticlesPanel";
import { fetchArchiveArticles } from "../../redux/actions/archiveActions";

import styles from "./ArchivArticles.module.scss";

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
  pagePressedCallback
}) {
  const dispatch = useDispatch();
  //() => dispatch(fetchMoreQuickNews())
  //const [pageNumber, setPageNumber] = useState(1);

  const handlePageClick = ({ selected }) => {
    //if (!articlesPageMap.has(selected)) {
    console.log(selected + 1);
    dispatch(
      fetchArchiveArticles({ pageNumber: selected + 1, perPage: perPage, isServer: false })
    );
    //}
    //setPageNumber(selected);
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
  } else {
    if (showPagination) {
      return (
        <>
          <ArticlesPanel /*counter={this.state.offset}*/ posts={articles} />
          <ReactPaginate
            //initialPage={currentPage - 1}
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
            //subContainerClassName={styles.paginateSubcontainer}
            activeClassName={styles.active}
            previousClassName={"enabled"}
          />
        </>
      );
    } else
      return <ArticlesPanel /*counter={this.state.offset}*/ posts={articles} />;
  }
}

/*
  return 
   if (this.state.isLoaded) {
    if (this.state.posts.length === 0) {
      articles = (
        
      );
    } else {
      articles = (
        <ArticlesPanel counter={this.state.offset} posts={this.state.posts} />
      );
      if (this.props.asArchive && this.state.pageCount > 1) {
        paginateSection = (
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={this.handlePageClick}
            containerClassName={styles.paginateContainer}
            //subContainerClassName={styles.paginateSubcontainer}
            activeClassName={styles.active}
            previousClassName={"enabled"}
          />
        );
      }
    }
  return (
    <div className={styles.container}>
      {articles}
      <div className={styles.paginateContainer}>{paginateSection}</div>
    </div>
  );*/

export default ArchiveArticlesRenderer;
