import { URLS } from "./urls";

const fetchPanels = async () => {
  try {
    const panels = await fetch(URLS.bannerDataLink)
      .then((res) => res.json())
      .then((res) => res);

    const probabilites = await fetch(URLS.bannerProbabilitiesLink)
      .then((res) => res.json())
      .then((res) => res);

    return {
      panels: panels,
      probabilites: probabilites,
    };
  } catch (e) {
    throw new Error(e.response.data.Error);
  }
};

export default fetchPanels;
