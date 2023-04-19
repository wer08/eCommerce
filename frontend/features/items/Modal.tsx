import React, { useState } from "react";
import { TItem } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addItem } from "../cart/cartSlice";
import { getIsAuthenticated } from "../auth/authSlice";
import { Link } from "react-router-dom";

interface Props {
  selectedItem: TItem;
}

const Modal: React.FC<Props> = ({ selectedItem }) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const isAuthenticated = useAppSelector(getIsAuthenticated)

  const handleAddToCart = () => {
    const item = { ...selectedItem, quantity };
    dispatch(addItem(item));
  };

  return (
    <div
      className="modal fade"
      id="itemModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="itemModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <h5 className="font-weight-bold">{selectedItem.name}</h5>
                <img
                className="card-img-left listing-image"
                src={selectedItem.picture}
                alt={selectedItem.name}
              />
                <p className="my-4">{selectedItem.description}</p>
                <h4 className="mb-4">${selectedItem.price}</h4>
                {isAuthenticated ?
                  <>
                  <div className="form-group">
                  <label htmlFor="quantityInput">Quantity:</label>
                  <input
                    type="number"
                    id="quantityInput"
                    className="form-control mb-2"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-100 mb-3"
                  onClick={handleAddToCart}
                  data-bs-dismiss="modal"
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                  Add to cart
                </button>
                <button type="button" className="btn btn-outline-primary w-100">
                  <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
                  Buy now
                </button>
                </> :
                <Link to= "/login"><h5 className="text-decoration-none" data-bs-dismiss="modal">Sign In to buy !</h5></Link>
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
