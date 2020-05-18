import React, { Component } from 'react'
import styles from "./LastVenueWidget.module.scss"

function ResultsHeaderRow(props) {
    return (
        <div className={`${styles.resultsRow} ${styles.header}`}>
            <span className={`${styles.position} ${styles.header}`}>Poz.</span>
            <span className={styles.driver}>Pilot</span>
            <span className={styles.time}>Čas/strata</span>
        </div>
    )
}

function ResultsRow(props) {
    return (
        <div className={`${styles.resultsRow} ${props.pos === "1" ? styles.noBorder : ""}`}>
            <span className={styles.position}>{props.pos}.</span>
            <span className={styles.driver}>{props.name}</span>
            <span className={styles.time}>{props.time}</span>
        </div>
    )
}

class LastVenueWidget extends Component {
    render() {
        const { venueName, data } = this.props

        return (
            <div className={styles.content}>
                <div className={styles.venueBlock}>
                    <p className={styles.venueTitle}>VC Rakúska</p>
                </div>
                <ResultsHeaderRow />
                {/*
                    data.RaceTable.Races[0].Results.slice(0, 10).map(positionData => (
                        <ResultsRow 
                            pos={positionData.position} 
                            name={`${positionData.Driver.givenName} ${positionData.Driver.familyName}`} 
                            time={
                                positionData.status === "Finished" ? 
                                    `${positionData.Time.time.replace('.', ',')}${positionData.position > 1 ? 's' : ''}` :
                                    positionData.status.replace("Laps", "kolá").replace("Lap", "kolo").replace("Retired", "Nedokončil")
                            }/>
                    ))*/
                    <div className={styles.temporaryPanel}>
                        <img alt="logo"></img>
                        <span>Štartujeme 5. júla na Red Bull Ringu!</span>
                    </div>
                }
        
            </div>
        )

    }
}
export default LastVenueWidget