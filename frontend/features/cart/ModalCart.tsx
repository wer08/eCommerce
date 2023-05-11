import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faArrowRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addItem, removeItem, selectItems } from "./cartSlice";
import ItemInCart from "./ItemInCart"

const ModalCart: React.FC = () => {
  const items = useAppSelector(selectItems);

  const dispatch = useAppDispatch()

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      return total + parseFloat((item.item.price * item.quantityCart).toFixed(2));
    }, 0);
  };



  return (
    <div className="modal fade" id="cartModal" tabIndex={-1} role="dialog" aria-labelledby="cartModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            {items.length > 0 ? (
              items.map((item,idx) => (
                <div key={idx}>
                  <ItemInCart item = {item} />
                </div>

              ))
            ) : (
              <div className="row mb-4 shadow">
                <div className="col p-0">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title text-center">No items in the cart</h3>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <p className="font-weight-bold">Total Price: ${getTotalPrice()}</p>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Checkout <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCart;
