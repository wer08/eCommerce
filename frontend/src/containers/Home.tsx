import { useState, useEffect } from "react";
import "../App.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getItems, selectItems, selectFilteredItems } from "../../features/items/itemsSlice";
import ItemDetails from "../../features/items/ItemDetails";
import Modal from "../../features/items/Modal";
import { TItem } from "../../features/items/types";
import SortMenu from "../../features/items/SortMenu";
import FilterMenu from '../../features/items/FilterMenu';

const Home = () => {
  const items = useAppSelector(selectFilteredItems);
 
  const [activeItems,setActiveItems] = useState<Array<TItem>>([]);
  const dispatch = useAppDispatch();
  const [selectedItem, setSelectedItem] = useState<TItem | null>(null);

  const handleClick = (item:TItem) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  useEffect(()=>{
    setActiveItems([...items].reverse())
  },[items])


  const handleSort = (option:string) => {
    let sortedArray = [...activeItems];
    if(option === "priceAscending"){
      sortedArray.sort((a, b) => a.price - b.price);
    }else if(option === "priceDescending"){
      sortedArray.sort((a, b) => b.price - a.price);
    }else if(option === "name"){
      sortedArray.sort((a, b) => a.name.localeCompare(b.name));
    }else if(option == "date"){
      sortedArray.sort((a,b)=> a.date.localeCompare(b.date));
    }
    setActiveItems(sortedArray);
  }

  const handleFilter = (options: Array<string>) => {
      if(options.length === 0 ){
        setActiveItems([...items].reverse());
        return;
      }
      const filteredArray = items.filter(item => options.includes(item.category))
      setActiveItems(filteredArray);


  }


  return (
    <div className="container mt-5">
      <div className="row row-cols-1 g-4">
        <span className="d-flex justify-content-center">
           <div className="manageList d-flex me-2"><SortMenu onSort={handleSort} /> </div>
           <div className="manageList d-flex"><FilterMenu onFilter={handleFilter}/> </div> 
           </span>
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
