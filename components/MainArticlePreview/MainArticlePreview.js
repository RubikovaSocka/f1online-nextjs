import React, { Component } from 'react'
import Link from "next/link"
import styles from './MainArticlePreview.module.scss'

class MainArticlePreview extends Component {
    
    render() {
        const { id, slug } = this.props.post
        console.log('INCOMING')
        console.log(this.props.post)
        return (
            <div className={`${styles.container} zoomImageContainer`}>
                <Link href={`/clanky/[id]/[slug]`} as={`/clanky/${id}/${slug}`}><a>    
                    <img alt={`${this.props.post.better_featured_image.title ? this.props.post.better_featured_image.title: ''}`} src={this.props.post.better_featured_image.media_details.sizes.medium_large.source_url}/>
                    <div className={`${styles.titleContainer} blackBotGradient`}>
                        <a className={styles.title}>
                            {this.props.post.title.rendered}
                        </a>
                    </div>
                </a></Link>
            </div>
        )
    }
}

export default MainArticlePreview