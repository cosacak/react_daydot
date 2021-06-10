import "./App.css";
import React, { useState, useEffect } from "react";
import punkApiHelper from "./tools/punkapiHelper";
import localApiHelper from "./tools/localapiHelper";
import BeerItem from "./components/BeerItem/BeerItem";

// For Antd Lib
import "antd/dist/antd.css";
import { Pagination, Collapse } from "antd";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    const fetchData = async (page, perPage) => {
      const data = await punkApiHelper(page, perPage);
      setData(data);
    };
    fetchData(currentPage, 10);
  }, [currentPage]);

  const fetchDataFromDb = async () => {
    const data = await localApiHelper.getFavourites();
    setFavList(data.data);
  };

  useEffect(() => {
    fetchDataFromDb();
  }, []);

  const onChangePagination = (page) => {
    setCurrentPage(page);
  };

  const onAddFav = async (item) => {
    let newFavList = [...favList];
    newFavList.push(item);

    await localApiHelper.addFavourites(item);
    await fetchDataFromDb();
  };

  const onRemoveFav = async (item) => {
    let newFavList = [...favList];
    const index = newFavList.indexOf(item);
    if (index > -1) {
      newFavList.splice(index, 1);
    }

    await localApiHelper.deleteFavourites(item);
    await fetchDataFromDb();
  };

  if (!data) return null;
  if (!favList) return null;

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="column-1 box">
            <Collapse>
              {data.data.map((item) => (
                <BeerItem
                  key={item.id}
                  data={item}
                  showFavIcon={true}
                  onAddFav={(item) => onAddFav(item)}
                  onRemoveFav={(item) => onRemoveFav(item)}
                />
              ))}
            </Collapse>

            <Pagination
              current={currentPage}
              onChange={onChangePagination}
              total={50}
            />
          </div>
          <div className="column-2 box">
            <p>Favourite List</p>
            <Collapse>
              {favList.map((item) => (
                <BeerItem
                  key={item.id}
                  data={item}
                  onAddFav={(item) => onAddFav(item)}
                  onRemoveFav={(item) => onRemoveFav(item)}
                />
              ))}
            </Collapse>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
