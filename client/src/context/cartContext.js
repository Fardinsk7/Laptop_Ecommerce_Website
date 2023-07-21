import { createContext, useContext, useEffect, useReducer } from "react";
import reducerFunction from "../reducer/cartReducer";

const CartContext = createContext();

const getMyCartData=()=>{
    let updateMyCart = localStorage.getItem("MyCart");
    // if(updateMyCart.length === 0){
    //     return [];
    // }
    // else{
    //     return JSON.parse(updateMyCart)
    // }
    const parseData = JSON.parse(updateMyCart);
    if(!Array.isArray(parseData)) return [];
    return parseData
}

const initialState ={
    cart:getMyCartData(),
    total_Item:"",
    total_Amount:"",
    shipping_Fees:200,
}

const CartContextProvider = ({children})=>{
        const [state,dispatch] = useReducer(reducerFunction,initialState)
        
        const addToCart=(id,color,amount,product)=>{
            dispatch({type:"ADD_TO_CART",payload:{id,color,amount,product}})
        }
        
        const removeItem=(id)=>{
            dispatch({type:"REMOVE_ITEM",payload:id})
        }

        const clearCart=()=>{
            dispatch({type:"CLEAR_CART"});
        }

        const AddSubAmount =(id,method)=>{
            dispatch({type:"ADDSUB_AMOUNT",payload:{id,method}})
        }

       

        useEffect(()=>{
            dispatch({type:"CARTVALUE_AND_TOTAL"})
            localStorage.setItem("MyCart",JSON.stringify(state.cart))
        },[state.cart])


    return <CartContext.Provider value={{...state,addToCart,removeItem,clearCart,AddSubAmount}}>
        {children}
    </CartContext.Provider>
}



const useCartContext = ()=>{
    return useContext(CartContext);
}

export {CartContextProvider,useCartContext}