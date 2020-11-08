import React from "react";
import { useSelector } from "react-redux";
import { wrapper } from "../redux/store/store";
import { END } from "redux-saga";

import Head from "next/head";
import QuickNews from "../components/QuickNews";
import SectionTitle from "../components/SectionTitle";
import CalendarBox from "../components/Calendar/CalendarBox.js";
import { fetchCalendar } from "../redux/actions/calendarActions";
import Divider from "../components/Divider.js";
import {
  MAIN,
  COLUMNED_PAGE,
  PAGE_MAIN_COL,
  SIDEBAR
} from "../components/PageLayout";

function Calendar() {
  const calendarData = useSelector(({ calendar }) => calendar.events);

  return (
    <>
      <Head>
        <title key="meta_title">Kalendár | F1online.sk</title>
        <meta
          key="meta_ogtitle"
          property="og:title"
          content={`Kalendár | F1online.sk`}
        />
        <meta
          key="meta_url"
          property="og:url"
          content={`https://f1online.sk/kalendar`}
        />
      </Head>
      <MAIN>
        <COLUMNED_PAGE>
          <PAGE_MAIN_COL>
            <SectionTitle title="Kalendár" />
            <Divider height="28px" />
            <CalendarBox data={calendarData} />
          </PAGE_MAIN_COL>
          <SIDEBAR>
            <Divider height="50px" />
            <QuickNews />
          </SIDEBAR>
        </COLUMNED_PAGE>
      </MAIN>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    store.dispatch(fetchCalendar());
    store.dispatch(END);

    await store.sagaTask.toPromise();
  }
);

export default Calendar;
