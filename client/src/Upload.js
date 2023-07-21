import React, {useEffect, useState } from 'react'
import "./Admin.css"
import { useAdmninContext } from './context/AdminContext';
import { useNavigate } from 'react-router-dom';
import Button from "./styles/Button"

const Upload = () => {
  const {uploadToFirebase,uploadProgress,adminLogout} = useAdmninContext();
  const [img,setImg] = useState([]);
  const [nofile,setNofile] = useState("Choose Images")
  const navigate = useNavigate()

  
  const handleSubmit =  (e)=>{
    e.preventDefault();
    uploadToFirebase(img)
  }

  const handleFileUpload = async(e)=>{
    const Imgarr = [];
    const file = e.target.files;
    
    setNofile(`${file.length} files are selected`)
    for(let i =0;i<file.length;i++){
      Imgarr.push(file[i]);
    }
    setImg(Imgarr); 
  }

  const handleNext = ()=>{
    navigate("/admin/dataProduct")
    // setNofile("Upload Files")
    // setImg([""])
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
      <div className='main'>
        <form action="" onSubmit={handleSubmit} className='ProductForm'>
          <label htmlFor="uploadImages"> <div className='imagelabel'>{nofile}</div> </label>
          <input type="file" label="Image" accept='image/*' id="uploadImages" multiple onChange={(e)=>{handleFileUpload(e)}} style={{display:"none"}} />
          {
          img.length !== 0 &&<div>
            <h2>Choosen Images</h2>
            {
              img.map((e,i)=>{
                return <img key={i} alt={i} src={URL.createObjectURL(e)} height="100px" width="100px"/>
              })
            }
          </div>
        }
        <button type="submit" className='submit'> Upload Images</button>

        <div style={{width:"100%"}} ><p style={{margin:"0 10px"}}>{uploadProgress<99 ? uploadProgress>2?"Uploading":"" :"Uploaded"} </p><div style={{width:`${uploadProgress}%`,margin:"10px auto",height:"5px",backgroundColor:"blue",transition:"all 0.4s",float:"left"}}></div></div>
      {
        uploadProgress >=100&&(
          <button className='submit' onClick={handleNext}>Next</button>
          
        ) 
      }
      <button className="submit" onClick={()=>{navigate("/admin/editProducts")}}>All Products</button>
      <Button onClick={handleLogout}>Logout</Button>
        </form>
      </div>
    </>
  )
}


export default Upload
