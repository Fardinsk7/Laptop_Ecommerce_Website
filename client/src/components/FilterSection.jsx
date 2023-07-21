import styled from "styled-components";
import { useFilterContext } from "../context/filterContext";
import { FaCheck } from "react-icons/fa";
import FormatPrice from "../Helper/FormatPrice";
import Button from "../styles/Button"
import {ImCross} from "react-icons/im"

const FilterSection = () => {
const{updateFilters,filters:{text},all_Products,filters:{filter_colors},filters:{maxPrice},filters:{price},filters:{minPrice},clearFilters,filterOnOff,showfilter} = useFilterContext();

const getUniqueData = (data,property)=>{
    let newData = data.map((e)=>{
      return e[property];
    })
    if(property === "colors"){
      //These are two Superb ways to get unique data from array
      // return newData = ["All",...new Set([].concat(...newData))];
       newData = newData.flat()
    }
    
    return newData = ["All", ...new Set(newData)];
    
}

const category = getUniqueData(all_Products,"category");
const companyData = getUniqueData(all_Products,"company")
const colorsData = getUniqueData(all_Products,"colors");



  return (
    <Wrapper style={filterOnOff ==="Off"?{visibility:"hidden",position:"absolute"}:{visibility:"visible"}}>

      <ImCross className="cross" onClick={showfilter}/>
      <div className="filter-search">

      <form action="" onSubmit={(e)=>{ e.preventDefault()}}>
      <input type="text" onChange={updateFilters} value={text} name="text" style={{textTransform:"none"}} />

      </form>
      </div>

    <div className="filter-category">
      <h3>Category</h3>
      <div>
        {
          category.map((e,i)=>{
            return <button name="category" key={i} value={e} type="button" onClick={updateFilters} >{e}</button>
          })
        }
      </div>
    </div>

    <div className="filter-Company">
      <h3>Company</h3>
      <form action="#" onClick={(e)=> e.preventDefault()} >
        <select name="company" id="company" onClick={updateFilters} className="filter-company--select">
          {
            companyData.map((e,i)=>{
              return <option value={e} name="company" key={i}>{e}</option>
            })
          }
        </select>
      </form>
    </div>

    <div className="filter-colors colors">
      <h3>Colors</h3>
      <div className="filter-color-style" style={{width:"100px"}}>
        {
          colorsData.map((e,i)=>{
            if(e ==="All"){
              return (
                <button key={i} type="button" name="filter_colors" value={e} onClick={updateFilters}  className="color-all--style" style={{margin:"3px"}}>
                    All
                  </button>
              )
            }
            return (
              <button key={i} type="button" name="filter_colors" value={e} onClick={updateFilters} style={{backgroundColor:e,margin:"3px",border:"1px solid grey"}} className={filter_colors === e?"btnStyle active":"btnStyle"} >
                
                {filter_colors === e?<FaCheck className="checkStyle" />:null}
                </button>
            )
          })
        }
      </div>
    </div>

    <div className="filter_price">
      <h3>Price</h3>
      <p><FormatPrice price={price} /></p>
      <input type="range" min={minPrice} max={maxPrice} name="price" value={price} onChange={updateFilters} className=""  />
    </div>

    <div className="filter-clear">
      <Button className="btn"style={{color:'white'}} onClick={()=>clearFilters(maxPrice)}>Clear Filters</Button>
    </div>

    </Wrapper>
  )
}

const Wrapper = styled.section`


  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  .cross{
    display:none;
  }

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
  }

  .filter-color-style {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;    
  }

  .color-all--style {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}){
    .cross{
      display:block;
      font-size:20px;
      position: absolute;
      right:5%;
      top:1%;
    }
    position:absolute;
    
    background:white;
    z-index:99;
    width:90%;
    transition: all 0.5s ease-in;
  }
`;

export default FilterSection
