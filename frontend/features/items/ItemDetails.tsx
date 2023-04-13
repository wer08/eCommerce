import React from "react";
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
