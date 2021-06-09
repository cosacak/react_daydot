import React, { useState } from "react";
import { Collapse } from "antd";
import MaltItems from "../MaltItems/MaltItems";
import HopsItems from "../HopsItems/HopsItems";
import star from "../../icon/star.png";
import noStar from "../../icon/nostar.png";

const { Panel } = Collapse;

const BeerItem = (props) => {
  const [favState, setFavState] = useState(false);
  const [favStateIcon, setFavStateIcon] = useState(noStar);

  const onClickFavButton = () => {
    setFavState(!favState);
    if (favState) {
      setFavStateIcon(noStar);
    } else {
      setFavStateIcon(star);
    }
  };

  let favButton = (
    <img src={favStateIcon} onClick={onClickFavButton} alt="favIcon"></img>
  );

  return (
    <Collapse>
      <Panel
        header={props.data.name}
        key={props.key}
        extra={<div onClick={(e) => e.stopPropagation()}>{favButton}</div>}
      >
        <img
          style={{ maxWidth: "40px", marginRight: "10px" }}
          src={props.data.image_url}
          alt="ProductImage"
          align="left"
        ></img>

        <p>
          {props.data.tagline} - {props.data.first_brewed}
        </p>
        <p>{props.data.description}</p>
        <Collapse>
          <Panel header="Ingredients" key="1">
            <MaltItems items={props.data.ingredients.malt}></MaltItems>

            <HopsItems items={props.data.ingredients.hops}></HopsItems>
          </Panel>
        </Collapse>
      </Panel>
    </Collapse>
  );
};

export default BeerItem;
