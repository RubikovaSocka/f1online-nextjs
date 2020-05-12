import { Fragment, useEffect } from 'react'
import axios from 'axios'
import EmbedContainer from 'react-oembed-container'
import ReactGA from 'react-ga'
import Head from 'next/head'
import formatDate from '../../../utils/dateFormatter.js';

import QuickNews from '../../../components/QuickNews/QuickNews'
import RPanel from '../../../components/RPanel'
import CalResWidget from '../../../components/CalResWidget/CalResWidget'

import styles from './Post.module.scss'

export default function Post({ postData }) {

    

    let post = (
        <Fragment>
            <div className={styles.title}>
                <h1>{postData.title.rendered}</h1>
            </div>
            <div className={styles.imageContainer}>
                <img alt={`${postData.better_featured_image.title}`} src={postData.better_featured_image.source_url} />
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
        <Fragment>
            <Head>
                <title>{postData.title.rendered} | F1online.sk</title>
                <meta property="og:type" content="article" />
                <meta property="og:title" content={`${postData.title.rendered} | F1online.sk`} />
                <meta property="og:description" content={`${postData.excerpt.rendered}`} />
                <meta property="og:url" content={`https://f1online.sk/clanky/${postData.id}/${postData.slug}`} />
                <meta property="og:image" content={`${postData.better_featured_image.source_url}`} />
            </Head>
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
        </Fragment>
    )
}


export async function getServerSideProps({ params }) {
    console.log(params)
    const response = await axios({
        method: 'get',
        url: `https://wpadmin.f1online.sk/wp-json/wp/v2/posts/${params.id}?_embed`
        //headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
    })
    axios.get(`https://wpadmin.f1online.sk/wp-content/plugins/counter/count.php?id=${params.id}`) 

    return {
        props: {
            postData: response.data
        }
    }
}