import SectionTitle from "../components/SectionTitle/SectionTitle.js";
import ArchivArticles from "../components/ArchivArticles/ArchivArticles.js";
import QuickNews from "../components/QuickNews/QuickNews.js";
import CalResWidget from "../components/CalResWidget/CalResWidget.js";
import Head from "next/head";
import {
  MAIN,
  COLUMNED_PAGE,
  PAGE_MAIN_COL,
  SIDEBAR,
} from "../components/PageLayout";
import Divider from "../components/Divider.js";
import { PAGE_MAIN_TITLE } from "../constants";
import { useEffect } from "react";

export default function Partneri() {
  return (
    <>
      <Head>
        <title key="meta_title">{`Partneri | ${PAGE_MAIN_TITLE}`}</title>
        <meta
          key="meta_ogtitle"
          property="og:title"
          content={`Partneri | ${PAGE_MAIN_TITLE}`}
        />
        <meta
          key="meta_url"
          property="og:url"
          content={`https://f1online.sk/clanky`}
        />
      </Head>
      <MAIN>
        <COLUMNED_PAGE>
          <PAGE_MAIN_COL>
            <SectionTitle title="Ďakujeme našim partnerom" />
            <ArchivArticles tagSlug="partneri" asArchive={false} perpage="12" />
          </PAGE_MAIN_COL>
          <SIDEBAR>
            <Divider height="50px" />
            <QuickNews />
            {/*<RPanel />*/}
            <CalResWidget />
          </SIDEBAR>
        </COLUMNED_PAGE>
      </MAIN>
    </>
  );
}
