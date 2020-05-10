import React, { Component } from 'react'
import styles from './TeamPreview.module.scss'
import DriverPreview from '../DriverPreview/DriverPreview';
import Link from 'next/link'

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

export class TeamPreview extends Component {


    render() {
        
        const { constructor } = this.props
        console.log(constructor.img800)

        let drivers = constructor.Drivers.map(driver => {
            return (
                <DriverPreview driver={driver} 
                    team={constructor.name} 
                    teamColor={constructor.teamColor}/>
            )
        })

        return (
            <div className={styles.container}>
                <Link href='timy/[id]' as={`/timy/${constructor.slug}`} >
                    <a className={`noOutline`} style={{marginBottom: '5px'}}><span className={styles.teamName}>{constructor.name}</span></a>
                </Link>
                <Link href='timy/[id]' as={`/timy/${constructor.slug}`} >
                    <a className={`noOutline ${styles.logoContainer}`} style={{marginBottom: '5px'}}><img className={styles.teamLogo} alt={`Logo tímu ${constructor.name}`} src={constructor.img800} /></a>
                </Link>
                <div className={styles.driverRow}>
                    {
                        constructor.Drivers.map(driver => {
                            return (
                            <Link href='piloti/[id]' as={`/piloti/${driver.driverId}`} passHref> 
                                    <div className={`noOutline ${styles.driverBoxLine}`} style={{borderColor: constructor.teamColor}}>
                                    <div className={`${styles.driverBox}`}>
                                        <a className={`${styles.name} ${styles.slider} ${getCName(constructor.name)}`} 
                                            title={`${driver.givenName} ${driver.familyName}`}
                                            style={{borderColor: constructor.teamColor}} />
                                    </div>
                                    </div>
                            </Link>
                            )
                        })
                    }
                </div>
                
            </div>
        )
    }
}

export default TeamPreview
