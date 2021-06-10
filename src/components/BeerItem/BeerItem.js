import React, { useState } from "react";
import { Collapse, Button } from "antd";
import { StarOutlined, DeleteOutlined } from "@ant-design/icons";
import MaltItems from "../MaltItems/MaltItems";
import HopsItems from "../HopsItems/HopsItems";
import FoodPairings from "../FoodPairings/FoodPairings";

const { Panel } = Collapse;

const BeerItem = (props) => {
  const [favState, setFavState] = useState(false);

  const onClickFavButton = () => {
    setFavState(!favState);
    if (favState) {
      props.onRemoveFav(props.data);
    } else {
      props.onAddFav(props.data);
    }
  };

  const onClickDeleteButton = () => {
    props.onRemoveFav(props.data);
  };

  let favButton = (
    <Button
      type="primary"
      ghost="true"
      onClick={onClickFavButton}
      icon={<StarOutlined />}
    ></Button>
  );

  let deleteButton = (
    <Button
      danger
      type="primary"
      ghost="true"
      onClick={onClickDeleteButton}
      icon={<DeleteOutlined />}
    ></Button>
  );

  return (
    <Collapse>
      <Panel
        header={props.data.name}
        key={props.key}
        extra={
          props.showFavIcon ? (
            <div onClick={(e) => e.stopPropagation()}>{favButton}</div>
          ) : (
            <div onClick={(e) => e.stopPropagation()}>{deleteButton}</div>
          )
        }
      >
        <img
          style={{ maxWidth: "40px", marginRight: "10px" }}
          src={props.data.image_url}
          alt="ProductImage"
          align="left"
        ></img>

        <p>
          {props.data.tagline} / {props.data.volume.value}{" "}
          {props.data.volume.unit}
        </p>
        <p>{props.data.description}</p>

        <p>{props.data.brewers_tips}</p>

        <p>
          {props.data.contributed_by} / {props.data.first_brewed}
        </p>
        <Collapse>
          <Panel header="Ingredients" key="1">
            <p>{props.data.ingredients.yeast}</p>
            <MaltItems items={props.data.ingredients.malt}></MaltItems>

            <HopsItems items={props.data.ingredients.hops}></HopsItems>
          </Panel>
        </Collapse>

        <Collapse>
          <Panel header="Food Pairings" key="1">
            <FoodPairings items={props.data.food_pairing}></FoodPairings>
          </Panel>
        </Collapse>
      </Panel>
    </Collapse>
  );
};

export default BeerItem;
