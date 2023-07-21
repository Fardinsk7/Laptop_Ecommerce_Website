import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import FormatPrice from '../Helper/FormatPrice';
import { useProductContext } from '../context/productContext';

const Product = (e) => {
    const {_id, image,name,price,category} = e;
    const {singleData} = useProductContext();
    useEffect(()=>{
      singleData(`${process.env.REACT_APP_API_KEY}/admin/${_id}`)
    },[_id,singleData])

    return (
    <NavLink to={`/admin/${_id}`}>
    <div className="card" >
      <figure>
        <img src={image} alt={name} />
        <figcaption className="caption">{category}</figcaption>
      </figure>

      <div className="card-data">
        <div className="card-data-flex">
          <h3>{name.length > 30? name.slice(0,30):name}</h3>
          <p className="card-data--price"><FormatPrice price={price} /></p>
        </div>
      </div>
    </div>
  </NavLink>
  )
}



export default Product
