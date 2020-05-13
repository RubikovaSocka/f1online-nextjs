import React, { Component } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import ArticlesPanel from '../ArticlesPanel/ArticlesPanel';

import styles from './ArchivArticles.module.scss'
import LoadingSpinner from '../LoadingSpinner';

export class ArchivArticles extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            offset: 1,
            isLoaded: false
        };
        this.loadPostsFromServer = this.loadPostsFromServer.bind(this)
    }

    loadPostsFromServer() {
        
        if(this.props.tagSlug) {
            axios.get(`https://wpadmin.f1online.sk/wp-json/wp/v2/tags?slug=${this.props.tagSlug}&per_page=1`)
            .then(res => {
                axios.get(`https://wpadmin.f1online.sk/wp-json/wp/v2/posts?tags=${res.data[0].id}&per_page=${this.props.perpage}&offset=${this.props.perpage*(this.state.offset-1)}`)
                    .then(res => {
                        this.setState({
                            posts: res.data,
                            isLoaded: true
                        })
                        
                    })
                    //.catch(err => console.log(err))
            })
            //.catch(err => console.log(err))
        } else {
            axios.get(`https://wpadmin.f1online.sk/wp-json/wp/v2/posts?per_page=${this.props.perpage}&offset=${this.props.perpage*(this.state.offset-1)}`)
                .then(res => this.setState({
                    posts: res.data,
                    pageCount: Math.ceil(res.headers['x-wp-total'] / this.props.perpage),
                    isLoaded: true
                }))
                //.catch(err => console.log(err))
        }
    }

    componentDidMount() {
            this.loadPostsFromServer();
    }

    handlePageClick = data => {
        window.scrollTo(0,0)
        let selected = data.selected;
        let offset = selected + 1;
        this.setState({ offset: offset }, () => {
            this.loadPostsFromServer();
        });
    };

    render() {
        let articles, paginateSection;

        if(this.state.isLoaded) {
            if(this.state.posts.length === 0) {
                articles = (
                    <div className={styles.noneFoundPanel}>
                        <img alt="logo" src="https://wpadmin.f1online.sk/wp-content/uploads/logo-medium.jpg"></img>
                        <span>Nenašli sme žiadne články</span>
                    </div>
                )
            } else {
                articles = <ArticlesPanel posts={this.state.posts} />
                if(this.props.asArchive) {
                    paginateSection = (
                        <ReactPaginate
                            previousLabel={'<'}
                            nextLabel={'>'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={3}
                            pageRangeDisplayed={3}
                            onPageChange={this.handlePageClick}
                            containerClassName={styles.paginateContainer}
                            /*subContainerClassName={styles.paginateSubcontainer}*/
                            activeClassName={styles.active}
                            previousClassName={"enabled"}
                        />
                    )
                }
            }
        } else {
            articles = <LoadingSpinner />
        }
        return (
            <div className={styles.container}>
                {articles}
                <div className={styles.paginateContainer}>
                    { paginateSection }  
                </div>
            </div>
        )
    }
}

export default ArchivArticles
