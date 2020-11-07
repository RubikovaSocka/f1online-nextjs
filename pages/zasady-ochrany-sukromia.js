import React from "react";
import axios from "axios";
import QuickNews from "../components/QuickNews";
import Divider from "../components/Divider.js";
import styles from "../styles/zasady.module.scss";

export default function privacy({ pageData }) {
  return (
    <main className="contentsPage">
      <div className="page">
        <div className="mainContent">
          <div
            className={styles.container}
            /*className={styles.articleContent}*/ dangerouslySetInnerHTML={{
              __html: pageData.content.rendered
            }}
          />
        </div>
        <aside className={`sideBar ${styles.stickySideBar}`}>
          <Divider height="50px" />
          <QuickNews />
        </aside>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const response = await axios({
    method: "get",
    url: "https://wpadmin.f1online.sk/wp-json/wp/v2/pages/3"
    //headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
  });
  return {
    props: {
      pageData: response.data
    }
  };
}
