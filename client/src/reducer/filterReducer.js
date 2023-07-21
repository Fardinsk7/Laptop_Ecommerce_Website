const filterReducer = (state,action)=>{

    switch(action.type){
        case"LOAD_FILTER_PRODUCTS":
        const priceArr = action.payload.map((e)=> e.price)
        const maxPrice = Math.max(...priceArr);
            return{
                ...state,
                filter_Products: [...action.payload],
                all_Products: [...action.payload],
                filters:{...state.filters,maxPrice,price:maxPrice}
            }

        case "SET_GRID_VIEW":
            return{
                ...state,
                grid_View: true,
            }

        case "SET_LIST_VIEW":
            return{
                ...state,
                grid_View: false,
            }

        case "SORT":
            
            return{
                ...state,
                sorting_Value:action.payload,
            }

            case "SORT_ARRAY":
                let newArray = []
                const {filter_Products,sorting_Value} = state;
                let tempArray = [...filter_Products];

                const sortByPrice = (a,b)=>{
                    if(sorting_Value === "lowest"){
                        return a.price - b.price;
                    }
                    
                    if(sorting_Value === "highest"){
                        return b.price - a.price;
                    }
                    if(sorting_Value === "a-z"){
                        return a.name.localeCompare(b.name);
                    }
                    if(sorting_Value === "z-a"){
                        return b.name.localeCompare(a.name);
                    }
                    
                }
                
                newArray = tempArray.sort(sortByPrice);
            return{
                ...state,
                filter_Products :newArray,
            }


        case "UPDATE_VALUE":
            const{name,value} = action.payload;
            return{
                ...state,
                filters:{
                    ...state.filters,
                    [name]:value,
                }
            }

        case "FILTER_PRODUCTS":
            let {all_Products}= state;
            let {text,category,company,filter_colors,price} = state.filters;

            let tempProducts = [...all_Products];

            if(text){
                tempProducts = tempProducts.filter((e)=>{
                    return e.name.toLowerCase().includes(text.toLowerCase());
                })
            }
            if(category !=="All" ){
                
                tempProducts = tempProducts.filter((e)=>{
                    return e.category === category
                })
            }
            if(company !=="All"){
                
                tempProducts = tempProducts.filter((e)=>{
                    return e.company === company
                })
            }
            if(filter_colors !== "All"){
                tempProducts = tempProducts.filter((e)=>{
                    return e.colors.includes(filter_colors);
                })
            }

            if(price){
                if(price <= 0.2){
                    tempProducts = tempProducts.filter((e)=>{
                        return e.price;
                    })

                }else{
                    tempProducts = tempProducts.filter((e)=>{
                        return e.price <= price;
                    })

                }
            }
    

            return{
                ...state,
                filter_Products:tempProducts,
            }
        case "CLEAR_FILTERS":
            return{
                ...state,
                filters:{
                    text:"",
                    category:"All",
                    company:"All",
                    filter_colors:"All",
                    maxPrice:action.payload,
                    price:0,
                    minPrice:0,
                }
            }
        case "FILTER_ONOFF":
            if(state.filterOnOff === "On"){
                const filter = "Off";
                return{
                    ...state,
                    filterOnOff:filter,
                }
            }
            else{
                const filter = "On"
                return{
                    ...state,
                    filterOnOff:filter,
                }
            }

        default:
            return state
    }
}

export default filterReducer;