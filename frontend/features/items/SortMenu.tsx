import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faFilter } from "@fortawesome/free-solid-svg-icons";
interface Props{
    onSort: (value:string) => void
}

const SortMenu:React.FC<Props> = ({ onSort }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value
    setSelectedOption(value);
    onSort(value);
  };

  return (
    <div className=''>
    <FontAwesomeIcon icon={faSort} className=""/> 
      <label htmlFor="sort-select" className='ms-2'>Sort By:</label>
      <select id="sort-select" value={selectedOption} onChange={(e)=>handleSortChange(e)} className='form-select selectMenu'>
        <option value="">None</option>
        <option value="priceAscending">Price Ascending</option>
        <option value="priceDescending">Price Descending</option>
        <option value="name">Name</option>
        <option value="date">Date</option>
      </select>
    </div>
  );
};

export default SortMenu;
