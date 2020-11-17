import { URLS } from "./urls";

const PANEL = "parts.json";

const fetchPanels = async () => {
  return await fetch(`${URLS.BASE}${URLS.UPLOADS}${PANEL}`)
    .then((res) => res.json())
    .then((res) => res);
};

export default fetchPanels;
