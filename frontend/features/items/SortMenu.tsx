import React, { useState } from 'react';
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
    <div>
      <label htmlFor="sort-select">Sort By:</label>
      <select id="sort-select" value={selectedOption} onChange={(e)=>handleSortChange(e)} className='form-select'>
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
