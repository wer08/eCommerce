import React, { useEffect, useState } from "react";
import { Category, TItem, TItemUpload } from "./types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addItem } from "./itemsSlice";
import pcloudSdk from 'pcloud-sdk-js';
import { useNavigate } from "react-router";
import { getIsAuthenticated, getUser } from "../auth/authSlice";
import { Navigate } from "react-router-dom";



const AddItem = () => {
    const currentUser = useAppSelector(getUser);
    const isAuthenticated = useAppSelector(getIsAuthenticated);

    // Define state for form data
    const [formData, setFormData] = useState<TItemUpload>({
        name: "",
        description: "",
        price: 0,
        picture: null,
        client: currentUser,
        quantity: 1,
        category: Category.NO_CATEGORY
    });


    const categories = Object.values(Category);

    const navigate = useNavigate();
    
    const dispatch = useAppDispatch()

    // Define state for form validation
    const [validated, setValidated] = useState(false);

    // Destructure form data properties
    const {name, description, price, picture, client, quantity, category} = formData;

    // Define function to handle form submission
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Get the form element
        const form = e.currentTarget;

        // Check if the form is valid
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        // Set the validated state to true to enable the Bootstrap validation feedback styles
        setValidated(true);
        dispatch(addItem(formData));
        // navigate("/");
        
    }

    // Define function to handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    // Define function to handle form input file changes
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let file = null
        if(e.target.files){
            file = e.target.files[0]
            setFormData({
                ...formData,
                [e.target.name]: file
            })
        }
    }

    const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.currentTarget.value
        })
    }

    useEffect(()=>{
        if(!isAuthenticated){
            navigate("/");
        }

    },[isAuthenticated])

    // Render the form
    return ( 
        <div className="container mt-5">

            {/* Define the form element */}
            <form onSubmit={handleSubmit} className={`row g-3 ${validated ? 'was-validated' : ''}`} noValidate>


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
                {/* Define the picture input field */}
                <div className="col-md-12">
                    <label htmlFor="picture" className="form-label">Picture:</label>
                    <input type="file" name="picture" onChange={e=>handleFileChange(e)} className="form-control"></input>
                    <div className="invalid-feedback">Please enter a valid file.</div>
                </div>

                {/* Define the submit button */}
                <div className="col-md-12">
                    <button type="submit" className="btn btn-primary">Add Item</button>
                </div>
            </form>
        </div>
     );
}
 
export default AddItem;
