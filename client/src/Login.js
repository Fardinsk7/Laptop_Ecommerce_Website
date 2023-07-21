import { useState } from "react";
import "./Auth.css";
import { NavLink, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { useAdmninContext } from "./context/AdminContext";

const Login = () => {
    const {showAlert,alert,UserLogin} = useAdmninContext();
    const navigate = useNavigate();
    const [data,setData] = useState({
        email:"",
        password:"",
    })

    const handleData = (e)=>{
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]:value
        })
    }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const {password} = data;
        if(password.length <7){
           return showAlert("Password lenght should greater 7 character","red");
        }
        
        const res = await UserLogin(data)
        if(res){
                showAlert(res.data.message,"green")
                localStorage.setItem("authToken",res.data.token)
                setTimeout(() => {
                    navigate("/")
                }, 1000);

        }
        else{

                showAlert(res.response.data.message,"red")
                
        }
        
    }

  return (
    <>
      <div className="main">
        {alert && <Alert/>}
        <form action="" onSubmit={(e)=>{handleSubmit(e)}} className="Authform">
            <input type="email" name='email' placeholder='Email' onChange={(e)=>{handleData(e)}} required />
            <input type="text" name='password' placeholder='Password' onChange={(e)=>{handleData(e)}} required />
            <button type='submit' className="submit" style={{backgroundColor:"black"}}>Login</button>
            <div>
            <hr/>
            <span style={{fontWeight:"700",padding:"4px",backgroundColor:"white",position:"relative",left:"45%",top:"0"}}>Or</span>
            <p className="bottom">Don't have an account <NavLink to="/signup">Create Account</NavLink></p>
            </div>
        </form>

      </div>
    </>
  )
}

export default Login
