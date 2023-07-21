import { useAdmninContext } from "./context/AdminContext"
import "./Admin.css"
import Stars from "./components/Stars";
import {FaTrash} from "react-icons/fa";
import Button from "./styles/Button"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const AdminProduct = () => {
    const{alldata,deleteProduct,adminLogout} = useAdmninContext();
    const navigate = useNavigate()
    const handleDelete = (e)=>{
        if(window.confirm("Are you sure?, you want to delete this item ")){
            
            deleteProduct(e)
        }
        
    }
    const handleLogout =()=>{
      navigate("/admin/login")
      adminLogout()
    }
  useEffect(()=>{
    if(!(localStorage.getItem("Id"))){
      navigate("/admin/login")
    }
  },[navigate])
    
  return (
    <>
      <Button onClick={handleLogout}>Admin Logout</Button>
      <Button onClick={()=>{navigate("/admin/upload")}} style={{margin:"0 15px"}}>Upload Product</Button>
    <div className="product-main">
      {
        alldata.map((e,i)=>{
            
            return<div key={e._id} className="product-box">
                <button className="delete-icon" onClick={()=>{handleDelete(e._id)}}><FaTrash /></button>
                <img src={e.image[0]} alt={i} height="150px" width="150px"/>
                <h3>Name:{e.name}</h3>
                <h3>Price:{e.price}</h3>
                <h3><Stars stars={e.stars} reviews={e.reviews} /></h3>
                <div><span style={{fontSize:"20px"}}>Colors: </span>
                {
                    e.colors.map((e,i)=>{
                        return <button key={i} style={{backgroundColor:`${e}`,height:"20px",width:"20px",borderRadius:"100%",border:'1px solid grey',margin:"3px" }}></button>
                    })
                }

                </div>
                <h3>Category:{e.category}</h3>
                <h3>Company:{e.company}</h3>
                <h3>Stocks Available : {e.stock}</h3>
                <h3>Featured : {e.featured?"Yes":"No"}</h3>
                <p>Description:{e.description}</p>
            </div>
            
        })
      }
    </div>
    </>
  )
}

export default AdminProduct
