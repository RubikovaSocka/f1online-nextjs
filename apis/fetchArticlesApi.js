import axios from "axios";
import { URLS } from "./urls";

const fetchArticles = async () => {
  console.log("fetchArticlesApi")
  return await axios.get(`${URLS.BASE}${URLS.ARTICLES_ENDPOINT}`).then(res => {
    return res.data;
  });
};

export default fetchArticles;
