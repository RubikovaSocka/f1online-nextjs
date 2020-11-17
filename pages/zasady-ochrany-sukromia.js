import React from "react";
import axios from "axios";
import QuickNews from "../components/QuickNews";
import Divider from "../components/Divider.js";
import SectionTitle from "../components/SectionTitle";
import styles from "../styles/zasady.module.scss";

import {
  MAIN,
  COLUMNED_PAGE,
  PAGE_MAIN_COL,
  SIDEBAR,
} from "../components/PageLayout";

export default function privacy({ pageData }) {
  return (
    <MAIN>
      <COLUMNED_PAGE>
        <PAGE_MAIN_COL>
          <SectionTitle title="Výsledky" />
          <Divider height="29px" />
          <div
            className={styles.container}
            /*className={styles.articleContent}*/ dangerouslySetInnerHTML={{
              __html: pageData.content.rendered,
            }}
          />{" "}
        </PAGE_MAIN_COL>
        <SIDEBAR>
          <Divider height="50px" />
          <QuickNews />
        </SIDEBAR>
      </COLUMNED_PAGE>
    </MAIN>
  );
}

export async function getServerSideProps(context) {
  const response = await axios({
    method: "get",
    url: "https://wpadmin.f1online.sk/wp-json/wp/v2/pages/3",
    //headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
  });
  return {
    props: {
      pageData: response.data,
    },
  };
}
