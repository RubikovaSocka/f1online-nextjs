import React from 'react'
import RPanel from "../components/RPanel.js";
import SectionTitle from '../components/SectionTitle/SectionTitle.js';
import ArchivArticles from '../components/ArchivArticles/ArchivArticles.js';
import QuickNews from '../components/QuickNews/QuickNews.js';

export default function Archiv() {
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