import React, { useEffect, Fragment } from 'react'
import axios from 'axios'
import Fonts from '../../utils/Fonts'
import QuickNews from "../../components/QuickNews/QuickNews.js";
import RPanel from "../../components/RPanel.js";
import CalResWidget from '../../components/CalResWidget/CalResWidget.js';
import SectionTitle from '../../components/SectionTitle/SectionTitle.js';
import Divider from '../../components/Divider.js';
import LoadingSpinner from '../../components/LoadingSpinner.js'

import styles from './DriverPage.module.scss'
import ArchivArticles from '../../components/ArchivArticles/ArchivArticles.js';

import ImageGallery from '../../components/react-image-gallery/src/ImageGallery';

export default function DriverPage({ driverData, team}) {

    useEffect(() => {
        Fonts()
    }, []);
    
    let driverBioData = (
        <Fragment>
            <SectionTitle title={`${driverData.givenName} ${driverData.familyName}`}/>
            <Divider height='20px' />
            <div className={styles.briefInfoContainer}>
                <img className={styles.driverPortrait} alt={`Portrét pilota ${driverData.givenName} ${driverData.familyName}`} src={driverData.img800} />
                <div className={styles.tableContainer}>
                    {<div className={styles.numberContainer}>
                        <img alt={`Číslo ${driverData.permanentNumber}`} src={`https://wpadmin.f1online.sk/wp-content/uploads/${driverData.permanentNumber}.jpg`}/> 
                    </div>}
                    <div className={styles.table}>
                        <div className={styles.halfCircle} />
                        <div className={styles.row}>
                            <span>Tím</span>
                            <span>{`${team}`}</span>
                        </div>
                        <div className={styles.row}>
                            <span>Štátna príslušnosť</span>
                            <span>{`${driverData.nationality}`}</span>
                        </div>
                        <div className={styles.row}>
                            <span>Víťazstvá</span>
                            <span>{`${driverData.stats.wins}`}</span>
                        </div>
                        <div className={styles.row}>
                            <span>Pódiá</span>
                            <span>{`${driverData.stats.podiums}`}</span>
                        </div>
                        <div className={styles.row}>
                            <span>Pole Positions</span>
                            <span>{`${driverData.stats.poles}`}</span>
                        </div>
                        <div className={styles.row}>
                            <span>Body</span>
                            <span>{`${driverData.stats.points}`}</span>
                        </div>
                        <div className={styles.row}>
                            <span>Narodený</span>
                            <span>{`${driverData.dateOfBirth.split('-')[2]}. ${driverData.dateOfBirth.split('-')[1]}. ${driverData.dateOfBirth.split('-')[0]}, ${driverData.town}`}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )

    let driverPosts = (
        <ArchivArticles asArchive={false} perpage='3' />
    )

    const images = [
        {
            original: 'https://wpadmin.f1online.sk/wp-content/uploads/haas-008-768x480.jpg',
            thumbnail: 'https://wpadmin.f1online.sk/wp-content/uploads/haas-008-300x188.jpg',
        },
        {
            original: 'https://wpadmin.f1online.sk/wp-content/uploads/haas-007-768x480.jpg',
            thumbnail: 'https://wpadmin.f1online.sk/wp-content/uploads/haas-007-300x188.jpg',
        },
        {
            original: 'https://wpadmin.f1online.sk/wp-content/uploads/haas-006-768x480.jpg',
            thumbnail: 'https://wpadmin.f1online.sk/wp-content/uploads/haas-006-300x188.jpg',
        },
        {
            original: 'https://wpadmin.f1online.sk/wp-content/uploads/haas-005-768x480.jpg',
            thumbnail: 'https://wpadmin.f1online.sk/wp-content/uploads/haas-005-300x188.jpg',
        },
        {
            original: 'https://wpadmin.f1online.sk/wp-content/uploads/haas-004-768x480.jpg',
            thumbnail: 'https://wpadmin.f1online.sk/wp-content/uploads/haas-004-300x188.jpg',
        },
        {
            original: 'https://wpadmin.f1online.sk/wp-content/uploads/haas-003-768x480.jpg',
            thumbnail: 'https://wpadmin.f1online.sk/wp-content/uploads/haas-003-300x188.jpg',
        },
    ];

    return (
        <main className="contentsPage">
            <div className="page">
                <div className="mainContent">
                    
                    {/*<img className={styles.image} src='' />*/}
                    
                    <div className={styles.container}>
                        {driverBioData}

                        <Divider height='30px' />
                        <div className={styles.titleContainer}>
                            <h2 className={styles.title}>Najnovšie články</h2>
                        </div>
                        {driverPosts}
                        <div className={styles.titleContainer}>
                            <h2 className={styles.title}>Biografia</h2>
                        </div>
                        <article className={styles.biography}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a sem sit amet nibh fermentum condimentum id id justo. Morbi placerat leo sit amet elementum ultricies. Pellentesque mattis massa vitae augue tincidunt bibendum. Etiam consequat tincidunt egestas. Fusce eleifend sit amet ex fringilla euismod.</p>
                            <p>Sed faucibus volutpat gravida. Duis eget tortor sed libero suscipit elementum nec ut dui. Quisque vitae enim ut ante gravida egestas. Phasellus risus ipsum, suscipit congue lectus eget, eleifend venenatis dolor. Sed nec tellus eget justo rhoncus congue.</p>
                            <p>Mauris porttitor tristique purus, vel rhoncus turpis placerat vel. Nulla quam arcu, porta eget neque in, fermentum iaculis ipsum. Quisque venenatis velit et quam posuere, in sagittis risus rhoncus.</p>
                            <p>Mauris posuere justo eget nunc bibendum mollis. Duis nec tellus vel felis blandit iaculis. Proin imperdiet vitae purus nec bibendum. Vestibulum id eros sed urna mattis tempor. Donec elementum tincidunt mauris, nec viverra ipsum ullamcorper in.</p>
                            <p>Morbi id purus urna. Sed finibus eget lacus sed blandit. Aenean et volutpat orci, sagittis ornare mi. Aenean eget finibus magna, eu feugiat sapien. Etiam aliquam, urna eu consequat semper, elit sem fringilla nulla, eget varius metus augue a massa.</p>
                        </article>
                            
                        
                        <div className={styles.titleContainer}>
                            <h2 className={styles.title}>Galéria</h2>
                            <Divider height='15px' />
                            <div style={{width: '100%'}}>
                            <ImageGallery showPlayButton={false} showFullscreenButton={false} items={images} className={styles.galleryEdit} />
                            </div>
                            
                        </div>
                    </div>
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

export async function getServerSideProps({ params }) {
    const responseDriverData = await axios({
        method: 'get',
        url: `https://wpadmin.f1online.sk/wp-content/uploads/${params.id}.json`
        //headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
    })

    //TODO: zmen na jazdcov tag
    const responseDriverPosts = await axios({
        method: 'get',
        url: 'https://wpadmin.f1online.sk/wp-json/wp/v2/posts?per_page=3'
        //headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
    })

    return {
        props: {
            driverData: responseDriverData.data,
            postsData: responseDriverPosts.data
        }
    }
}