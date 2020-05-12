import React, { Component } from 'react'
import Link from 'next/link'
import formatDate from '../../utils/dateFormatter.js';
import styles from './ArticlePreview.module.scss'

export default class ArticlePreview extends Component {
    render() {
        const { id, slug } = this.props.post
        return (
            <div className={styles.container}>
                <Link href={`/clanky/[id]/[slug]`} as={`/clanky/${id}/${slug}`}>
                    <a>
                        <div className={styles.imgContainer}>
                        <img alt={`${this.props.post.better_featured_image.title ? this.props.post.better_featured_image.title: ''}`} 
                            src={this.props.post.better_featured_image.media_details.sizes.medium.source_url}
                            onError={this.addDefaultImgSource}/>
                        </div>
                    </a>    
                </Link>
                <Link href={`/clanky/[id]/[slug]`} as={`/clanky/${id}/${slug}`}>
                    <a className={`${styles.titleContainer}`}>
                        <h3 className={styles.title}>{this.props.post.title.rendered}</h3>
                        <span className={styles.date}>
                            {formatDate(this.props.post.date)}
                        </span>
                    </a>
                </Link>
            </div>
        )
    }
}
