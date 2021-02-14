import axios from "axios";
import { END } from "redux-saga";
import { wrapper } from "../redux/store/store";
import Head from "next/head";
import QuickNews from "../components/QuickNews";
import CalResWidget from "../components/CalResWidget";

import DriverPreview from "../components/DriverPreview/DriverPreview.js";
import SectionTitle from "../components/SectionTitle";
import Divider from "../components/Divider.js";

import {
  MAIN,
  COLUMNED_PAGE,
  PAGE_MAIN_COL,
  SIDEBAR,
} from "../components/PageLayout";
import { PAGE_MAIN_TITLE } from "../constants";
import AuthorPreview from "../components/AuthorPreview";

function Autori({ authorsData }) {
  console.log(authorsData);
  return (
    <>
      <Head>
        <title key="meta_title">{`Autori | ${PAGE_MAIN_TITLE}`}</title>
        <meta
          key="meta_ogtitle"
          property="og:title"
          content={`Autori | ${PAGE_MAIN_TITLE}`}
        />
        <meta
          key="meta_url"
          property="og:url"
          content={`https://f1online.sk/autori`}
        />
      </Head>
      <MAIN>
        <COLUMNED_PAGE>
          <PAGE_MAIN_COL>
            <SectionTitle topLevel={true} title="Autori F1online.sk" />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: "25px"
              }}
            >
              {authorsData.map((author, index) => (
                <AuthorPreview
                  key={index}
                  subtitle="F1online.sk"
                  author={author}
                />
              ))}
            </div>
            <Divider height="20px" />
          </PAGE_MAIN_COL>
          <SIDEBAR>
            <Divider height="50px" />
            <QuickNews />
            <Divider height="15px" />
            <CalResWidget />
          </SIDEBAR>
        </COLUMNED_PAGE>
      </MAIN>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    const response = await axios({
      method: "get",
      url: "https://wpadmin.f1online.sk/wp-content/uploads/authors.json",
      //headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
    });

    return {
      props: {
        authorsData: response.data,
      },
    };
  }
);

export default Autori;
