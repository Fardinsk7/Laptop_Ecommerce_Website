import React, { useEffect, useState } from 'react'
import "./Admin.css"
import { useAdmninContext } from './context/AdminContext';import "./Admin.css"
import { useNavigate } from 'react-router-dom';
import Button from "./styles/Button"

const DataProduct = () => {
    const {uploadProduct,imgData=[],adminLogout} = useAdmninContext();
  const [select ,setSelect] = useState("")
  let mainObj = {};
  const navigate = useNavigate()

  const [data,setData] = useState({
    name:"",
    company:"",
    price:"",
    colors:"",
    category:"",
    stock:"",
    reviews:"",
    stars:"",
    description:"",
  })

 
   
  const handleSubmit =  (e)=>{
    e.preventDefault();
    let colorsArr = data.colors.split(" ")
      Object.assign(mainObj,data);
      mainObj={...mainObj,featured:select,image:[...imgData],colors:colorsArr}
      uploadProduct(mainObj)
      navigate("/admin/upload")

  }



  const handleSelect = (e)=>{
    setSelect(e.target.value)
  }

  const handleData = (e)=>{
      let value = e.target.value;
      setData({
        ...data,
        [e.target.name]:value
      })

  
  }
 
  const handleLogout =()=>{
    navigate("/admin/login")
    adminLogout()
  }
  
 
  useEffect(()=>{
    if(!(localStorage.getItem("Id"))){
      navigate("/admin/login")
    }
    if(imgData.length === 0){
      navigate("/admin/upload")
    }
  
  },[imgData.length,navigate])

 
  return (
    
    <div className='main' style={{height:"auto"}}>
        <form action="" onSubmit={handleSubmit} className='ProductForm'>
          
       <div className="first">
          <input type="text" placeholder='Name'name='name' value={data.name} onChange={(e)=>{handleData(e)}} />
          <input type="text" placeholder='Company Name' name='company' value={data.company} onChange={(e)=>{handleData(e)}} />
          </div>

          <div className="second">
          <input type="text" placeholder='Product Price' name='price' value={data.price}  onChange={(e)=>{handleData(e)}} />
          <input type="text" placeholder='Product category' name='category' value={data.category}  onChange={(e)=>{handleData(e)}}/>

          </div>


          <div className="third">
          <input type="text" placeholder='Stocks Available' name='stock' value={data.stock} onChange={(e)=>{handleData(e)}}/>
          <input type="text" placeholder='Number of reviews' name='reviews' value={data.reviews} onChange={(e)=>{handleData(e)}}/>
          </div>

          <div className="fourth">
          <select value={select.feature} className='featured' onChange={(e)=>{handleSelect(e)}}>
            <option value="Select_Feature" onChange={(e)=>{handleSelect(e)}}>Select Feature</option>
            <option value="true" onChange={(e)=>{handleSelect(e)}}>true</option>
            <option value="false" onChange={(e)=>{handleSelect(e)}}>false</option>
          </select>
          <input type="text" placeholder='Add Stars'  name='stars' value={data.stars} onChange={(e)=>{handleData(e)}}/>
          </div>

          <input type="text" placeholder='Add Colors Available' name='colors' value={data.colors} onChange={(e)=>{handleData(e)}} style={{width:"90%"} } className='colors'/>
          <textarea rows="3" cols="4" placeholder='Description' name='description' style={{width:"90%",textTransform:"none",padding:"10px 5px",}} value={data.description} onChange={(e)=>{handleData(e)}}/> 

          <button className="submit">Submit</button>
          <button className="submit" onClick={()=>{navigate("/admin/editProducts")}}>All Products</button>
          <Button onClick={handleLogout}>Logout</Button>
          <h2>Choosen Images</h2>
          {
            imgData.map((e,i)=>{
              return <img key={i} src={e} alt={e} height="100px" width="100px"/>
            })
          }

          </form>
    </div>
  )
}

export default DataProduct
