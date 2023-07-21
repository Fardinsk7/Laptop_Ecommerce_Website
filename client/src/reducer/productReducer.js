const ProductReducer = (state,action)=>{
    
    switch(action.type){
        case "API_LOADING":
            return{
                ...state,
                Loading:true,
            }
        case "SET_API_DATA":
            const featuredData = action.payload.filter((e)=>{
                return e.featured === true;
            })
            
            
            return{
                
                ...state,
                Loading: false,
                Error: false,
                products: action.payload,
                featuredProduct: featuredData,
            }
        case "ERROR":
            return{
                ...state,
                Error:true,
            }
        case "SINGLE_LOADING":
            return{
                ...state,
                singleLoading: true,
            }
        case "SET_SINGLE_ERROR":
            return{
                ...state,
                singleError: true,
            }
        case "SET_SINGLE_PRODUCT":
            return{
                ...state,
                singleLoading:false,
                singleProduct:action.payload,
            }
        case "DETAILS":
            const data = action.payload;
            return{
                ...state,
                details:data,
            }
        default:
            break;
    }

}
export default ProductReducer;