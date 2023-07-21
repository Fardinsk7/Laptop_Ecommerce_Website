import styled from "styled-components";
import FilterSection from "./components/FilterSection";
import Sort from "./components/Sort";
import ProductList from "./components/ProductList";
import Button from "./styles/Button";
import { useFilterContext } from "./context/filterContext";

const Products = () => {
  const{showfilter} = useFilterContext()

  const filterOnOffs = ()=>{
    showfilter()
  }

  return (
    <Wrapper>
    <div className="container grid grid-filter-column">
      <div>
        <FilterSection  />
      </div>

      <section className="product-view--sort">
        <div className="sort-filter">
          <Sort />
        </div>
        <Button className="filter-btn" onClick={()=>filterOnOffs()}>Filter</Button>
        <div className="main-product">
          
          <ProductList />
        </div>
      </section>
    </div>
  </Wrapper>
    );
};

const Wrapper = styled.section`
.grid-filter-column {
    grid-template-columns: 0.2fr 1fr;
  }
  .product-view--sort{

    .filter-btn{
      display:none;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-filter-column {
      grid-template-columns: 1fr;
      .product-view--sort{
    
        .filter-btn{
          display:block;
        }
      }
    }
  }
`;

export default Products;
