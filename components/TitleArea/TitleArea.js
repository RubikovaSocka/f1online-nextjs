import React, { Component } from 'react'
import MainArticlePreview from '../MainArticlePreview/MainArticlePreview'
import TitleArticlePreview from '../TitleArticlePreview/TitleArticlePreview'

import styles from './TitleArea.module.scss'

class TitleArea extends Component {

    render() {
        if(this.props.posts.length === 3) {
            //show for mobile version
            return (
                <div className={styles.container}>
                    {this.props.posts.map(article => (
                        <div>
                            <TitleArticlePreview post={article}/>
                        </div>
                    ))}
                </div>
            )
        } else if (this.props.posts.length === 5) {
           //show desktop version
           console.log(this.props.posts)
            return (
                <div className={styles.container}>
                    <div className={styles.art00}>
                        <MainArticlePreview post={this.props.posts[0]}/>
                    </div>
                    <div className={styles.art01}>
                        <TitleArticlePreview post={this.props.posts[1]}/>
                    </div>
                    <div className={styles.art02}>
                        <TitleArticlePreview post={this.props.posts[2]}/>
                    </div>
                    <div className={styles.art03}>
                        <TitleArticlePreview post={this.props.posts[3]}/>
                    </div>
                    <div className={styles.art04}>
                        <TitleArticlePreview post={this.props.posts[4]}/>
                    </div>
                </div>
            )
        }
        return null
    }
}

export default TitleArea;