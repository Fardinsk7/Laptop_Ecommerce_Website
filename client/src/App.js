import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from "./Home";
import About from './About';
import Contact from './Contact';
import Cart from "./Cart";
import Products from "./Products";
import SingleProducts from "./SingleProduct";
import Error from './Error';
import { GlobalStyle } from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import Upload from './Upload';
import DataProduct from './DataProduct';
import AdminProduct from './AdminProduct';
import AdminLogin from './AdminLogin';
import SignUp from './SignUp';
import Login from './Login';

const App = () => {
  const theme={
    colors:{
      bg:"#F6F8FA",
      font:"white",
      heading: "rgb(24,24,29)",
      text: "rgba(29,29,29,0.8)",
      white: "#fff",
      black: "#212529",
      helper: "#8490ff",
      footer_bg: "#0a1435",
      btn: "black",
      border: "rgba(98 84 243 0.5)",
      hr: "#ffffff",
      gradient: "linear-gradient(0deg,rgb(132 144 255) 0%, rgb(98 189 252) 100%",
      shadow:"rgba(0,0,0,0.02) 0px 1px 3px  0px, rgba(27,31,35,0.15) 0px 0px 0px 1px; ",
      shadowSupport : "rgba(0,0,0,0.16) 0px 1px 4px",
      
    },

    media:{
      mobile: "768px",
      tab:"998px",
    }
  }
  return (
    <>  
      <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="contact" element={<Contact/>}/>
          <Route path="products" element={<Products/>}/>
          <Route path="cart" element={<Cart/>}/>
          <Route path="signup" element={<SignUp/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="admin/upload" element={<Upload/>}/>
          <Route path="admin/dataProduct" element={<DataProduct/>}/>
          <Route path="admin/editProducts" element={<AdminProduct/>}/>
          <Route path="admin/login" element={<AdminLogin/>}/>
          <Route path="admin/:id" element={<SingleProducts/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      <Footer/>
      </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
