import React from "react";
import AdSense from "react-adsense";

export default function Banner() {
  return (
    <AdSense.Google
      client="ca-pub-2681240380511410"
      slot="9331604467"
      style={{
        display: "block",
      }}
      //layout="in-article"
      format="auto"
      responsive="true"
    />
  );
}
