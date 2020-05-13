import React from 'react'
import axios from 'axios'

import QuickNews from "../components/QuickNews/QuickNews.js";
import RPanel from "../components/RPanel.js";
import CalResWidget from '../components/CalResWidget/CalResWidget.js';

import DriverPreview from '../components/DriverPreview/DriverPreview.js';
import SectionTitle from '../components/SectionTitle/SectionTitle.js';
import Divider from '../components/Divider.js';
import LoadingSpinner from '../components/LoadingSpinner.js';

import styles from './scss/piloti.module.scss'

export default function Drivers({ teamsData }) {
    
    let dataBlock  = teamsData.ConstructorTable.Constructors.map((constructor, index) => {
        return (
            constructor.Drivers.map((driver, index2) => {
                return (
                    <DriverPreview key={`${index}-${index2}`}
                        driver={driver} 
                        team={constructor.name} 
                        teamColor={constructor.teamColor}/>
                )
            })
        )
    })

    return (
            <>
            <Head>
                <title>F1online.sk</title>
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`F1online.sk`} />
                <meta property="og:description" content={`Najnovšie správy zo sveta Formuly 1. Piloti, tímy, okruhy, výsledky, štatistiky...`} />
                <meta property="og:url" content={`https://f1online.sk/`} />
                {/*<meta property="og:image" content={`${postData.better_featured_image.source_url}`} />*/}
            </Head>
            <main className="contentsPage">
                <div className="page">
                    <div className="mainContent">
                        <SectionTitle title="Piloti"/>
                        <Divider height='20px' />
                        <div className={styles.driversContainer}>
                            {dataBlock}
                        </div>
                    </div>
                    <aside className="sideBar">
                        <QuickNews />
                        <Divider height="15px" />
                        <RPanel />
                        <Divider height="15px" />
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