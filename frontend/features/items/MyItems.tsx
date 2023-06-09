import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getItems, selectItems, selectFilteredItems } from "../../features/items/itemsSlice";
import ItemDetails from "../../features/items/ItemDetails";
import Modal from "../../features/items/Modal";
import { TItem } from "../../features/items/types";
import React from "react";
import { selectUser } from "../users/usersSlice";
import { getUser } from "../auth/authSlice";

const MyItems = () => {
  const items = useAppSelector(selectFilteredItems);
  const reversed = [...items].reverse();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const myItems = reversed.filter(item => item.client.id === user?.id)
  const [selectedItem, setSelectedItem] = useState<TItem | null>(null);

  const handleClick = (item:TItem) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);


  return (
    <div className="container mt-5">
      <div className="row row-cols-1 g-4">
        {myItems.map((item, idx) => (
          <div key={idx} className="col item"  data-bs-toggle="modal" data-bs-target="#itemModal">
            
            <ItemDetails item={item} onClick={()=>handleClick(item)}/>
          </div>
        ))}
      </div>

      {selectedItem && (
        <Modal selectedItem={selectedItem} />
      )}
    </div>
  );
};

export default MyItems;
