import React from "react";
import { Descriptions, Collapse } from "antd";
const HopsItems = (props) => {
  const { Panel } = Collapse;

  return (
    <Collapse>
      <Panel header="Hops" key="1">
        <Descriptions bordered>
          {props.items.map((item) => (
            <Descriptions.Item key={item.name} span={3}>
              {item.add} - {item.attribute} <br />
              {item.name} <br />
              {item.amount.value} {item.amount.unit}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Panel>
    </Collapse>
  );
};

export default HopsItems;
