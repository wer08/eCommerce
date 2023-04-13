import React from "react";
import { TItem } from "./types";
interface Props{
    selectedItem: TItem
}

const Modal: React.FC<Props> = ({selectedItem}) => {
    return ( 
    <div className="modal fade" id="itemModal" tabIndex={-1} role="dialog" aria-labelledby="itemModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="itemModalLabel">{selectedItem.name}</h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            data-bs-dismiss='modal'
          ></button>
        </div>
        <div className="modal-body">
          <p>{selectedItem.description}</p>
          <p>${selectedItem.price}</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss='modal'
            // onClick={() => handleAddToCart(selectedItem)}
          >
            Add to cart
          </button>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-dismiss='modal'
            // onClick={() => handleBuyNow(selectedItem)}
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  </div> );
}
 
export default Modal;