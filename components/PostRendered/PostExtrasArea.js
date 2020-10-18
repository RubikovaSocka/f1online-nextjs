import React, { Component } from "react";
import axios from "axios";
import ImageGallery from "../react-image-gallery/src/ImageGallery";
import SectionTitle from "../SectionTitle/SectionTitle";
import Divider from "../Divider";
import PostsBlock from "../PostsBlock/PostsBlock";
import styles from "./PostRendered.module.scss";

class PostExtrasArea extends Component {
  state = {
    images: [],
    imagesLoaded: false
  };

  componentDidMount() {
    const { acf } = this.props;
    if (acf.gallery) {
      axios.get(acf.gallery).then(res => {
        let imagesLoaded = res.data.map(item => {
          return {
            original: item.full,
            thumbnail: item.thumbnail,
            originalTitle: "zdroj: " + item.source,
            thumbnailTitle: "zdroj: " + item.source
          };
        });
        this.setState({
          images: imagesLoaded,
          imagesLoaded: true
        });
      });
    }
  }

  render() {
    const { acf } = this.props;
    return (
      <>
        {acf.start_time && acf.end_time ? (
          <>
            <Divider height="10px" />
            <SectionTitle title="Príspevky z onlinu:" />
            <Divider height="30px" />
            <PostsBlock
              key={1847083}
              start={acf.start_time.replace(" ", "T")}
              end={acf.end_time.replace(" ", "T")}
            />
          </>
        ) : (
          ""
        )}
        {this.state.imagesLoaded ? (
          <>
            <Divider height="30px" />
            <SectionTitle title="Galéria" />
            <Divider height="30px" />
            <div style={{ width: "100%" }}>
              <ImageGallery
                showPlayButton={false}
                lazyLoad={true}
                showFullscreenButton={true}
                items={this.state.images}
                className={styles.galleryEdit}
                showIndex
              />
            </div>
          </>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default PostExtrasArea;
