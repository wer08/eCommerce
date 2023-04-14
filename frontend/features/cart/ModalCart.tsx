import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addItem, selectItems } from "./cartSlice";


const ModalCart: React.FC = () => {

  const items = useAppSelector(selectItems)


  return (
    <div className="modal fade" id="cartModal" tabIndex={-1} role="dialog" aria-labelledby="cartModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">

          <div className="modal-body">
            {items ? items.map(item => (
              <div className="row mb-4 shadow">
                  <div className="col p-0">
                  <div className="card">
                      <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                          ${item.price}
                      </h6>
                      </div>
                  </div>
                  </div>
              </div>
            )) : 
            <div className="row mb-4 shadow">
                <div className="col p-0">
                <div className="card">
                    <h1>No items in the cart</h1>
                </div>
                </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCart;
