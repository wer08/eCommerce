import React, { useEffect, useState } from "react";

import { TItemInCart } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../hooks";
import { removeItem } from "./cartSlice";
import { update } from "../items/itemsSlice";


interface Props {
  item: TItemInCart;
}

const ItemInCart: React.FC<Props> = ({ item }) => {

    const dispatch = useAppDispatch()

    const onClick = () => {
        dispatch(removeItem(item.item.id));
        const updatedItem = {
            ...item.item,
            quantity: item.item.quantity
        };
        dispatch(update(updatedItem));
    }


    return (
        <div className="row mb-4 shadow">
        <div className="col p-0">
        <div className="card">
            <div className="card-body">
            <h5 className="card-title d-flex justify-content-between">{item.item.name} <FontAwesomeIcon icon={faXmark} className="delete" onClick={()=>onClick()}/> </h5>
            <h6 className="card-subtitle mb-2 text-muted">${item.item.price} x {item.quantityCart}</h6>
            <p className="card-text">Total: ${(item.item.price * item.quantityCart).toFixed(2)}</p>
            </div>
        </div>
        </div>
    </div>
    );
};

export default ItemInCart;
