import React, { Component, Fragment, useMountEffect, useEffect, useRef } from 'react'
import axios from 'axios'
import Head from 'next/head'
import formatDate from '../../utils/dateFormatter';

import QuickNews from '../../components/QuickNews/QuickNews';
import RPanel from '../../components/RPanel';
import CalResWidget from '../../components/CalResWidget/CalResWidget';

import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Divider from '../../components/Divider';

import EmbedContainer from 'react-oembed-container';
import styles from './QuickNewsPage.module.scss'
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingSpinner from '../../components/LoadingSpinner'

//const useMountEffect = (fun) => useEffect(fun, [])

export default class QuickNewsPage extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            items: this.props.postsData,
            hasMore: true
        }
        this.selectedRef = React.createRef();
    }

    componentDidMount() {
        //this.selectedRef = null
        if(Object.keys(this.selectedRef).length != 0) {
            window.scrollTo({
                top: this.selectedRef.current.offsetTop - 120,
                behavior: 'smooth',
              })
        }
    }

    fetchMoreData = () => {
        
        axios.get(`https://wpadmin.f1online.sk/wp-json/wp/v2/rychle_spravy?per_page=15&offset=${this.state.items.length}`)
            //.then(res => console.log(res))
            .then(res => this.setState({
                items: this.state.items.concat(res.data),
                hasMore: res.data.length === 15
            }))
            .catch(err => console.log(err))
      };

    render() {
        const { items, id } = this.state
        
        return (
            <>
            <Head>
                <title>Rýchle správy | F1online.sk</title>
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`Rýchle správy | F1online.sk`} />
                <meta property="og:description" content={`Najnovšie správy zo sveta Formuly 1. Piloti, tímy, okruhy, výsledky, štatistiky...`} />
                <meta property="og:url" content={`https://f1online.sk/rychle-spravy`} />
                <meta property="og:image" content={`https://wpadmin.f1online.sk/wp-content/uploads/title-logo-wb.png`} />
            </Head>
            <main className="contentsPage">
                <div className="page">
                    <div className="mainContent">
                        {/*<img className={styles.image} src='' />*/}
                        <SectionTitle title='Rýchle správy' />
                        <Divider height='20px' />
                        <InfiniteScroll
                            dataLength={items.length}
                            next={this.fetchMoreData}
                            hasMore={this.state.hasMore}
                            loader={<LoadingSpinner />}
                            //height={600}
                            endMessage={
                                <p style={{ fontFamily: 'HK Grotesk', textAlign: "center" }}>
                                    <b>Toto bola posledná rýchla správa.</b>
                                </p>
                            }
                        >
            
                        {/*<div className={styles.newsBlock}>*/}
                            {
                                items.map((newsItem, index) => (
                                    <div key={index} ref={newsItem.id === parseInt(id) ? this.selectedRef : null} className={styles.newsItemContainer}>
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
                            {/*<Link href="/rychle-spravy"><a className="basicButton" style={{marginTop: '10px', width:'200px'}}>Viac rýchlych správ</a></Link>*/}
                        {/*</div>*/}
                     </InfiniteScroll>
                    </div>
                    <aside className="sideBar">
                        <Divider height="50px" />
                        <RPanel />
                        <CalResWidget />
                    </aside>
                </div>
            </main>
            </>
        )
    }
}

export async function getServerSideProps({ params }) {
    console.log(params)
    const response = await axios({
        method: 'get',
        url: `https://wpadmin.f1online.sk/wp-json/wp/v2/rychle_spravy?per_page=15`
    })

    return {
        props: {
            id: params.id,
            postsData: response.data
        }
    }
}