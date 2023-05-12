import React, { useRef, useState } from "react";
import { TItem } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addItem } from "../cart/cartSlice";
import { getIsAuthenticated, getUser } from "../auth/authSlice";
import { Link } from "react-router-dom";
import { deleteItem, getItems, update } from "./itemsSlice";
import { selectUser } from "../users/usersSlice";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import Editing from './Editing'

interface Props {
  selectedItem: TItem;
}

const Modal: React.FC<Props> = ({ selectedItem }) => {
  const dispatch = useAppDispatch();
  const [quantityCart, setQuantityCart] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const isAuthenticated = useAppSelector(getIsAuthenticated);
  const modalRef = useRef(null);
  const user = useAppSelector(getUser);
  

  const handleAddToCart = (e:React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()
    const form = e.currentTarget
    if(form.checkValidity()){
      const item = { item: selectedItem, quantityCart };
      const newQuantity = selectedItem.quantity - quantityCart;
      const itemToUpdate = {...selectedItem, quantity: newQuantity}
      dispatch(addItem(item));
      dispatch(update(itemToUpdate))


    }
    else{
        e.preventDefault();
        e.stopPropagation();
    }
    form.classList.add('was-validated')
    setQuantityCart(1);
  };

  const handleEdit = () => {
    setIsEditing(true);

  }

  const handleDelete = () => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            await dispatch(deleteItem(selectedItem))
            await dispatch(getItems())
          }
        },
        {
          label: 'No',
          onClick: () => console.log("Aborted")
        }
      ]
    });

  }

  return (
    <div
      className="modal fade"
      id="itemModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="itemModalLabel"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content  justify-content-center">
          <div className="modal-body">
            <div className="row ">{isEditing ? <Editing selectedItem = {selectedItem} setIsEditing = {setIsEditing}/>:
            <>
                          <h5 className="font-weight-bold">{selectedItem.name}</h5>
                <img
                className="card-img-left modal-image"
                src={selectedItem.picture}
                alt={selectedItem.name}
              />
                <p className="my-4">{selectedItem.description}</p>
                <h4 className="mb-4">${selectedItem.price}</h4>
                {isAuthenticated ?
                  <>
                    <form onSubmit={e => handleAddToCart(e)} className="needs-validation" noValidate>
                      <div className="form-group">
                        <label htmlFor="quantityInput">Quantity:</label>
                        <input
                          type="number"
                          id="quantityInput"
                          className="form-control mb-2"
                          min={1}
                          max={selectedItem.quantity}
                          value={quantityCart}
                          onChange={(e) => setQuantityCart(Number(e.target.value))}
                          required
                        />
                        <div className="invalid-feedback">
                          Select correct quantity
                        </div>
                      </div>
                      {user?.id === selectedItem.client.id &&
                        <>
                          <button className="btn btn-secondary w-100 mb-1" type="button" onClick={()=>handleEdit()}>Edit</button>
                          <button className="btn btn-danger w-100 mb-1" data-bs-dismiss="modal" type="button" onClick={()=>handleDelete()}>Delete</button>
                        </>
                      }

                      <button
                        type="submit"
                        className="btn btn-primary w-100 mb-3"
                        data-bs-dismiss="modal"
                      >
                        <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                        Add to cart
                      </button>
                    </form>
                  </> :
                <Link to= "/login"><h5 className="text-decoration-none" data-bs-dismiss="modal">Sign In to buy !</h5></Link>
                }
            </> }
  

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
