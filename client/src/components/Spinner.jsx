import React from 'react'
import styled from 'styled-components'

const Spinner = () => {
  return (
    <Wrapper>
     <img src="./images/loading-load.gif" alt="" className='spinner' /> 
    </Wrapper>
  )
}
const Wrapper = styled.section`
    display: flex;
    justify-content: center;
    align-item: center;
    .spinner{
        height:100px;
        width: 150px;
        
    }
`;

export default Spinner
