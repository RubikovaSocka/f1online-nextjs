import axios from "axios";
import { URLS } from "./urls";

const PANEL = "parts2.json";

const fetchPanels = async () => {
  return await axios.get(`${URLS.BASE}${URLS.UPLOADS}${PANEL}`).then(res => {
    return res.data;
  });
};

export default fetchPanels;
