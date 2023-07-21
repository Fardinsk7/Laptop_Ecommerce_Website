import React from 'react';
import FormatPrice from "../Helper/FormatPrice";
import CartAmountToggle from "../components/CartAmountToggle";
import {FaTrash} from "react-icons/fa";
import { useCartContext } from '../context/cartContext';

const CartItem = ({id,amount,color,image,price,name}) => {
    const{removeItem,AddSubAmount} = useCartContext();

    const setIncrease = ()=>{
        AddSubAmount(id,"add")
    };

    const setDecrease = ()=>{
        AddSubAmount(id,"sub")
    };
   
  return (
    <div className="cart-heading grid grid-five-column">
        {/* Image and Name */}
        <div className="cart-image--name">
            <div>
                <figure>
                    <img src={image} alt={image} />
                </figure>
            </div>
            <div>
                <p>{name.length>30?`${name.slice(0,30)}...`:name}</p>
                <div className="color-div">
                    <p>Color:</p>
                    <div className="color-style" style={{backgroundColor:color,color:color,border:"1px solid grey"}}>
                    </div>
                </div>
            </div>
        </div>

        {/* Price */}
        <div className="cart-hide">
            <p><FormatPrice price={price} /></p>
        </div>

        {/* Quantity */}
        <CartAmountToggle amount={amount} setIncrease={setIncrease} setDecrease={setDecrease} />

        {/* SubTotal */}
        <div className="cart-hide">
            <p><FormatPrice price={(amount*price)} /></p>
        </div>

        {/* Delete */}
        <div>
            <FaTrash className="remove_icon" onClick={()=>{removeItem(id)}}/>
        </div>
      
    </div>
  )
}

export default CartItem
