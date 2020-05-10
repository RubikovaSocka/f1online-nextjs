import React, { Fragment, useEffect, useRef } from 'react'
import axios from 'axios'
import Link from 'next/link'
import formatDate from '../../utils/dateFormatter';
import NProgress from 'nprogress'

import QuickNews from '../../components/QuickNews/QuickNews';
import RPanel from '../../components/RPanel';
import CalResWidget from '../../components/CalResWidget/CalResWidget';

import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Divider from '../../components/Divider';

import EmbedContainer from 'react-oembed-container';
import styles from './QuickNewsPage.module.scss'

const useMountEffect = (fun) => useEffect(fun, [])



export default function QuickNewsPage ({ postsData, id }) {
    const selectedRef = useRef(null)

    NProgress.done()

    let news = (
        <>
            <SectionTitle title='Rýchle správy' />
            <Divider height='20px' />
            <div className={styles.newsBlock}>
                {
                    postsData.map((newsItem, index) => (
                        <div ref={newsItem.id === parseInt(id) ? selectedRef : useRef(null)} key={index} className={styles.newsItemContainer}>
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
        </>
    )

    useMountEffect(() => {
        if(Object.keys(selectedRef).length != 0) {
            setTimeout(window.scrollTo({
                top: selectedRef.current.offsetTop - 120,
                behavior: 'smooth',
              }), 3000)
            
        }
    })

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
            {useMountEffect(() => {
                window.scrollTo({
                    top: selectedRef.current.offsetTop,
                    behavior: 'smooth',
                  })
                })
            }
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