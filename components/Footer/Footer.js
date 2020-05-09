import React from "react"
import styles from './Footer.module.scss'

function Footer() {
    return (
        <footer className={styles.container}>
            <span className={styles.copyright}>&copy; 2020 F1online.sk </span>

            {/*<div className="linkAsButton portfolio-experiment">
                <a>
                    <span className="text">Celý kalendár</span>
                    <span className="line -right"></span>
                    <span className="line -top"></span>
                    <span className="line -left"></span>
                    <span className="line -bottom"></span>
                </a>
            </div>*/}
            {/*<button class="allArticlesButton" type="button">Celý kalendár</button>*/}
            {/*<div className="linkAsButton">
                    <a href="#">Celý kalendár <img src="imgs/arrow-r.png"/></a>
                </div>*/}
        </footer>

        
    )
}

export default Footer