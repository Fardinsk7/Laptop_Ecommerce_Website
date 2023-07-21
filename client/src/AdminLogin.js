import { useState } from "react";
import "./Admin.css";
import Alert from "./Alert";
import { useAdmninContext } from "./context/AdminContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [id,setId] =useState("");
    const [pass,setPass] = useState("")
    const {showAlert,alert} = useAdmninContext()
    const navigate = useNavigate()
   
    const ogId = "Fardin Khan";
    const ogPass = "1234@ecom";
    
    

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(id !== ogId || pass !== ogPass){
            showAlert("Wrong Credentials","red")
        }
        if(id === ogId && pass === ogPass){
            localStorage.setItem("Id",id);
            showAlert("Admin Login Success","green")
        }
        navigate("/admin/upload")


    }

  return (
    <div className="main">
     
        {
            alert &&<Alert/>
        } 
        
      <form action="" className="ProductForm" onSubmit={(e)=>{handleSubmit(e)}} style={{boxShadow:"1px 1px 7px grey",width:"300px", margin:"30px auto"}}>
        <input type="text" placeholder='Enter Admin id' value={id} style={{width:"100%"}} onChange={(e)=>{setId(e.target.value)}} required/>
        <input type="text" placeholder='Enter Password' value={pass} style={{width:"100%"}} onChange={(e)=>{setPass(e.target.value)}} required />
        <button type='submit' className="submit">Admin Login</button>
      </form>

    </div>
  )
}

export default AdminLogin
