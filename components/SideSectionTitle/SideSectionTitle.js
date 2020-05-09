import React, { Component } from 'react'

import styles from './SideSectionTitle.module.scss'

class SideSectionTitle extends Component {

    render() {
        return (
            <span className={styles.Title}>{this.props.title}</span>
        )
    }
}
export default SideSectionTitle