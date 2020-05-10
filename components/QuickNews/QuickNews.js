import React, { Component } from 'react'
import axios from 'axios'
import Link from "next/link"
import styles from './QuickNews.module.scss'
import formatDate from '../../utils/dateFormatter';
import SideSectionTitle from '../SideSectionTitle/SideSectionTitle';
import LinkAsButton from '../LinkAsButton/LinkAsButton';
import LoadingSpinner from '../LoadingSpinner';
import { Fragment } from 'react';

function OneLineNews(props) {
    return (
        <div className={styles.newsItemContainer}>
            <p className={styles.date}>{props.date}</p>
            <div className={`${styles.messageContainer}`}>
                <div>
                    <div className={styles.message} dangerouslySetInnerHTML={{__html: props.content}} />
                    {
                        props.embed.length > 0 ? <LinkAsButton className={`${styles.linkStyle} ${styles.clickable}`} target={`/rychle-spravy/${props.id}`} title={'Zobraziť'}/> : ''
                    }
                </div>
            </div>
        </div>
    )
}

class QuickNews extends Component {

    state = {
        newsArray: [],
        isLoaded: false
    }

    componentDidMount() {
        console.log("quicknews")
        axios.get(`https://wpadmin.f1online.sk/wp-json/wp/v2/rychle_spravy?per_page=12`)
            //.then(res => console.log(res))
            .then(res => this.setState({
                newsArray: res.data,
                isLoaded: true
            }))
            .catch(err => console.log(err))
    }

    render() {
        let news;
        if(this.state.isLoaded) {
            news = (
                <Fragment>
                    {this.state.newsArray.map((newsItem, index) => (
                        <OneLineNews 
                            key={index}
                            id={newsItem.id}
                            date={formatDate(newsItem.date)}
                            content={newsItem.acf.obsah_rychlej_spravy}
                            embed={newsItem.acf.embed_zo_socialnych_sieti}
                        />
                    ))
                    }
                    <Link href="/rychle-spravy"><a className="basicButton" style={{marginTop: '10px', width:'80%'}}>Viac rýchlych správ</a></Link>
                </Fragment>
            )
        } else {
            news = <LoadingSpinner />
        }

        return (
            <div>
                <SideSectionTitle title="Rýchle správy" />
                <div className={`${styles.scrollableBlock} ${styles.quickNewsBlock}`}>
                    { news }
                </div>
            </div>
        )
        
    }
}

export default QuickNews