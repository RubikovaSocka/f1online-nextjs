import React, { Component } from 'react'
import styles from './SearchBar.module.scss'

export default class SearchBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            width: 0,
            height: 0,
            showFormClicked: false
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
        this.openSearchBar = this.openSearchBar.bind(this)
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
        this.setState({
            width: window.innerWidth, 
            height: window.innerHeight 
        });
        console.log(this.state)
    }

    openSearchBar() {
        console.log("Open Search Bar clicked " + this.state.width)
        this.setState((prev) => {
            return {
                showFormClicked: !prev.showFormClicked
            }
        })
    }

    render() {
        let button;
        
        if(this.state.width < 1366) {   //mobile
            button = <div onClick={this.openSearchBar} className={styles.buttonContent}></div>
        } else {    //desktop
            button = <button type="submit"><div className={styles.buttonContent}></div></button>
        }

        return (
            <div className={styles.container}>
                <form className={`${styles.searchForm}`}>
                    <input type="text" placeholder="Hľadať" 
                        className={`ifont ${this.state.showFormClicked ? styles.show : ''}`}
                        aria-label="Search" />
                    {button}
                </form>
            </div>
        )
    }
}
