import React, { Component } from 'react'
import ArticlePreview from "../ArticlePreview/ArticlePreview"

import styles from './ArticlesPanel.module.scss'

class ArticlesPanel extends Component {

    render() {
        return (
            <div className={styles.container}>
                {
                    this.props.posts.map((post, index) => (
                        <div key={index} className={styles.item}>
                            <ArticlePreview post={post}/>
                        </div>
                    ))
                }
                <i aria-hidden="true"></i>
                <i aria-hidden="true"></i>
            </div>
        )
    }
}
export default ArticlesPanel