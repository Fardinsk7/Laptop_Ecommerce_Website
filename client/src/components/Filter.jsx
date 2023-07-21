import React from 'react'
import { useState } from 'react'

const Filter = () => {
    const[text,setText] = useState()
  return (
    <div>
      <input type="text" onChange={(e)=>{setText(e.target.value)}} />
    </div>
  )
}

export default Filter
