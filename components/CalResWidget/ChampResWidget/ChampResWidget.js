import React, { Component } from 'react'

import styles from "./ChampResWidget.module.scss"

function ResultsHeaderRow(props) {
    return (
        <div className={`${styles.resultsRow} ${styles.header}`}>
            <span className={`${styles.position} ${styles.header}`}>Poz.</span>
            <span className={styles.driver}>Pilot</span>
            <span className={styles.time}>Body</span>
        </div>
    )
}

function getPointsCell(pts) {
    if(pts == 1) {
        return '1 bod'
    } else if (pts > 1 && pts < 5) {
        return `${pts} body`
    } else return `${pts} bodov`
}

function ResultsRow(props) {
    
    return (
        <div className={`${styles.resultsRow} ${props.pos === "1" ? styles.noBorder : ""}`}>
            <span className={styles.position}>{props.pos}.</span>
            <span className={styles.driver}>{props.name}</span>
            <span className={styles.time}>{getPointsCell(props.points)}</span>
        </div>
    )
}

class ChampResWidget extends Component {
    render() {
        return (
            <div className={styles.content}>
                <div className={styles.venueBlock}>
                    <p className={styles.venueTitle}>{`Poradie po VC ${this.props.venueName}`}</p>
                </div>
                <ResultsHeaderRow />
                {
                    this.props.data.slice(1, 11).map(positionData => (
                        <ResultsRow 
                            pos={positionData.position} 
                            name={positionData.driverName} 
                            points={positionData.points}
                        />
                    ))
                }
            </div>
        )
    }
}
export default ChampResWidget