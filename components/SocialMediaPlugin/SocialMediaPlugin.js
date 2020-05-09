import React, { Component } from 'react'
import styles from './SocialMediaPlugin.module.scss'

export default class SocialMediaBasicPlugin extends Component {

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.item}>
                    <a className="noOutline" href="https://www.facebook.com/f1online.sk/" target="blank"><img alt="ikona pre facebook" src="./imgs/fb-icon.png" /></a>
                </div>
                <div className={styles.item}>
                    <a href="https://instagram.com" className="noOutline"><img alt="ikona pre instagram" src="./imgs/insta-icon.png" /></a>
                </div>
            </div>
        )
    }
}
