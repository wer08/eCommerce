import React, { useEffect, useState } from "react";
import { TItem } from "./types";

interface Props {
  item: TItem;
  onClick:() => void;
}

const ItemDetails: React.FC<Props> = ({ item, onClick }) => {

  const [image,setImage] = useState<string | ArrayBuffer | null>(null)

  useEffect(()=>{
    const blob = new Blob([item.picture], { type: item.picture.type });
    if(item.picture){
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(blob)
    }

  },[])
  useEffect(()=>{
    console.log(image)
  },[image])

  return (
    <div className="row mb-4 shadow" onClick={onClick}>
        <div className="col p-0">
        <div className="card">
            {item.picture && image &&(
              <img
                className="card-img-top"
                src={image}
                alt={item.name}
              />
            )}
            <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
                ${item.price}
            </h6>
            <p className="card-text">{item.description}</p>
            </div>
        </div>
        </div>
    </div>
  );
};

export default ItemDetails;
