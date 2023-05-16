import React, { useState, useEffect } from 'react';
import { Category } from '../items/types'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faFilter } from "@fortawesome/free-solid-svg-icons";
interface Props{
    onFilter: (options:Array<string>) => void
}

const FilterMenu:React.FC<Props> = ({ onFilter }) => {
  const [selectedOptions, setSelectedOptions] = useState<Array<string>>([]);
  const categories = Object.values(Category)

  const handleFilterChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;

    if (selectedOptions.includes(selectedValue)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== selectedValue));
    } else {
      setSelectedOptions([...selectedOptions, selectedValue]);
    }

  };
  useEffect(()=>{
    console.log(selectedOptions)
    onFilter(selectedOptions);
  },[selectedOptions])

  return (
    <div>
        <FontAwesomeIcon icon={faFilter} className=""/> 
        <div className="dropdown">
            <div className='dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">Select categories to filter: </div>

            <ul className="dropdown-menu">
                {categories.map((option,idx) => (
                <li key={idx}>
                    <input
                    type="checkbox"
                    id={`option-${option}`}
                    value={option}
                    checked={selectedOptions.includes(option)}
                    onChange={(e)=>handleFilterChange(e)}
                    />
                    {option}
                </li>
                ))}
            </ul>
        </div>
    </div>
  );
};

export default FilterMenu;
