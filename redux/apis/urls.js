const URLS = {
  BASE: "https://wpadmin.f1online.sk/",
  UPLOADS: "wp-content/uploads/",
  ARTICLES_ENDPOINT: "wp-json/wp/v2/posts/",
  QUICK_NEWS_ENDPOINT: "wp-json/wp/v2/rychle_spravy/",
  RESULTS_INFO_ENDPOINT: "wp-json/wp/v2/results/",
  CALENDAR_ENDPOINT: "wp-json/wp/v2/calendar/",
  NEXT_VENUE_ID_ENDPOINT: "wp-json/wp/v2/online_details/",
  TAGS_ENDPOINT: "wp-json/wp/v2/tags/",
  LIVE_ENDPOINT: "wp-json/wp/v2/online_spravy/",
  POPULAR_ENDPOINT: "wp-json/wordpress-popular-posts/v1/popular-posts",

  previewFields:
    "_fields=id,type,date,title,slug,tags,better_featured_image.media_details,featured_media",
};
export { URLS };
