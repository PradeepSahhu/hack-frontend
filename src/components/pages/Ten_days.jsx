import React from 'react'
import Windgraph from '../windgraph'
import Solargraph from '../solargraph'
const Ten_days = () => {
  return (
    <>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
            <Windgraph />
            <Solargraph />
        </div>

    </>
  )
}

export default Ten_days