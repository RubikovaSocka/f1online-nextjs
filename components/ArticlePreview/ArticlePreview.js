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
                    <a><img alt={`${this.props.post.better_featured_image.title ? this.props.post.better_featured_image.title: ''}`} src={this.props.post.better_featured_image.media_details.sizes.medium.source_url}/></a>
                </Link>
                <Link href={`/clanky/[id]/[slug]`} as={`/clanky/${id}/${slug}`}>
                    <div className={`${styles.titleContainer}`}>
                        <a>
                            <h3 className={styles.title}>{this.props.post.title.rendered}</h3>
                        </a>
                        <span className={styles.date}>
                            {formatDate(this.props.post.date)}
                        </span>
                    </div>
                </Link>
            </div>
        )
    }
}
