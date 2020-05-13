import React, { Component } from 'react'
import styles from './SocialMediaPlugin.module.scss'

export default class SocialMediaBasicPlugin extends Component {

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.item}>
                    <a className="noOutline" href="https://www.facebook.com/f1online.sk/" target="_blank"><img alt="ikona pre facebook" src="https://wpadmin.f1online.sk/wp-content/uploads/fb-icon.jpg" /></a>
                </div>
                <div className={styles.item}>
                    <a href="https://www.instagram.com/stevoeiselef1/" target="_blank" className="noOutline"><img alt="ikona pre instagram" src="https://wpadmin.f1online.sk/wp-content/uploads/insta-icon.jpg" /></a>
                </div>
            </div>
        )
    }
}
