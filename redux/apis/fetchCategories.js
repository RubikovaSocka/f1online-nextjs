import { URLS } from "./urls";

const FILENAME = "popular.json";

const fetchPanels = async () => {
  return await fetch(`${URLS.BASE}${URLS.UPLOADS}${FILENAME}`)
    .then(res => res.json())
    .then(res => res);
};

export default fetchPanels;
