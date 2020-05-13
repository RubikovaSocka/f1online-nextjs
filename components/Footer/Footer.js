import React from "react"
import styles from './Footer.module.scss'
import Link from "next/link"

function Footer() {
    return (
        <footer className={styles.container}>
            <div className={styles.firstRow}>
                <span>redakcia@f1online.sk</span>
                <Link href="/zasady-ochrany-sukromia"><a><span>Zásady ochrany údajov</span></a></Link>
                {/*<span>Kontakt</span>*/}
            </div>
            <div style={{height: '20px'}}></div>
            <span>&copy; 2020 F1online.sk</span>
        </footer>
    )
}

export default Footer