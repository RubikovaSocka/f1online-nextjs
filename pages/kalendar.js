import React from "react";
import { useSelector } from "react-redux";
import { wrapper } from "../redux/store/store";
import { END } from "redux-saga";

import Head from "next/head";
import QuickNews from "../components/QuickNews";
import RPanel from "../components/RPanel.js";
import SectionTitle from "../components/SectionTitle";
import CalendarBox from "../components/Calendar/CalendarBox.js";
import { fetchCalendar } from "../redux/actions/calendarActions";
import Divider from "../components/Divider.js";

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
      <main className="contentsPage">
        <div className="page">
          <div className="mainContent">
            <SectionTitle title="Kalendár" />
            <Divider height="28px" />
            <CalendarBox data={calendarData} />
          </div>
          <aside className="sideBar">
            <Divider height="50px" />
            <QuickNews />
            <RPanel />
          </aside>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  store.dispatch(fetchCalendar());
  store.dispatch(END);

  await store.sagaTask.toPromise();
});

export default Calendar;
