import { Component, Fragment } from 'react'
import axios from 'axios'
import EmbedContainer from 'react-oembed-container'

import Head from 'next/head'
import Date from '../../../components/date'
import utilStyles from '../../../styles/utils.module.css'
import formatDate from '../../../utils/dateFormatter.js';
import Fonts from '../../../utils/Fonts'

import QuickNews from '../../../components/QuickNews/QuickNews'
import RPanel from '../../../components/RPanel'
import CalResWidget from '../../../components/CalResWidget/CalResWidget'

import styles from './Post.module.scss'

export default class Post extends Component{

    componentDidMount() {
        Fonts()
    }
    
    render (){
        const { postData } = this.props
        let post = (
            <Fragment>
                <div className={styles.title}>
                    <h1>{postData.title.rendered}</h1>
                </div>
                <div className={styles.imageContainer}>
                    <img alt={`${postData.better_featured_image.title}`} src={postData.better_featured_image.media_details.sizes.large.source_url} />
                    <span>zdroj: {postData.better_featured_image.caption}</span>
                </div>
                <div className={styles.authorContainer}>
                    <span>{postData._embedded.author[0].name}</span>
                    <br />
                    <span>{formatDate(postData.date)}</span>
                </div>
                <EmbedContainer markup={postData.content.rendered}>
                    <div className={styles.articleContent} dangerouslySetInnerHTML={{ __html: postData.content.rendered}} />
                </EmbedContainer>
            </Fragment>
        )

        return (
            <main className="contentsPage">
                <div className="page">
                    <div className="mainContent">
                        {post}
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

export async function getServerSideProps({ params }) {
    console.log(params)
    const response = await axios({
        method: 'get',
        url: `https://wpadmin.f1online.sk/wp-json/wp/v2/posts/${params.id}?_embed`
        //headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
    })
    axios.get(`https://wpadmin.f1online.sk/wp-content/plugins/counter/count.php?id=${params.id}`)
        .then(res => {
            
        })  

    return {
        props: {
            postData: response.data
        }
    }
}