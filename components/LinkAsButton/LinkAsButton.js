import React, { Component } from 'react'
import styles from './LinkAsButton.module.scss'

import { Link } from "next/link"

export class LinkAsButton extends Component {
    render() {
        return (
            <div className={styles.container}>
                {/*<Link href="/results" as="/results">
                    <a>{this.props.title}</a>
                    <img alt="" src="imgs/arrow-r.png"/>
                </Link>*/}
            </div>
        )
    }
}

export default LinkAsButton
