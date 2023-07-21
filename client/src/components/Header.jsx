import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './Nav';

const Header = () => {
  return (
    <>
    <MainHeader>
      <NavLink>
        <img src="./images/mainlogo.png" alt="logo" height="70px" width="190px" />
      </NavLink>
      <Nav/>
    </MainHeader>
    </>
  )
}
const MainHeader = styled.header`
    padding:0 4.8rem;
    height: 8rem;
    background-color: ${({theme})=> theme.colors.bg};
    display:flex;
    justify-content:space-between;
    align-items:center;
    position:relative;

    .logo{
        height: 5rem;
    }
    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      height: 10rem;
      padding: 0 2rem 0 0;
    }
`;

export default Header;
