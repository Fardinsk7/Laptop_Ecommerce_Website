import React from 'react'
import Herosection from './components/Herosection'
import { useProductContext } from './context/productContext'

const About = () => {
  const {Name} = useProductContext();
  const data ={
    intro:"",
    name:"About us",
  }
  return (
    <>
    {Name}
    <Herosection myData={data}/>
    </>
  )
}

export default About
