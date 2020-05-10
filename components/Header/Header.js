import React from "react"

import MyNavbar from "../Navbar/MyNavbar"
import SocialMediaBasicPlugin from '../SocialMediaPlugin/SocialMediaPlugin'
import SearchBar from '../SearchBar/SearchBar'
import { Link } from "next/link"

import styles from './Header.module.scss'

class Header extends React.Component {
    
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.whiteBack}>
                    <div className={styles.headerPanel}>
                        <SocialMediaBasicPlugin />
                        {/*<Link className="noOutline" href="/">*/}<a><img className={styles.logo} alt="logo F1online.sk" src="./images/logo-medium.png" /></a>{/*</Link>*/}
                        <SearchBar />
                    </div>
                </div>
                
                <MyNavbar/>
            </div>
        )
    }
}

export default Header