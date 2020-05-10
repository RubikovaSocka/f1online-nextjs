import React from 'react'
import axios from 'axios'

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
                    <QuickNews />
                    <RPanel />
                    <CalResWidget />
                </aside>
            </div>
        </main>
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