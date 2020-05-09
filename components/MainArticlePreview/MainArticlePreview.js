import React, { Component } from 'react'
//import { Link } from "gatsby"
import styles from './MainArticlePreview.module.scss'

class MainArticlePreview extends Component {
    
    render() {
        const { id, slug } = this.props.post
        console.log('INCOMING')
        console.log(this.props.post)
        return (
            <div className={`${styles.container} zoomImageContainer`}>
                {/*<Link className="noOutline" 
                to={`/clanok/${id}/${slug}`}>*/}
                        
                        <img alt={`${this.props.post.better_featured_image.title ? this.props.post.better_featured_image.title: ''}`} src={this.props.post.better_featured_image.media_details.sizes.medium_large.source_url}/>
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

export default MainArticlePreview