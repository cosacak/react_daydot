import "./App.css";
import React, { useState, useEffect } from "react";
import punkApiHelper from "./tools/punkapiHelper";
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
      console.log("data", data);
      setData(data);
    };
    fetchData(currentPage, 10);
  }, [currentPage]);

  const onChangePagination = (page) => {
    setCurrentPage(page);
  };

  const onAddFav = (item) => {
    console.log("add fav", item.name);
    let newFavList = [...favList];
    newFavList.push(item);
    console.log(newFavList);
    setFavList(newFavList);
  };

  const onRemoveFav = (item) => {
    console.log("remove fav", item);
    let newFavList = [...favList];
    const index = newFavList.indexOf(item);
    if (index > -1) {
      newFavList.splice(index, 1);
    }
    console.log(newFavList);
    setFavList(newFavList);
  };

  console.log(data);
  if (!data) return null;

  // if(!favList.length <= 0 ) return null;

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
