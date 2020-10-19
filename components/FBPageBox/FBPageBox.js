import React from "react";
import Media from "react-media";

export default function FBPageBox() {
  return (
    <Media query={{ minWidth: 350 }}>
      {matches =>
        matches ? (
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ff1online.sk%2F&tabs=timeline&width=320&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=313229599518550"
            width="320"
            height="500"
            style={{
              border: "none",
              overflow: "hidden",
              margin: "auto",
              display: "block"
            }}
            scrolling="no"
            frameBorder="0"
            //allowTransparency="true"
            allow="encrypted-media"
          ></iframe>
        ) : (
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ff1online.sk%2F&tabs=timeline&width=280&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=313229599518550"
            width="290"
            height="500"
            style={{
              border: "none",
              overflow: "hidden",
              margin: "auto",
              display: "block"
            }}
            scrolling="no"
            frameBorder="0"
            //allowTransparency="true"
            allow="encrypted-media"
          ></iframe>
        )
      }
    </Media>
  );
}
