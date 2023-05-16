import React, { useState } from 'react';
import { Category } from '../items/types'
interface Props{
    onFilter: (value:string) => void
}

const Filter:React.FC<Props> = ({ onFilter }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const categories = Object.values(Category)

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value
    setSelectedOption(value);
    onFilter(value);
  };

  return (
    <div>
      <label htmlFor="sort-select">Filter By Category:</label>
      <select id="sort-select" value={selectedOption} onChange={(e)=>handleFilterChange(e)} className='form-select'>
      {categories.map((category,idx)=><option key={idx} value={category}>{category}</option>)}
      </select>
    </div>
  );
};

export default Filter;
