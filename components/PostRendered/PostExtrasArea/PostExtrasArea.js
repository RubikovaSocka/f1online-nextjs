import { useState, useEffect } from "react";
import SectionTitle from "../../SectionTitle";
import Divider from "../../Divider";
import ImageGallery from "../../react-image-gallery/index";
import Live from "../../Live";
import ImageSlider from "./ImageSlider/ImageSlider";

function PostExtrasArea({
  gallery,
  start_time,
  end_time,
  images: compareImages,
}) {
  const [images, setImages] = useState({ array: [], loaded: false });
  const [cImages, setCImages] = useState({ array: [], loaded: false });

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

  const fetchCompareImages = () => {
    compareImages &&
      fetch(compareImages)
        .then((res) => res.json())
        .then((res) => setCImages({ array: res, loaded: true }));
  };

  useEffect(() => {
    fetchGallery();
    fetchCompareImages();
  }, []);

  return (
    <>
      {start_time ? (
        <>
          <Divider height="10px" />
          <SectionTitle title="LIVE" />
          <Divider height="30px" />
          <Live
            startTime={start_time.replace(" ", "T")} //to match ISO format for subsequent saga requestss
            endTime={end_time.replace(" ", "T")}
          />
          <Divider height="10px" />
        </>
      ) : null}
      {cImages.loaded ? (
        <>
          <span
            style={{
              fontFamily: "HK Grotesk",
              fontSize: "13px",
              display: "block",
              textAlign: "right",
            }}
          >
            Čiaru potiahnite doprava alebo doľava
          </span>
          <ImageSlider images={cImages} />
        </>
      ) : null}
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
      ) : null}
    </>
  );
}

export default PostExtrasArea;
