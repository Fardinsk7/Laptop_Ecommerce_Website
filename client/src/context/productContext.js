import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducerFunction from "../reducer/productReducer";

const AppContext = createContext();
// const API = "https://api.pujakaitem.com/api/products";
const main = process.env.REACT_APP_API_KEY
const API = `${main}/admin/getallProduct`;

const initialState = {
    Loading: false,
    Error: false,
    products: [],
    featuredProduct: [],
    singleLoading:false,
    singleError:false,
    singleProduct:{},
    details:[]
}

const AppProvider =({children})=>{

    const [state,dispatch] = useReducer(reducerFunction, initialState);

    const getProduct = async(url)=>{
        dispatch({type:"API_LOADING"})

        try {
            const res = await axios.get(url);
            const products = res.data;
            dispatch({type:"SET_API_DATA",payload:products})
        } catch (error) {
            dispatch({type:"ERROR"})
        }
    }


    //Single Product data
    const getSingleProduct = async(url)=>{
        dispatch({type:"SINGLE_LOADING"})
        try {
            const res = await axios.get(url);
            const singleProduct = await res.data;
            dispatch({type:"SET_SINGLE_PRODUCT",payload:singleProduct})
            
        } catch (error) {
            dispatch({type:"SET_SINGLE_ERROR"})
        }
    }
    const singleData=async(url)=>{
        const res = await axios.get(url);
        return res;
    }

    useEffect(()=>{
        getProduct(API);
    },[])
    
    return <AppContext.Provider value={{...state,getSingleProduct,singleData}} >{children}</AppContext.Provider>
}

//Custom Hook
const useProductContext = ()=>{
    return useContext(AppContext);
}

export {AppProvider,AppContext,useProductContext}