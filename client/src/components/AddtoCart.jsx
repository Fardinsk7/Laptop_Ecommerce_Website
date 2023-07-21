import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCheck } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import Button from "../styles/Button"
import CartAmountToggle from './CartAmountToggle';
import { useCartContext } from '../context/cartContext';

const AddtoCart = ({product}) => {
    const {_id,colors,stock,image} = product;
    const [color,setColor] = useState(colors[0]);
    const [amount,setAmount] = useState(1);
    const {addToCart} = useCartContext();

    const setIncrease = ()=>{
        amount<stock? setAmount(amount+1): setAmount(stock);
    };

    const setDecrease = ()=>{
        amount>1? setAmount(amount-1):setAmount(1);
    };
    

  return (
    <Wrapper>
        <div className="colors">
            <p>
                Colors:{
                    colors.map((e,i)=>{
                        return <button key={i} style={{backgroundColor:e}} className={color ===e?"btnStyle active":"btnStyle"} onClick={()=>setColor(e)}>{color ===e?<FaCheck className="checkStyle" />:""}</button>
                    })
                }

            </p>
        </div>
        <CartAmountToggle amount={amount} setIncrease={setIncrease} setDecrease={setDecrease}/><br/>
        <NavLink to="/cart" onClick={()=>{addToCart(_id,color,amount,product,image)}}><Button className ="btn">Add to Cart</Button></NavLink>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  .active {
    opacity: 1;
  }
  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }
  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;
    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }
    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }
`;

export default AddtoCart
