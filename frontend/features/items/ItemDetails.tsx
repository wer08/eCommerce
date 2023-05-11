import React, { useEffect, useState } from "react";
import { TItem } from "./types";
import { useAppSelector } from "../../hooks";
import { selectUser } from "../users/usersSlice";


interface Props {
  item: TItem;
  onClick:() => void;
}

const ItemDetails: React.FC<Props> = ({ item, onClick }) => {

  const description = item.description.length > 50 ? `${item.description.slice(0,50)}...` : item.description

  const owner = useAppSelector((state)=>selectUser(state, item.client.id))

  return (
    <div className="row mb-4 shadow" onClick={onClick}>
        <div className="col p-0">
        <div className="card">
            {item.picture &&(
              <img
                className="card-img-left listing-image"
                src={item.picture}
                alt={item.name}
              />
            )}
            <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">
                {owner?.username}
            </h6>
            <h5 className="card-title">{item.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
                ${item.price}
            </h6>
            <p className="card-text">{description}</p>
            <h6 className="card-subtitle mb-2 text-muted">
              Quantity: {item.quantity}
            </h6>
            </div>
        </div>
        </div>
    </div>
  );
};

export default ItemDetails;
