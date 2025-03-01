import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import { useState, useEffect } from 'react';

const Dashboard2 = () => {
  const [xAxis_data, setxAxis_data] = useState([])
  const [series_data, setseries_data] = useState([])

  useEffect(() => {
    const fetch_xAxis = async() =>{
        try{
            const response = await fetch('')
            const data = await response.json()
            setxAxis_data(data.xAxis)
        }
        catch(e){
            console.log('error fetching xAxis data')
        }
    }
  
    return () => {
      second
    }
  }, [third])
  
  
      
    return (
      <>
          <div className='second_dash'>
              <LineChart
                  xAxis={[{ data: data.xAxis },
                  ]}
                  series={[
                  {
                      data: data.series_data[0],
                  },
                  {
                      data: data.series_data[1]
                  }
                  ]}
                  width={500}
                  height={300}
              />
          </div>
      </>
    )
}

export default Dashboard2