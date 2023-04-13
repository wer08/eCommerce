import { useState, useEffect } from "react";
import "../App.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getItems, selectItems } from "../../features/items/itemsSlice";
import ItemDetails from "../../features/items/ItemDetails";
import Modal from "../../features/items/Modal";
import { TItem } from "../../features/items/types";

const Home = () => {
  const items = useAppSelector(selectItems);
  const dispatch = useAppDispatch();
  const [selectedItem, setSelectedItem] = useState<TItem | null>(null);

  const handleClick = (item:TItem) => {
    console.log(item.name)
    setSelectedItem(item);
  };

  const handleAddToCart = (item: TItem) => {
    // add item to cart
    console.log(`Added ${item.name} to cart!`);
    
  };

  const handleBuyNow = (item: TItem) => {
    // buy item now
    console.log(`Bought ${item.name}!`);
    
  };

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);


  return (
    <div className="container mt-5">
      <div className="row row-cols-1 g-4">
        {items.map((item, idx) => (
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
