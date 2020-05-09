import React from 'react'
import { Nav, Navbar, NavLink } from 'react-bootstrap'
import { Component } from 'react';
//import Link  from "next/link"
import Link from '../../utils/ActiveLink';
import styles from './MyNavbar.module.scss'

class MyNavbar extends Component {
    
    render() {
        return (
            <Navbar bg="light" expand="lg" className={styles.container}>
                <Nav className={`mr-auto ${styles.navbar}`}>
                    <Link activeClassName={styles.selected} href="/"><a><span>Domov</span></a></Link>
                    <Link activeClassName={styles.selected} href="/clanky"><a><span>Správy</span></a></Link>
                    <Link activeClassName={styles.selected} href="/vysledky"><a><span>Výsledky</span></a></Link>
                    <Link activeClassName={styles.selected} href="/piloti"><a><span>Piloti</span></a></Link>
                    <Link activeClassName={styles.selected} href="/timy"><a><span>Tímy</span></a></Link>
                    <Link activeClassName={styles.selected} href="/kalendar"><a><span>Kalendár</span></a></Link>
                </Nav>
            </Navbar>
        )
    }
}
export default MyNavbar;