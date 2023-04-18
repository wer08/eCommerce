import React, { useEffect, useState } from "react";
import { TItem } from "./types";

interface Props {
  item: TItem;
  onClick:() => void;
}

const ItemDetails: React.FC<Props> = ({ item, onClick }) => {

  return (
    <div className="row mb-4 shadow" onClick={onClick}>
        <div className="col p-0">
        <div className="card">
            {item.picture &&(
              <img
                className="card-img-left listing-image"
                src="https://wojtekstorage.blob.core.windows.net/quickstart01027160-dde5-11ed-b0b9-37c73d81cb84/eCommerceNoPicture01be4750-dde5-11ed-b0b9-37c73d81cb84.jpg"
                alt={item.name}
              />
            )}
            <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
                ${item.price}
            </h6>
            <p className="card-text">{item.description}</p>
            </div>
        </div>
        </div>
    </div>
  );
};

export default ItemDetails;
