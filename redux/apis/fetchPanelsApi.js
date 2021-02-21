import { URLS } from "./urls";

const fetchPanels = async () => {
  return await fetch(URLS.bannerDataLink)
    .then((res) => res.json())
    .then((res) => res);
};

export default fetchPanels;
