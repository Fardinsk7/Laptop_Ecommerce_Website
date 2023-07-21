import styled from "styled-components";
import { useFilterContext } from "../context/filterContext";
import GridView from "./GridView";
import ListView from "./ListView";


const ProductList = () => {
    const{ filter_Products,grid_View}=useFilterContext();
    const length = filter_Products.length
    if(grid_View === true){
        if(length === 0){
            return<Wrapper className="NoProducts">No Products Available</Wrapper>
        }
        return <GridView products={filter_Products}  />
    }
    if(grid_View === false){
        if(length === 0){
            return<Wrapper className="NoProducts">No Products Available</Wrapper>
        }
        return <ListView products={filter_Products}/>
    }
}

const Wrapper = styled.section`
height: 100vh;
width: 100%;
display:flex;
justify-content: center;
align-items:center;
font-size:7rem;
opacity:0.5;
background-color: #f0f3fa;
color: grey;

`

export default ProductList
