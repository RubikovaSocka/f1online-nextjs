import axios from "axios";

import { URLS } from "./urls";

const createResultsArray = data => {
  let toReturn = [];

  for (let index = 0; index < Math.floor(data.length / 3); index++) {
    let subArray = data.slice(3 * index, 3 * index + 3);
    toReturn[index] = {
      venueName: linksToJsons[index].venue_name,
      race: subArray[0],
      driverChamp: subArray[1],
      teamChamp: subArray[2]
    };
  }
};

export default async function fetch(perPage) {
  const linksToJsons = await axios
    .get(`${URLS.BASE}${URLS.RESULTS_INFO_ENDPOINT}?per_page=${perPage}`)
    .then(res => res.data.map(item => item.acf))
    .catch(error => {
      throw new Error(error.response.data.Error);
    });

  return await axios
    .all(
      linksToJsons
        .map(item => [
          axios.get(item.results_json),
          axios.get(item.cd_results_json),
          axios.get(item.cc_results_json)
        ])
        .flat()
    )
    .then(({ data }) => createResultsArray(data));
}
