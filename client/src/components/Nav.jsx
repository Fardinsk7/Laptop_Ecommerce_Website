
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {FiShoppingCart} from "react-icons/fi"
import {CgMenu,CgClose} from "react-icons/cg"
import { useCartContext } from '../context/cartContext';
import Button from '../styles/Button';

const Nav = () => {
    const navigate = useNavigate()
    const [menu,SetMenu] = useState(true);
    const{total_Item} = useCartContext();

    const handleLogout = ()=>{
      localStorage.removeItem("authToken")
      navigate("/login")
    }

  return (
    <Nav2>
      <div className={menu?"navbar":"navbar active"}>
        <ul className='navbar-lists'>
            <li>
                <NavLink to="/" className="navbar-link" onClick={()=>SetMenu(true)}>
                    Home 
                </NavLink>
            </li>
            <li>
                <NavLink to="/about" className="navbar-link" onClick={()=>SetMenu(true)}>
                    About
                </NavLink>
            </li>
            <li>
                <NavLink to="/products" className="navbar-link" onClick={()=>SetMenu(true)}>
                    Products
                </NavLink>
            </li>
            <li>
                <NavLink to="/contact" className="navbar-link" onClick={()=>SetMenu(true)}>
                    Contact
                </NavLink>
            </li>
            <li>
              {
                (localStorage.getItem("authToken")) && <Button onClick={handleLogout}>Logout</Button>
              }
              {
                !(localStorage.getItem("authToken"))  && <Button onClick={()=>{navigate("/login")}}>Login</Button>
                  
              }
            </li>
            
            {
                !(localStorage.getItem("authToken"))  && <li> <Button onClick={()=>{navigate("/signup")}}>SignUp</Button></li>
                  
              }
            
            <li>
                <NavLink to="/cart" className="navbar-link cart-trolley--link">
                    <FiShoppingCart className="cart-trolley"/>
                    <span className="cart-total--item">{total_Item}</span>
                </NavLink>
            </li>
        </ul>
        <div className="mobile-navbar-btn">
            <CgMenu className="mobile-nav-icon" name="menu-outline" onClick={()=>SetMenu(false)} />
            <CgClose className="mobile-nav-icon close-outline" name="close-outline" onClick={ ()=>SetMenu(true)} />
        </div>

      </div>
    </Nav2>
  )
}

const Nav2 = styled.nav`
.navbar-lists {
  display: flex;
  gap: 4.8rem;
  align-items: center;
  .navbar-link {
    &:link,
    &:visited {
      display: inline-block;
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: 500;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.black};
      transition: color 0.3s linear;
    }
    &:hover,
    &:active {
      color: ${({ theme }) => theme.colors.helper};
    }
  }
}
.mobile-navbar-btn {
  display: none;
  background-color: transparent;
  cursor: pointer;
  border: none;
}
.mobile-nav-icon[name="close-outline"] {
  display: none;
}
.close-outline {
  display: none;
}
.cart-trolley--link {
  position: relative;
  .cart-trolley {
    position: relative;
    font-size: 3.2rem;
  }
  .cart-total--item {
    width: 2.4rem;
    height: 2.4rem;
    position: absolute;
    background-color: #000;
    color: #000;
    border-radius: 50%;
    display: grid;
    place-items: center;
    top: -20%;
    left: 70%;
    background-color: ${({ theme }) => theme.colors.helper};
  }
}
.user-login--name {
  text-transform: capitalize;
}
.user-logout,
.user-login {
  font-size: 1.4rem;
  padding: 0.8rem 1.4rem;
}
@media (max-width: 1150px) {
  .mobile-navbar-btn {
    display: inline-block;
    z-index: 9999;
    border: ${({ theme }) => theme.colors.black};
    .mobile-nav-icon {
      font-size: 4.2rem;
      color: ${({ theme }) => theme.colors.black};
    }
  }
  .active .mobile-nav-icon {
    display: none;
    font-size: 4.2rem;
    position: absolute;
    top: 30%;
    right: 10%;
    color: ${({ theme }) => theme.colors.black};
    z-index: 9999;
  }
  .active .close-outline {
    display: inline-block;
  }
  .navbar-lists {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    visibility: hidden;
    opacity: 0;
    transform: translateX(100%);
    /* transform-origin: top; */
    transition: all 0.3s linear;
  }
  .active .navbar-lists {
    visibility: visible;
    opacity: 1;
    transform: translateX(0);
    z-index: 999;
    transform-origin: right;
    transition: all 0.3s linear;
    .navbar-link {
      font-size: 4.2rem;
    }
  }
  .cart-trolley--link {
    position: relative;
    .cart-trolley {
      position: relative;
      font-size: 5.2rem;
    }
    .cart-total--item {
      width: 4.2rem;
      height: 4.2rem;
      font-size: 2rem;
    }
  }
  .user-logout,
  .user-login {
    font-size: 2.2rem;
    padding: 0.8rem 1.4rem;
  }
}
`;

export default Nav
