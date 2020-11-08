const getImageSrc = (image, size) => {
  console.log(image);
  if (image) {
    if (image.media_details.sizes[`${size}`]) {
      return image.media_details.sizes[`${size}`].source_url;
    }
    if (image.source_url) {
      return image.source_url;
    }
  }
  return "https://wpadmin.f1online.sk/wp-content/uploads/title-logo-wb.png";
};
export default getImageSrc;
