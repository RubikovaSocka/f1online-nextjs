import React, { Fragment, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import formatDate from '../../utils/dateFormatter';
import Fonts from '../../utils/Fonts'

import QuickNews from '../../components/QuickNews/QuickNews';
import RPanel from '../../components/RPanel';
import CalResWidget from '../../components/CalResWidget/CalResWidget';


import LoadingSpinner from '../../components/LoadingSpinner';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Divider from '../../components/Divider';

import EmbedContainer from 'react-oembed-container';
import styles from './QuickNewsPage.module.scss'

export default function QuickNewsPage ({ postsData }) {

    useEffect(() => {
        Fonts()
    }, []);

    let news = (
        <Fragment>
            <SectionTitle title='Rýchle správy' />
            <Divider height='20px' />
            <div className={styles.newsBlock}>
                {postsData.map(newsItem => (
                    <div className={styles.newsItemContainer}>
                        <span className={styles.date}>{formatDate(newsItem.date)}</span>
                        <div className={styles.text} 
                            dangerouslySetInnerHTML={{__html: newsItem.acf.obsah_rychlej_spravy}} />
                        <EmbedContainer markup={newsItem.acf.embed_zo_socialnych_sieti}>
                            <div className={styles.embed} 
                                dangerouslySetInnerHTML={{__html: newsItem.acf.embed_zo_socialnych_sieti}}></div>
                        </EmbedContainer>
                    </div>
                ))
                }
                <Link href="/rychle-spravy"><a className="basicButton" style={{marginTop: '10px', width:'200px'}}>Viac rýchlych správ</a></Link>
            </div>
        </Fragment>
    )

    return (
        <main className="contentsPage">
            <div className="page">
                <div className="mainContent">
                    {/*<img className={styles.image} src='' />*/}
                    {news}
                </div>
                <aside className="sideBar">
                    <RPanel />
                    <CalResWidget />
                </aside>
            </div>
        </main>
    )
}

export async function getServerSideProps({ params }) {
    console.log(params)
    const response = await axios({
        method: 'get',
        url: `https://wpadmin.f1online.sk/wp-json/wp/v2/rychle_spravy?per_page=12`
    })

    return {
        props: {
            id: params.id,
            postsData: response.data
        }
    }
}