import React from 'react'
import { Nav, Navbar, NavLink } from 'react-bootstrap'
import { Component } from 'react';
//import Link  from "next/link"
import Link from '../../utils/ActiveLink';
import styles from './MyNavbar.module.scss'
import NProgress from 'nprogress'
class MyNavbar extends Component {
    
    render() {
        return (
            <Navbar bg="light" expand="lg" className={styles.container}>
                <Nav className={`mr-auto ${styles.navbar}`}>
                    <Link activeClassName={styles.selected} href="/"><a><span>Domov</span><div className={styles.bottomLine}/></a></Link>
                    <Link activeClassName={styles.selected} href="/clanky"><a><span>Správy</span><div className={styles.bottomLine}/></a></Link>
                    <Link activeClassName={styles.selected} href="/vysledky"><a><span>Výsledky</span><div className={styles.bottomLine}/></a></Link>
                    <Link activeClassName={styles.selected} href="/piloti"><a><span>Piloti</span><div className={styles.bottomLine}/></a></Link>
                    <Link activeClassName={styles.selected} href="/timy"><a><span>Tímy</span><div className={styles.bottomLine}/></a></Link>
                    <Link activeClassName={styles.selected} href="/kalendar"><a><span>Kalendár</span><div className={styles.bottomLine}/></a></Link>
                </Nav>
            </Navbar>
        )
    }
}
export default MyNavbar;