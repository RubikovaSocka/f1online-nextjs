import axios from "axios";

import { URLS } from "./urls";

export default async function fetch(perPage) {
  let response = await axios.get(
    `${URLS.BASE}${URLS.RESULTS_INFO_ENDPOINT}?per_page=${perPage}`
  );
  let linksToJsons = response.data.map(item => item.acf);

  let jsons = await axios.all(
    linksToJsons
      .map(item => [
        axios.get(item.results_json),
        axios.get(item.cd_results_json),
        axios.get(item.cc_results_json)
      ])
      .flat()
  );
  let jsonsData = jsons.map(res => res.data);
  let toReturn = [];

  for (let index = 0; index < Math.floor(jsonsData.length / 3); index++) {
    let subArray = jsonsData.slice(3 * index, 3 * index + 3);
    toReturn[index] = {
      venueName: linksToJsons[index].venue_name,
      race: subArray[0],
      driverChamp: subArray[1],
      teamChamp: subArray[2]
    };
  }
  return toReturn;
}
