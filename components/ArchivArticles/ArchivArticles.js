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
    }

    loadPostsFromServer() {
        axios.get(`https://wpadmin.f1online.sk/wp-json/wp/v2/posts?per_page=${this.props.perpage}&offset=${this.props.perpage*(this.state.offset-1)}`)
            .then(res => this.setState({
                posts: res.data,
                pageCount: Math.ceil(res.headers['x-wp-total'] / this.props.perpage),
                isLoaded: true
            }))
            .catch(err => console.log(err))
    }

    componentDidMount() {
            this.loadPostsFromServer();
    }

    handlePageClick = data => {
        window.scrollTo(0,0)
        let selected = data.selected;
        let offset = selected + 1;
        console.log(selected + 1)
        this.setState({ offset: offset }, () => {
            this.loadPostsFromServer();
        });
    };

    render() {
        console.log(this.state.posts)
        let articles, paginateSection;

        if(this.state.isLoaded) {
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
        } else {
            articles = <LoadingSpinner />
        }
        return (
            <div className={styles.container}>
                {articles}
                {/*<div className={styles.paginateContainer}>*/}
                { paginateSection }
                    
                {/*</div>*/}
            </div>
        )
    }
}

export default ArchivArticles
