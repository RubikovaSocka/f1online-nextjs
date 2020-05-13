import React from 'react'
import axios from 'axios'
import Head from 'next/head'

import QuickNews from "../components/QuickNews/QuickNews.js";
import RPanel from "../components/RPanel.js";
import CalResWidget from '../components/CalResWidget/CalResWidget.js';
import TeamPreview from '../components/TeamPreview/TeamPreview.js'
import Divider from '../components/Divider.js';
import SectionTitle from '../components/SectionTitle/SectionTitle.js';

import styles from './scss/timy.module.scss'

export default function Teams({ teamsData }) {

    let dataBlock = teamsData.ConstructorTable.Constructors.map((constructor) => {
        return (
            <TeamPreview constructor={constructor}/>
        )
    })
    
    return (
        <>
            <Head>
                <title>Tímy | F1online.sk</title>
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`Tímy | F1online.sk`} />
                <meta property="og:description" content={`Najnovšie správy zo sveta Formuly 1. Piloti, tímy, okruhy, výsledky, štatistiky...`} />
                <meta property="og:url" content={`https://f1online.sk/timy`} />
                <meta property="og:image" content={`https://wpadmin.f1online.sk/wp-content/uploads/title-logo-wb.png`} />
            </Head>
        <main className="contentsPage">
            <div className="page">
                <div className="mainContent">
                    <SectionTitle title="Tímy"/>
                    <Divider height='20px' />
                    {/*<img className={styles.image} src='' />*/}
                    
                    <div className={styles.container}>
                        {dataBlock}
                    </div>
                </div>
                <aside className="sideBar">
                    <Divider height='50px' />
                    <QuickNews />
                    <Divider height='15px' />
                    <RPanel />
                    <Divider height='15px' />
                    <CalResWidget />
                </aside>
            </div>
        </main>
        </>
    )
}

export async function getServerSideProps(context) {
    const response = await axios({
        method: 'get',
        url: 'https://wpadmin.f1online.sk/wp-content/uploads/teams.json'
        //headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
    })

    return {
        props: {
            teamsData: response.data
        }
    }
}