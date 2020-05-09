import React, { Component } from 'react'
import styles from './SectionTitle.module.scss'

export class SectionTitle extends Component {
    render() {
        return (
            <div className={styles.titleContainer}>
                <h2 className={styles.title}>{this.props.title}</h2>
            </div>
        )
    }
}

export default SectionTitle
