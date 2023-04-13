import React from "react";
import { TItem } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../hooks";
import { addItem } from "../cart/cartSlice";

interface Props {
  selectedItem: TItem;
}

const Modal: React.FC<Props> = ({ selectedItem }) => {


    const dispatch = useAppDispatch()
    const item = {...selectedItem, quantity: 1}

    const addToCart = () => {
        dispatch(addItem(item))
    }



  return (
    <div className="modal fade" id="itemModal" tabIndex={-1} role="dialog" aria-labelledby="itemModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">

          <div className="modal-body">
            <div className="row">
              {/* <div className="col-md-6">
                <img src={selectedItem.image} alt={selectedItem.name} className="w-100" />
              </div> */}
              <div className="col-md-6">
                <h5 className="font-weight-bold">{selectedItem.name}</h5>
                <p className="my-4">{selectedItem.description}</p>
                <h4 className="mb-4">${selectedItem.price}</h4>
                <button type="button" className="btn btn-primary w-100 mb-3" onClick={addToCart}>
                  <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                  Add to cart
                </button>
                <button type="button" className="btn btn-outline-primary w-100">
                  <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
                  Buy now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
