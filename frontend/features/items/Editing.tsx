import React, { useState } from 'react'
import {TItem} from './types'
import { Category } from './types';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { update } from './itemsSlice';

interface Props {
    selectedItem: TItem;
    setIsEditing:  React.Dispatch<React.SetStateAction<boolean>>;
  }
const Editing: React.FC<Props> = ({selectedItem, setIsEditing}) => {
    const [formData,setFormData] = useState({
        name: selectedItem.name,
        description: selectedItem.description,
        price: selectedItem.price,
        category: selectedItem.category,
        quantity: selectedItem.quantity,
    })

    const {name,description,price,category,quantity} = formData;

    const categories = Object.values(Category);

    const dispatch = useAppDispatch()

    const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.currentTarget.value
        })
    }

    
    // Define function to handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = () => {
        const uploadData:TItem = {
            ...formData,
            picture: selectedItem.picture,
            active: true,
            client: selectedItem.client,
            id: selectedItem.id
        }
        dispatch(update(uploadData));
        setIsEditing(false);
    }

    return ( 
        <>
        <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content  justify-content-center">
          <div className="modal-body">
            <div className="row ">
                {/* Define the name input field */}
                <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input type="text" name="name" value={name} onChange={e=>handleChange(e)} className="form-control" required />
                    <div className="invalid-feedback">Please enter a valid name.</div>
                </div>

                {/* Define the price input field */}
                <div className="col-md-6">
                    <label htmlFor="price" className="form-label">Price:</label>
                    <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input type="number" name="price" value={price} onChange={e=>handleChange(e)} className="form-control" min="0.01" required />
                        <div className="invalid-feedback">Please enter a valid price.</div>
                    </div>
                </div>

                {/* Define the quantity input field */}
                <div className="col-md-6">
                    <label htmlFor="quantity" className="form-label">Quantity:</label>
                    <div className="input-group">
                        <input type="number" name="quantity" value={quantity} onChange={e=>handleChange(e)} className="form-control" min="1" required />
                        <div className="invalid-feedback">Please enter a valid quantity.</div>
                    </div>
                </div>

                
                {/* Define the category input field */}
                <div className="col-md-6">
                    <label htmlFor="categoryt" className="form-label">Category:</label>
                    <div className="input-group">
                        <select name="category" value={category} onChange={e=>handleSelect(e)} className="form-control">
                            {categories.map((category,idx)=><option key={idx} value={category}>{category}</option>)}
                        </select>
                        <div className="invalid-feedback">Please enter a valid category.</div>
                    </div>
                </div>

                {/* Define the description input field */}
                <div className="col-md-12">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea name="description" value={description} onChange={e=>handleChange(e)} className="form-control" required></textarea>
                    <div className="invalid-feedback">Please enter a valid description.</div>
                </div>
                <button
                    type="button"
                    className="btn btn-primary w-100 mt-3"
                    onClick={()=>handleClick()}
                    >
                    Save changes
                </button>
            </div>
          </div>
        </div>
      </div>
        </>
    );
};
 
export default Editing;
