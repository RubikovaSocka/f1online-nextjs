import React, { Fragment } from 'react'
import axios from 'axios'
import Link from 'next/link'
import NProgress from 'nprogress'

import QuickNews from "../../components/QuickNews/QuickNews.js";
import RPanel from "../../components/RPanel.js";
import CalResWidget from '../../components/CalResWidget/CalResWidget.js';
import SectionTitle from '../../components/SectionTitle/SectionTitle.js';
import Divider from '../../components/Divider.js';
import LoadingSpinner from '../../components/LoadingSpinner.js'

import styles from './TeamPage.module.scss'
import ArchivArticles from '../../components/ArchivArticles/ArchivArticles.js';

function getCName(team) {
    switch(team) {
        case "Mercedes":
          return styles.slider00D2BE
        case "Ferrari":
            return styles.sliderDC0000
        case "Red Bull":
            return styles.slider0600EF
        case "Renault":
            return styles.sliderFFF500
        case "McLaren":
            return styles.sliderFF8700
        case "Racing Point":
            return styles.sliderF596C8
        case "Alfa Romeo":
            return styles.slider960000
        case "Alpha Tauri":
            return styles.sliderE0E0E0
        case "Haas":
            return styles.slider787878
        case "Williams":
            return styles.slider0082FA
    } 
}

export default function TeamPage({ teamData }) {

    let teamDataBlock = (
        <Fragment>
            <SectionTitle title={`${teamData.name}`}/>
            <Divider height='20px' />
            <div className={styles.briefInfoContainer}>
                <div className={styles.imageData}>
                    
                    {<img className={styles.logo} 
                        alt={`Logo tímu ${teamData.name}`} 
                        src={`https://wpadmin.f1online.sk/wp-content/uploads/logo-${teamData.slug}.jpg`} />}
                </div>
                
                <div className={styles.tableContainer}>
                    {/*<div className={styles.numberContainer}>
                        <img alt={`Číslo ${team.permanentNumber}`} src={`https://wpadmin.f1online.sk/wp-content/uploads/${team.permanentNumber}.jpg`}/> 
                    </div>*/}
                    <div className={styles.table} /*style={{borderTop: `2px solid ${team.teamColor}`}}*/>
                        <div className={styles.halfCircle} />
                        <div className={styles.row}>
                            <span>Sídlo</span>
                            <span>{`${teamData.base}, ${teamData.country}`}</span>
                        </div>
                        <div className={styles.row}>
                            <span>Šéf tímu</span>
                            <span>{`${teamData['team-boss']}`}</span>
                        </div>
                        <div className={styles.row}>
                            <span>Technický riaditeľ</span>
                            <span>{`${teamData['technical-chief']}`}</span>
                        </div>
                        <div className={styles.row}>
                            <span>Šasi</span>
                            <span>{`${teamData.chassis}`}</span>
                        </div>
                        <div className={styles.row}>
                            <span>Pohonná jednotka</span>
                            <span>{`${teamData.engine}`}</span>
                        </div>
                        <div className={styles.row}>
                            <span>Tituly</span>
                            <span>{`${teamData.championships}`}</span>
                        </div>
                        <div className={styles.row}>
                            <span>Víťazstvá</span>
                            <span>{`${teamData.wins}`}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.portraitsContainer}>
                    <div className={styles.portraitContainer}>
                        <Link href='/piloti/[id]' as={`/piloti/${teamData.Drivers[0].driverId}`}>
                            <a onClick={() => NProgress.start()}>
                                <img alt={`${teamData.Drivers[0].givenName} ${teamData.Drivers[0].familyName} portrét`} 
                                    src={teamData.Drivers[0].img300}
                                    className={styles.portrait}></img>
                                <span>{`${teamData.Drivers[0].givenName} ${teamData.Drivers[0].familyName}`}</span>
                            </a>
                        </Link>
                    </div>
                        
                    <div className={styles.portraitContainer}>
                        <Link href='/piloti/[id]' as={`/piloti/${teamData.Drivers[1].driverId}`}>
                            <a onClick={() => NProgress.start()}>
                                <img alt={`${teamData.Drivers[1].givenName} ${teamData.Drivers[1].familyName} portrét`} 
                                    src={teamData.Drivers[1].img300}
                                    className={styles.portrait}></img>
                                <span>{`${teamData.Drivers[1].givenName} ${teamData.Drivers[1].familyName}`}</span>
                            </a>
                        </Link>
                    </div>
                </div> 
            </div>
        </Fragment>
    )

    let teamPosts = (
        <ArchivArticles asArchive={false} perpage='3' />
    )

    NProgress.done()

    return (
        <main className="contentsPage">
            <div className="page">
                <div className="mainContent">
                    
                    {/*<img className={styles.image} src='' />*/}
                    <div className={styles.container}>
                        { teamDataBlock }                         

                        <Divider height='30px' />
                        <div className={styles.titleContainer}>
                            <h2 className={styles.title}>Najnovšie články</h2>
                        </div>
                        { teamPosts }
                        <div className={styles.titleContainer}>
                            <h2 className={styles.title}>História</h2>
                        </div>
                        
                        <article className={styles.history}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a sem sit amet nibh fermentum condimentum id id justo. Morbi placerat leo sit amet elementum ultricies. Pellentesque mattis massa vitae augue tincidunt bibendum. Etiam consequat tincidunt egestas. Fusce eleifend sit amet ex fringilla euismod.</p>
                            <p>Sed faucibus volutpat gravida. Duis eget tortor sed libero suscipit elementum nec ut dui. Quisque vitae enim ut ante gravida egestas. Phasellus risus ipsum, suscipit congue lectus eget, eleifend venenatis dolor. Sed nec tellus eget justo rhoncus congue.</p>
                            <p>Mauris porttitor tristique purus, vel rhoncus turpis placerat vel. Nulla quam arcu, porta eget neque in, fermentum iaculis ipsum. Quisque venenatis velit et quam posuere, in sagittis risus rhoncus.</p>
                            <p>Mauris posuere justo eget nunc bibendum mollis. Duis nec tellus vel felis blandit iaculis. Proin imperdiet vitae purus nec bibendum. Vestibulum id eros sed urna mattis tempor. Donec elementum tincidunt mauris, nec viverra ipsum ullamcorper in.</p>
                            <p>Morbi id purus urna. Sed finibus eget lacus sed blandit. Aenean et volutpat orci, sagittis ornare mi. Aenean eget finibus magna, eu feugiat sapien. Etiam aliquam, urna eu consequat semper, elit sem fringilla nulla, eget varius metus augue a massa.</p>
                        </article>
                            
                        
                        {/*<div className={styles.titleContainer}>
                            <h2 className={styles.title}>Galéria</h2>
                            <Divider height='15px' />
                            <div style={{width: '100%'}}>
                            </div>
                            
                        </div>*/}
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
    const responseTeamData = await axios({
        method: 'get',
        url: `https://wpadmin.f1online.sk/wp-content/uploads/${params.id}.json`
        //headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
    })

    //TODO: zmen na jazdcov tag
    const responseTeamPosts = await axios({
        method: 'get',
        url: 'https://wpadmin.f1online.sk/wp-json/wp/v2/posts?per_page=3'
        //headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
    })

    return {
        props: {
            teamData: responseTeamData.data,
            postsData: responseTeamPosts.data
        }
    }
}
