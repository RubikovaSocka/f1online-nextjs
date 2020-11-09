import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import QuickNews from "../../../components/QuickNews";
import CalResWidget from "../../../components/CalResWidget";
import Divider from "../../../components/Divider.js";
import TrackedSidePanel from "../../../components/Ads/TrackedSidePanel.js";
import PostRendered from "../../../components/PostRendered/PostRendered.js";
import PostMeta from "../../../components/PostRendered/PostMeta.js";
import { URLS } from "../../../redux/apis/urls";

import { fetchNewQuickNews } from "../../../redux/actions/quickNewsActions";
import { fetchF1Results } from "../../../redux/actions/f1ResultsActions";
import { fetchProgramme } from "../../../redux/actions/programmeActions";
import {
  MAIN,
  COLUMNED_PAGE,
  PAGE_MAIN_COL,
  SIDEBAR
} from "../../../components/PageLayout";

export default function Post({ postData }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchF1Results({ perPage: 1 }));
    dispatch(fetchProgramme());
    dispatch(fetchNewQuickNews());
    axios
      .post(
        `https://wpadmin.f1online.sk//wp-json/wordpress-popular-posts/v1/popular-posts`,
        {
          wpp_id: postData.id
        }
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <PostMeta {...postData} />
      <MAIN>
        <COLUMNED_PAGE>
          <PAGE_MAIN_COL id="cn">
            <PostRendered key={postData.id} {...postData} />
          </PAGE_MAIN_COL>
          <SIDEBAR>
            <QuickNews />
            <Divider height="15px" />
            <CalResWidget />
            <TrackedSidePanel />
          </SIDEBAR>
        </COLUMNED_PAGE>
      </MAIN>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const response = await axios({
    method: "get",
    url: `${URLS.BASE}${URLS.ARTICLES_ENDPOINT}${params.id}?_embed`
    //headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
  });
  axios.get(`${URLS.BASE}wp-content/plugins/counter/count.php?id=${params.id}`);

  return {
    props: {
      postData: response.data
    }
  };
}
