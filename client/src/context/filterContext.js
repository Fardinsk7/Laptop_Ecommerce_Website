import { createContext } from "react";
import { useProductContext } from "./productContext";
import { useReducer } from "react";
import { useEffect } from "react";
import  reducerFunction from "../reducer/filterReducer";
import { useContext } from "react";

const FilterContext = createContext();

const initial={
    filter_Products:[],
    all_Products:[],
    grid_View: true,
    sorting_Value:"lowest",
    filterOnOff:"On",
    filters:{
        text:"",
        category:"All",
        company:"All",
        filter_colors:"All",
        maxPrice:0,
        price:0,
        minPrice:0,
        }
}

const FilterContextProvider = ({children})=>{
    
    const {products} = useProductContext()
    const [state,dispatch] = useReducer(reducerFunction,initial)

    const Gridon = ()=>{
        return dispatch({type:"SET_GRID_VIEW"});
    }

    const showfilter=()=>{
        dispatch({type:"FILTER_ONOFF"})
    }

    const Liston=()=>{
        return dispatch({type:"SET_LIST_VIEW"})
    }

    const sortFunction=(e)=>{
        let userValue = e.target.value;
        dispatch({type:"SORT",payload:userValue})
    }

    const updateFilters=(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        dispatch({type:"UPDATE_VALUE",payload:{name,value}})
    }

    const clearFilters = (max)=>{
        dispatch({type:"CLEAR_FILTERS",payload:max})
    }

   

   
    useEffect(()=>{        
        dispatch({type:"FILTER_PRODUCTS"})
        dispatch({type:"SORT_ARRAY"})

    },[state.sorting_Value,state.filters])

    useEffect(()=>{
        dispatch({type:"LOAD_FILTER_PRODUCTS",payload:products})
    },[products])
    return(
        <FilterContext.Provider value={{...state,Gridon,Liston,sortFunction,updateFilters,clearFilters,showfilter}}>
            {children}
        </FilterContext.Provider>
    );
}

const useFilterContext = ()=>{
    return useContext(FilterContext);
}

export {FilterContextProvider,useFilterContext}