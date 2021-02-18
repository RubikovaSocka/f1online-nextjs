import axios from "axios";
import { wrapper } from "../redux/store/store";
import Head from "next/head";
import QuickNews from "../components/QuickNews";
import CalResWidget from "../components/CalResWidget";

import SectionTitle from "../components/SectionTitle";
import Divider from "../components/Divider.js";
import { URLS } from "../redux/apis/urls";

import {
  MAIN,
  COLUMNED_PAGE,
  PAGE_MAIN_COL,
  SIDEBAR,
} from "../components/PageLayout";
import { PAGE_MAIN_TITLE } from "../constants";
import AuthorPreview from "../components/AuthorPreview";
import getAuthorFromSlug from "../redux/apis/getAuthorFromSlug";

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
                marginTop: "25px",
              }}
            >
              {authorsData.map((author, index) => (
                <AuthorPreview
                  key={index}
                  subtitle={author.mail}
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
    const response = await fetch(URLS.AUTHORS_DATA_ENDPOINT)
      .then((res) => res.json())
      .then((res) => res);

    return {
      props: {
        authorsData: response,
      },
    };
  }
);

export default Autori;
