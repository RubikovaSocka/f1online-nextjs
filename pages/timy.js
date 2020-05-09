import React, { Component } from 'react'
import axios from 'axios'
import Fonts from './Fonts'

import QuickNews from "../components/QuickNews/QuickNews.js";
import RPanel from "../components/RPanel.js";
import CalResWidget from '../components/CalResWidget/CalResWidget.js';
import TeamPreview from '../components/TeamPreview/TeamPreview.js'
import Divider from '../components/Divider.js';
import SectionTitle from '../components/SectionTitle/SectionTitle.js';

import styles from './scss/timy.module.scss'

class Teams extends Component {

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
                        <TeamPreview constructor={constructor}/>
                    )
                })
            }
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
}
export default Teams