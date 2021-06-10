import React from "react";
import { Descriptions } from "antd";
const FoodPairings = (props) => {
  return (
    <Descriptions bordered>
      {props.items.map((item) => (
        <Descriptions.Item key={item} span={3}>
          {item}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
};

export default FoodPairings;
