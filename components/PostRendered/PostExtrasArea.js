import { useState, useEffect } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import Divider from "../Divider";
import styles from "./style.module.scss";

import dynamic from "next/dynamic";
const ImageGallery = dynamic(() =>
  import("../react-image-gallery/src/ImageGallery")
);
const PostsBlock = dynamic(() => import("../PostsBlock/PostsBlock"));

function PostExtrasArea({ gallery, start_time, end_time }) {
  const [images, setImages] = useState({ array: [], loaded: false });

  const fetchGallery = () => {
    gallery &&
      fetch(gallery)
        .then(res => res.json())
        .then(res => {
          let imagesLoaded = res.map(item => {
            return {
              original: item.full,
              thumbnail: item.thumbnail,
              originalTitle: "zdroj: " + item.source,
              thumbnailTitle: "zdroj: " + item.source
            };
          });
          setImages({
            array: imagesLoaded,
            loaded: true
          });
        });
  };

  useEffect(() => {
    fetchGallery();
  }, []);

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
