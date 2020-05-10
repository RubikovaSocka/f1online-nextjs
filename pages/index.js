import { Fragment } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Head from 'next/head'

import TitleArea from '../components/TitleArea/TitleArea'
import ArticlesPanel from "../components/ArticlesPanel/ArticlesPanel"
import SectionTitle from "../components/SectionTitle/SectionTitle.js"
import QuickNews from "../components/QuickNews/QuickNews.js";
import CalResWidget from "../components/CalResWidget/CalResWidget.js";

import CalendarLarge from "../components/CalendarLarge/CalendarLarge.js";

import SideSectionTitle from "../components/SideSectionTitle/SideSectionTitle.js";

import ResultsLargeWrapper from "../components/ResultsLarge/ResultsLargeWrapper.js";
import LoadingSpinner from "../components/LoadingSpinner.js";

import Divider from '../components/Divider.js'
import Media from 'react-media';


export default function Home ({ postsData }) {


    let titleSection = 
        <Media query={{ maxWidth: 1023 }}>
        { matches => matches ? (
                <TitleArea posts={postsData.slice(0, 3)}/>  
            ) : (
                <TitleArea posts={postsData.slice(0, 5)}/>  
            )
        }
        </Media>
    
    let otherArticlesSection = 
        <Fragment>
            <SectionTitle title="Ďalšie správy" />
            <div className='basicButtonContainer'>
                <Media query={{ maxWidth: 1023 }}>
                { matches => matches ? (
                        <ArticlesPanel posts={postsData.slice(3, 9)}/>
                    ) : (
                        <ArticlesPanel posts={postsData.slice(5, 11)}/>
                    )
                }
                </Media>
                {<Link href="/clanky" as="/clanky"><a className="basicButton">Pozrieť všetky</a></Link>}
            </div>
        </Fragment>
    let largeWidgets = 
        <div>
            <Divider height="30px"/>
            <SectionTitle title="Boxová tabuľa" />
            <Divider height="15px"/>
            <Media query={{ maxWidth: 1023 }}>
            { matches => matches ? (
                ''
                ) : (
                    <>
                        <CalendarLarge/> 
                        <ResultsLargeWrapper />
                    </>
                )
            }
            </Media>
            
        </div>
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
        </>
    )
}

export async function getServerSideProps(context) {
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
