import React, { Component } from 'react'
import axios from 'axios'
import Fonts from './Fonts'

import QuickNews from "../components/QuickNews/QuickNews.js";
import RPanel from "../components/RPanel.js";
import CalResWidget from '../components/CalResWidget/CalResWidget.js';

import DriverPreview from '../components/DriverPreview/DriverPreview.js';
import SectionTitle from '../components/SectionTitle/SectionTitle.js';
import Divider from '../components/Divider.js';
import LoadingSpinner from '../components/LoadingSpinner.js';

import styles from './scss/piloti.module.scss'

class Drivers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            teamsData: {},
            isLoaded: false
        }
    }

    componentDidMount() {
        Fonts()
        axios.get(`https://wpadmin.f1online.sk/wp-content/uploads/teams.json`)
            //.then(res => console.log(res))
            .then(res => {
                this.setState({
                    teamsData: res.data,
                    isLoaded: true
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        let dataBlock;
        if(this.state.isLoaded) {
            dataBlock = this.state.teamsData.ConstructorTable.Constructors.map((constructor) => {
                return (
                    constructor.Drivers.map(driver => {
                        return (
                            <DriverPreview driver={driver} 
                                team={constructor.name} 
                                teamColor={constructor.teamColor}/>
                        )
                    })
                )
            })
        } else {
            dataBlock = <LoadingSpinner />
        }

        return (
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
                        <RPanel />
                        <CalResWidget />
                    </aside>
                </div>
            </main>
        )
    }
}
export default Drivers