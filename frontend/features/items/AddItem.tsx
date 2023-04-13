import React, { useState } from "react";
import { TItem } from "./types";
import { useAppDispatch } from "../../hooks";
import { addItem } from "./itemsSlice";

const AddItem = () => {

    // Define state for form data
    const [formData, setFormData] = useState<TItem>({
        name: "",
        description: "",
        price: 0
    });

    const dispatch = useAppDispatch()

    // Define state for form validation
    const [validated, setValidated] = useState(false);

    // Destructure form data properties
    const {name, description, price} = formData;

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

        // dispatch formData

        dispatch(addItem(formData))
        
    }

    // Define function to handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

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
                        <input type="number" name="price" value={price} onChange={e=>handleChange(e)} className="form-control" required />
                        <div className="invalid-feedback">Please enter a valid price.</div>
                    </div>
                </div>

                {/* Define the description input field */}
                <div className="col-md-12">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea name="description" value={description} onChange={e=>handleChange(e)} className="form-control" required></textarea>
                    <div className="invalid-feedback">Please enter a valid description.</div>
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
