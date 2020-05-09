import React, { Component, Fragment } from 'react'
import { Link } from 'next/link'
import axios from 'axios'
import Fonts from './Fonts'

import RPanel from '../components/RPanel';
import CalResWidget from '../components/CalResWidget/CalResWidget';
import formatDate from '../utils/dateFormatter';
import LoadingSpinner from '../components/LoadingSpinner';

import SectionTitle from '../components/SectionTitle/SectionTitle';
import Divider from '../components/Divider';

import EmbedContainer from 'react-oembed-container';
import styles from './scss/rychle-spravy.module.scss'

export class QuickNewsPage extends Component {
    
    state = {
        newsArray: [],
        isLoaded: false
    }

    componentDidMount() {
        Fonts()
        axios.get(`https://wpadmin.f1online.sk/wp-json/wp/v2/rychle_spravy?per_page=12`)
            //.then(res => console.log(res))
            .then(res => this.setState({
                newsArray: res.data,
                isLoaded: true
            }))
            .catch(err => console.log(err))
    }

    render() {
        
        /*new Embedo({
            /*facebook: {
                appId: '2583504588587008', // Enable facebook SDK
                version: 'v2.10'
    },
                twitter: true,  // Enable twitter SDK
                instagram: true,  // Enable instagram SDK
                reddit: true,
                youtube: true
            });*/

        //let elem = <div></div>;
        //let my_embedo = embedo.load(elem, 'https://twitter.com/SoyMotor/status/1257739209810550785')

        let news;
        if(this.state.isLoaded) {
            news = (
                <Fragment>
                    <SectionTitle title='Rýchle správy' />
                    <Divider height='20px' />
                    <div className={styles.newsBlock}>
                        {this.state.newsArray.map(newsItem => (
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
                        {/*<Link className="basicButton" style={{marginTop: '10px', width:'200px'}} to="/rychle-spravy">Viac rýchlych správ</Link>*/}
                    </div>
                </Fragment>
            )
        } else {
            news = <LoadingSpinner />
        }

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
}

export default QuickNewsPage
