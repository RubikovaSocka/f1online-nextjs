import React, { Component } from 'react'
import Link from "next/link"
import styles from './MainArticlePreview.module.scss'

export default function MainArticlePreview({post}){
    
    return (
        <div className={`${styles.container} zoomImageContainer`}>
            <Link href={`/clanky/[id]/[slug]`} as={`/clanky/${post.id}/${post.slug}`}>
            <a>    
                <img alt={`${post.better_featured_image.title ? post.better_featured_image.title: ''}`} src={post.better_featured_image.media_details.sizes.medium_large.source_url}/>
                <div className={`${styles.titleContainer} blackBotGradient`}>
                    <div className={styles.title}>
                        {post.title.rendered}
                    </div>
                </div>
            </a>
            </Link>
        </div>
    )   
}