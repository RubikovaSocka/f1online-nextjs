import { useState, useEffect } from "react";
import ArticlesPanel from "./ArticlesPanel/ArticlesPanel";
import { URLS } from "../redux/apis/urls";
import fetchArchiveArticles from "../redux/apis/fetchArchiveArticlesApi";
import SectionTitle from "./SectionTitle";

//fetch 3 articles by tag or max6 articles by ids
function RelatedArticles({ ids, tagID, except }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (ids && ids.length > 0) {
      Promise.all(
        ids.map(id =>
          fetch(
            `${URLS.BASE}${URLS.ARTICLES_ENDPOINT}${id}?${URLS.previewFields}`
          )
        )
      )
        .then(res => Promise.all(res.map(r => r.json())))
        .then(res => {
          setIsLoading(false);
          setArticles(res);
        });
    } else if (tagID) {
      fetchArchiveArticles({ pageNumber: 1, perPage: 4, tagID: tagID }).then(
        res => {
          setArticles(
            res.articles
              .filter(post => (except ? post.id !== except : true))
              .slice(0, 3)
          );
          setIsLoading(false);
        }
      );
    }
  }, []);

  if (isLoading || articles.length !== 0)
    return (
      <>
        <SectionTitle title="Možno vás zaujme" />
        <ArticlesPanel isLoading={isLoading} posts={articles} />
      </>
    );
  return null;
}

export default RelatedArticles;
