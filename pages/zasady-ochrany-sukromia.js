import React from 'react'
import axios from 'axios'

import QuickNews from "../components/QuickNews/QuickNews.js";
import RPanel from "../components/RPanel.js";
import SectionTitle from '../components/SectionTitle/SectionTitle.js';

import styles from './scss/zasady.module.scss'

const style = {
    fontFamily: 'HK Grotesk',
    fontSize: '14px',
}

export default function privacy({pageData}) {
    return (
        <main className="contentsPage">
            <div className="page">
                <div className="mainContent">
                    <SectionTitle title='Výsledky' />
                    <div style={style}/*className={styles.articleContent}*/ dangerouslySetInnerHTML={{ __html: pageData.content.rendered}} />
                </div>
                <aside className={`sideBar ${styles.stickySideBar}`}>
                    <QuickNews />
                    <RPanel />
                </aside>
            </div>
        </main>
    )
}

export async function getServerSideProps(context) {
    const response = await axios({
        method: 'get',
        url: 'https://wpadmin.f1online.sk/wp-json/wp/v2/pages?per_page=1'
        //headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
    })
    return {
        props: {
            pageData: response.data[0]
        }
    }
}