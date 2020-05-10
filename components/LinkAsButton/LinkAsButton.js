import React, { Component } from 'react'
import styles from './LinkAsButton.module.scss'
import Link from "next/link"

export class LinkAsButton extends Component {
    render() {
        return (
            <div className={styles.container}>
                <Link href={`${this.props.target}`} as={`${this.props.target}`}>
                    <a>{this.props.title}</a>
                </Link>
                <img alt="" src="https://wpadmin.f1online.sk/wp-content/uploads/arrow-r.jpg"/>
                
            </div>
        )
    }
}

export default LinkAsButton
