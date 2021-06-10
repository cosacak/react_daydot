import axios from "axios";

const getFavourites = async () => {
  const url = `https://evening-shelf-26826.herokuapp.com/favourites`;
  const header = { headers: { "Content-Type": "application/json" } };

  return await axios
    .get(url, header)
    .then((response) => response)
    .catch((error) => {
      console.error(`error : ${error}`);
    });
};

const addFavourites = async (item) => {
  const url = `https://evening-shelf-26826.herokuapp.com/favourites`;
  const headers = { headers: { "Content-Type": "application/json" } };
  const data = { ...item };

  const options = {
    method: "POST",
    headers,
    data,
    url,
  };

  return await axios(options)
    .then((response) => response)
    .catch((error) => {
      console.error(`error : ${error}`);
    });
};

const deleteFavourites = async (item) => {
  const url = `https://evening-shelf-26826.herokuapp.com/favourites`;
  const headers = { headers: { "Content-Type": "application/json" } };
  const data = { ...item };

  const options = {
    method: "DELETE",
    headers,
    data,
    url,
  };

  return await axios(options)
    .then((response) => response)
    .catch((error) => {
      console.error(`error : ${error}`);
    });
};

const localApiHelper = {
  getFavourites,
  addFavourites,
  deleteFavourites,
};

export default localApiHelper;
