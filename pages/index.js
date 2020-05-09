import { Component, Fragment } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'

import TitleArea from '../components/TitleArea/TitleArea'
import ArticlesPanel from "../components/ArticlesPanel/ArticlesPanel"
import SectionTitle from "../components/SectionTitle/SectionTitle.js"
import QuickNews from "../components/QuickNews/QuickNews.js";
import CalResWidget from "../components/CalResWidget/CalResWidget.js";

import Fonts from './Fonts'
import CalendarLarge from "../components/CalendarLarge/CalendarLarge.js";
import ResultsLarge from "../components/ResultsLarge/ResultsLarge.js";


import SideSectionTitle from "../components/SideSectionTitle/SideSectionTitle.js";

import ResultsLargeWrapper from "../components/ResultsLarge/ResultsLargeWrapper.js";
import LoadingSpinner from "../components/LoadingSpinner.js";

import Divider from '../components/Divider.js'

export default class Home extends Component {

    componentDidMount() {
        Fonts()
    }

    render() {
        let titleSection, otherArticlesSection, largeWidgets
        const { postsData } = this.props

        titleSection = <TitleArea posts={postsData.slice(0, 5)}/>
        
        
        otherArticlesSection = 
            <Fragment>
                <SectionTitle title="Ďalšie správy" />
                <div className='basicButtonContainer'>
                    <ArticlesPanel posts={postsData.slice(5, 11)}/>
                    {<Link href="/clanky" as="/clanky"><a className="basicButton">Pozrieť všetky</a></Link>}
                </div>
            </Fragment>

        largeWidgets = 
            <div>
                <Divider height="30px"/>
                <SectionTitle title="Boxová tabuľa" />
                <Divider height="15px"/>
                <CalendarLarge/> 
                <ResultsLargeWrapper />
            </div>

        return (
            <main className="contentsPage">
                {titleSection}
                <div className="page">
                    <div className="mainContent">
                        {otherArticlesSection}
                        {largeWidgets}
                    </div>
                    <aside className="sideBar">
                        <QuickNews />
                        <Divider height="30px" />
                        <CalResWidget />
                    </aside>
                </div>
            </main>
          )
    }
}

export async function getStaticProps() {
    const responseSticky = await axios({
        method: 'get',
        url: 'https://wpadmin.f1online.sk/wp-json/wp/v2/posts?sticky=true&per_page=3'
        //headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
    })
    const responseNonSticky = await axios({
        method: 'get',
        url: 'https://wpadmin.f1online.sk/wp-json/wp/v2/posts?sticky=false&per_page=11'
        //headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
    })

    return {
        props: {
            postsData: (responseSticky.data.concat(responseNonSticky.data))
        }
    }
}
