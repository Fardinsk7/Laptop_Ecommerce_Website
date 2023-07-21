import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useProductContext } from "./context/productContext";
import { useEffect } from "react";
import Spinner from "./components/Spinner";
import PageNavigation from "./components/PageNavigation";
import {Container} from "./styles/Container";
import MyImage from "./components/MyImage";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import FormatPrice from "./Helper/FormatPrice";
import Stars from "./components/Stars"
import AddtoCart from "./components/AddtoCart";

// const API = "https://api.pujakaitem.com/api/products";
const API = `${process.env.REACT_APP_API_KEY}/admin/`;
const SingleProduct =()=>{

  const {id} = useParams();
  const {getSingleProduct,singleLoading,singleProduct} = useProductContext();
  // eslint-disable-next-line
  const {id:alias,name="",company,price,description,category,stock,stars,reviews,image} = singleProduct;
  useEffect(()=>{
    getSingleProduct(`${API}${id}`);
    // eslint-disable-next-line
  },[])

  return <Wrapper>
    {singleLoading && <Spinner/>}
    <PageNavigation name={name.length>10?`${name.slice(0,20)}...`:name} />
    <Container className="container">
    <div className="grid grid-two-column">
          {/* product Images  */}
          <div className="product_images">
            <MyImage imgs={image} />
          </div>

          {/* product dAta  */}
          <div className="product-data">
            <h3 style={{fontWeight:"700"}}>{name}</h3>
            <Stars stars={stars} reviews={reviews} />
            <p>{reviews} reviews</p>
            <p className="product-data-price">
              MRP:
              <del>
                <FormatPrice price={(price + 5000)} />
              </del>
            </p>
            <p className="product-data-price product-data-real-price">
              Deal of the Day: <FormatPrice price={price} />
            </p>
            <p>{description}</p>
            <div className="product-data-warranty">
              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>Free Delivery</p>
              </div>

              <div className="product-warranty-data">
                <TbReplace className="warranty-icon" />
                <p>30 Days Replacement</p>
              </div>

              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p> Delivered </p>
              </div>

              <div className="product-warranty-data">
                <MdSecurity className="warranty-icon" />
                <p>2 Year Warranty </p>
              </div>
            </div>

            <div className="product-data-info">
              <p>
                Available:
                <span> {stock > 0 ? "In Stock" : "Not Available"}</span>
              </p>
             
              <p>
                Brand :<span> {company} </span>
              </p>
            </div>
              <hr/>
              {stock>0 && <AddtoCart product={singleProduct} />}
          </div>
        </div>

    </Container>

  </Wrapper>;
}

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
  }
  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;

export default SingleProduct;
