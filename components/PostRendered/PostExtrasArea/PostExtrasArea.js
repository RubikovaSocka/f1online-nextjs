import { useState, useEffect } from "react";
import SectionTitle from "../../SectionTitle";
import Divider from "../../Divider";
import PostsBlock from "../../PostsBlock";
import ImageGallery from "../../react-image-gallery/index";
import Live from "../../Live";

function PostExtrasArea({ gallery, start_time, end_time }) {
  const [images, setImages] = useState({ array: [], loaded: false });

  const fetchGallery = () => {
    gallery &&
      fetch(gallery)
        .then((res) => res.json())
        .then((res) => {
          let imagesLoaded = res.map((item) => {
            return {
              original: item.full,
              thumbnail: item.thumbnail,
              originalTitle: "zdroj: " + item.source,
              thumbnailTitle: "zdroj: " + item.source,
            };
          });
          setImages({
            array: imagesLoaded,
            loaded: true,
          });
        });
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <>
      {start_time ? (
        <>
          <Divider height="10px" />
          <SectionTitle title="LIVE" />
          <Divider height="30px" />
          <Live
            startTime={start_time.replace(" ", "T")} //to match ISO format for subsequent requests
            endTime={end_time.replace(" ", "T")}
          />
          <Divider height="10px" />
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
