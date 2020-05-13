import React from 'react'
import RPanel from "../components/RPanel.js";
import SectionTitle from '../components/SectionTitle/SectionTitle.js';
import ArchivArticles from '../components/ArchivArticles/ArchivArticles.js';
import QuickNews from '../components/QuickNews/QuickNews.js';
import CalResWidget from "../components/CalResWidget/CalResWidget.js";
import Head from 'next/head'

import Divider from '../components/Divider.js'

export default function Archiv() {
    return (
        <>
        <Head>
            <title>Správy | F1online.sk</title>
            <meta property="og:type" content="website" />
            <meta property="og:title" content={`F1online.sk`} />
            <meta property="og:description" content={`Najnovšie správy zo sveta Formuly 1. Piloti, tímy, okruhy, výsledky, štatistiky...`} />
            <meta property="og:url" content={`https://f1online.sk/clanky`} />
            <meta property="og:image" content={`https://wpadmin.f1online.sk/wp-content/uploads/title-logo-wb.png`} />
        </Head>
        <main className="contentsPage">
            <div className="page">
                <div className="mainContent">
                    <SectionTitle title="Všetky správy"/>
                    <ArchivArticles asArchive={true} perpage='12' />
                    </div>
                <aside className="sideBar">
                    <Divider height="50px" />
                    <QuickNews />
                    {/*<RPanel />*/}
                    <CalResWidget />
                </aside>
            </div>
        </main>
        </>
    )
}