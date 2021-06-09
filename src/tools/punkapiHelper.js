import axios from "axios";

const getBeers = async (page, perPage) => {
  const url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`;
  const header = { headers: { "Content-Type": "application/json" } };

  return await axios
    .get(url, header)
    .then((response) => response)
    .catch((error) => {
      console.log(`error : ${error}`);
    });
};

export default getBeers;
