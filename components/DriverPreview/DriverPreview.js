import React, { Component } from 'react'
import styles from './DriverPreview.module.scss'
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

export class DriverPreview extends Component {
    render() {
        const { driver, team, teamColor } = this.props
        return (
            <div className={styles.container}>
                <Link href="/piloti/[id]" as={`/piloti/${driver.driverId}`}>
                    <a>
                    <img alt={`${driver.givenName} ${driver.familyName} portrét`} 
                        src={driver.img300}
                        className={styles.portrait}></img>
                    <div className={`${styles.driverBoxLine}`} style={{borderColor: teamColor}}>
                        <div className={`${styles.driverBox}`}>
                        
                            <div className={`${styles.name} ${styles.slider} ${getCName(team)}`} 
                                title={`${driver.givenName} ${driver.familyName}`}
                                style={{borderColor: teamColor}} />
                            <div className={`${styles.team} ${styles.slider} ${getCName(team)}`} 
                                title={`${team}`}
                                style={{borderColor: teamColor}} />
                                        
                        </div>
                    </div>
                    </a>
                </Link>
            </div>
        )
    }
}

export default DriverPreview
