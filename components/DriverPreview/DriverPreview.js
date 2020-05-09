import React, { Component } from 'react'
import styles from './DriverPreview.module.scss'

import { Link } from 'next/link'

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

        return (
            <div className={styles.container}>
                {/*<Link href="/piloti2" as="/piloti2"*/}
                {/*to={`/piloti/${this.props.driver.driverId}`}>*/}
                    <a>
                    <img alt={`${this.props.driver.givenName} ${this.props.driver.familyName} portrét`} 
                        src={this.props.driver.img300}
                        className={styles.portrait}></img>
                    <div className={`${styles.driverBoxLine}`} style={{borderColor: this.props.teamColor}}>
                        <div className={`${styles.driverBox}`}>
                        
                            <a className={`${styles.name} ${styles.slider} ${getCName(this.props.team)}`} 
                                title={`${this.props.driver.givenName} ${this.props.driver.familyName}`}
                                style={{borderColor: this.props.teamColor}} />
                            <a className={`${styles.team} ${styles.slider} ${getCName(this.props.team)}`} 
                                title={`${this.props.team}`}
                                style={{borderColor: this.props.teamColor}} />
                                        
                        </div>
                    </div>
                    </a>
                {/*</Link>*/}
            </div>
        )
    }
}

export default DriverPreview
