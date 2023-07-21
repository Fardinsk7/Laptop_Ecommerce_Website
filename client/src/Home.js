import React from 'react'
import Herosection from './components/Herosection'
import Trusted from './components/Trusted'
import Service from './components/Service'
import FeatureProduct from './components/FeatureProduct'

const Home = () => {
  const data = {
    intro:"Welcome to",
    name:"Cayman Laptop",
  }
  return (
    <>
    <Herosection myData={data} />
    <FeatureProduct/>
    <Service/>
    <Trusted/>
    </>
  )
}



export default Home
