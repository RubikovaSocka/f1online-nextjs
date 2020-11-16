import ReactPaginate from "react-paginate";
import styled from "styled-components";

import ArticlesPanel from "../ArticlesPanel";
import TemporaryInfoPanel from "../TemporaryInfoPanel";

const Paginate = styled.div`
  padding-left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  ul {
    max-width: 100%;
    padding: 0;
    overflow-x: auto;
    white-space: nowrap;
    height: 55px;
  }
  li {
    display: inline-block;
    padding-left: 0;
    list-style: none;
    font-family: "HK Grotesk";
    cursor: pointer;
    a,
    span {
      position: relative;
      float: left;
      padding: 6px 12px;
      line-height: 20px;
      text-decoration: none;
      font-weight: 700;
      font-size: 13px;

      color: ${props => props.theme.TEXT_COLOR};
      background-color: ${props => props.theme.PAGE_BACK_COLOR};
      border: 1px solid ${props => props.theme.TABLE_PRIMARY_COLOR};

      margin-left: 2px;
      margin-right: 2px;
    }
    &.active a,
    a:hover {
      color: white;
      background-color: ${props => props.theme.TABLE_PRIMARY_COLOR};
    }
  }
`;

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
  return !isLoading && error ? (
    <TemporaryInfoPanel
      margin="20px 10px 0 10px"
      width="calc(100% - 20px)"
      height="250px"
      title={error}
    />
  ) : !isLoading && articles.length === 0 ? (
    <TemporaryInfoPanel
      margin="20px 10px 0 10px"
      width="calc(100% - 20px)"
      height="250px"
      title="Nenašli sme žiadne články"
    />
  ) : showPagination ? (
    <>
      <ArticlesPanel isLoading={isLoading} posts={articles} />
      <Paginate>
        <ReactPaginate
          forcePage={currentPage - 1}
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"…"}
          breakClassName={"break-me"}
          pageCount={getPageCount(totalPosts, perPage)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          //selected \in {0, 1, 2,...}, therefore pageNumber is selected + 1
          onPageChange={({ selected }) => pageClickCallback(selected + 1)}
          activeClassName="active"
          previousClassName={"enabled"}
        />
      </Paginate>
    </>
  ) : (
    <ArticlesPanel isLoading={isLoading} posts={articles} />
  );
}

export default ArchiveArticlesRenderer;
