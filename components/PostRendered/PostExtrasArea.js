import React, { useState } from "react";
import axios from "axios";
import ImageGallery from "../react-image-gallery/src/ImageGallery";
import SectionTitle from "../SectionTitle/SectionTitle";
import Divider from "../Divider";
import PostsBlock from "../PostsBlock/PostsBlock";

import styles from "./style.module.scss";

function PostExtrasArea({ gallery, start_time, end_time }) {
  const [images, setImages] = useState({ array: [], loaded: false });

  gallery &&
    axios.get(gallery).then(res => {
      let imagesLoaded = res.data.map(item => {
        return {
          original: item.full,
          thumbnail: item.thumbnail,
          originalTitle: "zdroj: " + item.source,
          thumbnailTitle: "zdroj: " + item.source
        };
      });
      setImages({
        images: imagesLoaded,
        loaded: true
      });
    });

  return (
    <>
      {start_time && end_time ? (
        <>
          <Divider height="10px" />
          <SectionTitle title="Príspevky z onlinu:" />
          <Divider height="30px" />
          <PostsBlock
            key={1847083}
            start={start_time.replace(" ", "T")}
            end={end_time.replace(" ", "T")}
          />
        </>
      ) : (
        ""
      )}
      {images.loaded ? (
        <>
          <Divider height="30px" />
          <SectionTitle title="Galéria" />
          <Divider height="30px" />
          <div style={{ width: "100%" }}>
            <ImageGallery
              showPlayButton={false}
              lazyLoad={true}
              showFullscreenButton={true}
              items={images.array}
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

export default PostExtrasArea;
