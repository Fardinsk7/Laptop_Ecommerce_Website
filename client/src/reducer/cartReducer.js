const cartReducer = (state,action)=>{
    switch(action.type){
        case "ADD_TO_CART":
            const {id,color,amount,product}= action.payload;

            const ProductExist = state.cart.find((e)=>{
                return e.id === (id+color)
            })
            if(ProductExist){
                const updateAmount= state.cart.map((e)=>{
                    if(e.id === (id+color)){
                        let newAmount = e.amount+amount;
                        if(newAmount >= e.max){
                            newAmount = e.max
                        }
                        return{
                            ...e,
                            amount: newAmount,
                        }
                    }
                    else{
                        return e
                    }
                });
                return{
                    ...state,
                    cart:updateAmount,
                }
            }
            else{
                
                let cartItem = {
                    id: id+color,
                    name: product.name,
                    color,
                    amount,
                    image: product.image[0],
                    price: product.price,
                    max:product.stock,
                }
                
                
                return{
                    ...state,
                    cart:[...state.cart,cartItem],
                }
            }


        case "REMOVE_ITEM":
            const updateCart = state.cart.filter((e)=>e.id !==action.payload)
            return{
                ...state,
                cart:updateCart,
            }
        
        case "CLEAR_CART":
            return{
                ...state,
                cart:[],
            }

        case "ADDSUB_AMOUNT":
            
            const updateAmount = state.cart.map((e)=>{
                if(action.payload.id === e.id){
                    if(action.payload.method === "add"){
                        let add = e.amount+1;
                        if(add >= e.max){
                            add = e.max;
                        }
                        return{
                            ...e,
                            amount:add,
                        }
                    }
                    else{
                        let sub = e.amount-1;
                        if(e.amount === 1){
                            sub = 1;
                        }
                        return{
                            ...e,
                            amount:sub,
                        }
                    }

                }
                else{
                    return e
                }
            });


            return{
                ...state,
                cart:updateAmount,
            }
        
        case "CARTVALUE_AND_TOTAL":
           
            const {total_Item,total_Amount} = state.cart.reduce((acc,e)=>{
                let add = e.amount *e.price;
                acc.total_Amount +=add;
                acc.total_Item+=e.amount;
                return acc;

            },{total_Item:0,total_Amount:0})

            return{
                ...state,
                total_Item,
                total_Amount,
            }

        default:
            return state
    }

}

export default cartReducer;