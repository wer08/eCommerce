import { useState, useEffect } from "react";
import "../App.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getItems, selectItems, selectFilteredItems } from "../../features/items/itemsSlice";
import ItemDetails from "../../features/items/ItemDetails";
import Modal from "../../features/items/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faFilter } from "@fortawesome/free-solid-svg-icons";
import { TItem } from "../../features/items/types";

const Home = () => {
  const items = useAppSelector(selectFilteredItems);
  const reversed = [...items].reverse();
  const activeItems = reversed.filter(item => item.active)
  const dispatch = useAppDispatch();
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
        <span className="d-flex justify-content-center"> <FontAwesomeIcon icon={faSort} /> Sort <FontAwesomeIcon icon={faFilter} className="ms-5"/> Filter </span>
        {activeItems.map((item, idx) => (
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

export default Home;
