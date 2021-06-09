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

  console.log(data);
  if (!data) return null;

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="column-1 box">
            <Collapse>
              {data.data.map((item) => (
                <BeerItem key={item.id} data={item} />
              ))}
            </Collapse>

            <Pagination
              current={currentPage}
              onChange={onChangePagination}
              total={50}
            />
          </div>
          <div className="column-2 box">
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
