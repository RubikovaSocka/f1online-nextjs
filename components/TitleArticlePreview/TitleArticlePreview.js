import React, { Component } from 'react'
//import { Link } from "gatsby"

import styles from './TitleArticlePreview.module.scss'

class TitleArticlePreview extends Component{

    render() {
        const { id, slug } = this.props.post
        return (
            <div className={`${styles.container} zoomImageContainer`}>
                {/*<Link className="noOutline" 
                    to={{
                        pathname: `/clanok/${id}/${slug}`,
                        state: {
                            post: this.props.post
                        }
                }}>*/}
                    <img alt={`${this.props.post.better_featured_image.title ? this.props.post.better_featured_image.title: ''}`} src={this.props.post.better_featured_image.media_details.sizes.medium.source_url}/>
                    <div className={`${styles.titleContainer} blackBotGradient`}>
                        <h3 className={styles.title}>
                            {this.props.post.title.rendered}
                        </h3>
                    </div>
                {/*</Link>*/}
            </div>
        )
    }
}

export default TitleArticlePreview