import React from 'react'
import { useAdmninContext } from './context/AdminContext'

const Alert = () => {
    const {msg,alertColor} = useAdmninContext()
  return (
    <div style={{fontSize:"12px",margin:"40px auto",display:"flex",alignItems:"center",justifyContent:"center", borderRadius:"20px",backgroundColor:`${alertColor === "red"?"#f2bbbb":"#c4f2bb"}`,color:`${alertColor === "red"?"red":"green"}`,padding:"18px",fontWeight:"700"}}>
      {msg}
    </div>
  )
}

export default Alert
