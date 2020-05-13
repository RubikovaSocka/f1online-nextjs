import React, { Component } from 'react'
import axios from 'axios'
import Head from 'next/head'
import QuickNews from "../components/QuickNews/QuickNews.js";
import RPanel from "../components/RPanel.js";
import SectionTitle from '../components/SectionTitle/SectionTitle.js';

import styles from './scss/kalendar.module.scss';
import Divider from '../components/Divider.js';
export default class Calendar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            calendarData: {},
            isLoaded: false
        }
    }
/*
    componentDidMount() {
        axios.get(`https://wpadmin.f1online.sk/wp-json/wp/v2/calendar?per_page=1`)
            .then(res => {
                this.setState({
                    calendarData: res.data[0],
                    isLoaded: true
                })
            })
            .catch(err => console.log(err))
    }
*/
    render() {
        let contentData;
        //if(this.state.isLoaded) {
            contentData = (
                <div className={styles.container}>
                    <img className={styles.annLogo} alt="logo f1online.sk" src="https://wpadmin.f1online.sk/wp-content/uploads/logo-medium.jpg"/> 
                    <span className={styles.announcement}>{`Zverejníme po aktualizácii kalendára na rok 2020`}</span>
                </div>
            )
        //}

        return (
            <>
            <Head>
                <title>Kalendár | F1online.sk</title>
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`Kalendár | F1online.sk`} />
                <meta property="og:description" content={`Najnovšie správy zo sveta Formuly 1. Piloti, tímy, okruhy, výsledky, štatistiky...`} />
                <meta property="og:url" content={`https://f1online.sk/kalendar`} />
                <meta property="og:image" content={`https://wpadmin.f1online.sk/wp-content/uploads/title-logo-wb.png`} />
            </Head>
            <main className="contentsPage">
                <div className="page">
                    <div className="mainContent">
                        <SectionTitle title='Kalendár' />
                        {contentData}
                    </div>
                    <aside className="sideBar">
                        <Divider height="50px" />
                        <QuickNews />
                        <RPanel />
                    </aside>
                </div>
            </main>
            </>
        )
    }
}
