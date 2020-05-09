import React, { Component } from 'react'
//import { Button } from 'react-bootstrap';

import styles from "./SideWidgetButton.module.scss"

export default class SideWidgetButton extends Component {
    render() {
        return (
            <div className={styles.ButtonContainer}>
                <div onClick={this.props.onClick}
                        className={`${styles.WidgetButton} ${this.props.selected ? styles.selected : ""}`}>
                        <span>{this.props.title}</span>
                </div>
                <div className={`${styles.ArrowUp} ${this.props.selected ? styles.selected : ""}`}></div>
            </div>
        )
    }
}
