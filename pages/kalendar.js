import React, { Component } from 'react'
import axios from 'axios'

import QuickNews from "../components/QuickNews/QuickNews.js";
import RPanel from "../components/RPanel.js";
import SectionTitle from '../components/SectionTitle/SectionTitle.js';

import styles from './scss/vysledky.module.scss'

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
            <main className="contentsPage">
                <div className="page">
                    <div className="mainContent">
                        <SectionTitle title='Kalendár' />
                        {contentData}
                    </div>
                    <aside className="sideBar">
                        <QuickNews />
                        <RPanel />
                    </aside>
                </div>
            </main>
        )
    }
}
