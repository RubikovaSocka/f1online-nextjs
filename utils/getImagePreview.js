const getImagePreview = ({ imgData, imgSize }) => {
  if (imgData)
    return (
      <img
        alt={`${imgData.title ? imgData.title : ""}`}
        src={
          imgData.media_details.sizes[`${imgSize}`]
            ? imgData.media_details.sizes[`${imgSize}`].source_url
            : imgData.source_url
            ? imgData.source_url
            : "https://wpadmin.f1online.sk/wp-content/uploads/title-logo-wb.png"
        }
      />
    );
  return (
    <img
      alt="logo F1online.sk"
      src={"https://wpadmin.f1online.sk/wp-content/uploads/title-logo-wb.png"}
    />
  );
};

export default getImagePreview;
