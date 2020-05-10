import React, { Component } from 'react'
import RPanel from "../components/RPanel.js";
import SectionTitle from '../components/SectionTitle/SectionTitle.js';
import ArchivArticles from '../components/ArchivArticles/ArchivArticles.js';
import QuickNews from '../components/QuickNews/QuickNews.js';
import Fonts from '../utils/Fonts'

class Archiv extends Component {
    componentDidMount() {
        Fonts()
    }
    render() {
        return (
            <main className="contentsPage">
                <div className="page">
                    <div className="mainContent">
                        <SectionTitle title="Všetky správy"/>
                        <ArchivArticles asArchive={true} perpage='12' />
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



export default Archiv