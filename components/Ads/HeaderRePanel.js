import React, { Component } from 'react'

import styles from './HeaderRePanel.module.scss'

export default class HeaderRePanel extends Component {


    render() {
        return (
            <div className={styles.container}>
                <a href="https://www.formulastore.sk/" target="blank">
                    <div className={styles.panel}>
                        {
                            //<img src="" />
                        }
                    </div>
                </a>
            </div>
        )   
    }
}
