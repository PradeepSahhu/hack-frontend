import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart'
import { useState, useEffect } from 'react'

const Windgraph = () => {
    const [dataw, setdataw] = useState({
        windspeed:[],
        windpower:[],
        time:[],
    })
    const [index, setIndex] = useState(0);
    const handleButtonClick = (buttonIndex) => {
        setIndex(buttonIndex*24);
        console.log(index)
    };
    
    useEffect(() => {
            const fetchData = async () => {
              try {
                const response = await fetch(`http://192.168.167.225:5001/predict?latitude=28.4446151&longitude=83.13314027`); 
                const data = await response.json();
                
    
                console.log(data);
                if (data && data.hourly) {
                    const times = data.hourly.formatted_time;
                    const windEnergy = data.hourly.wind_energy;
                
        
                  setdataw((prev) => ({
                    ...prev,
                    time: times,
                    windpower: windEnergy
                  }));
                }
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            };
        
            fetchData(); 
          }, []);
    
        const hours = dataw.time.slice(index, index+24).map((timestamp) => {
            const date = new Date(timestamp);
            let hours = date.getHours(); 
            let minutes = date.getMinutes(); 

            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
    
            return `${hours}`;
        });
        const windP = dataw.windpower.slice(index,index+24).map((val)=> val/1000);
        console.log(hours)
        console.log(windP)
  return (
    <>
    <div><h1 className='Gh'>Wind power generation</h1></div>
        <div style={{display:'flex',flexDirection:'row'}}>
            <LineChart
            xAxis={[{   
                data: hours,
                label: 'Time (in hours)'
            }]}
            yAxis={[{label: 'Power'}]}
            series={[{
                data: windP,
                label: 'wind power (in kW)'
            }]}
            width={800}
            height={250}
            />
            <div style={{marginTop:'80px', backgroundColor:'black', maxHeight:'45px', color:'white',padding:'10px', borderRadius:'20px'}}>
                Selected Day {index/24+1}
            </div>
        </div>
        <div>
            <div style={{ display: 'flex', gap: '10px' }}>
                {Array.from({ length: 14 }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => handleButtonClick(i)}
                        style={{padding: '10px', fontSize: '16px', backgroundColor: 'black', color: 'white', borderRadius: '10px', }}                        >
                        Day {i + 1}
                    </button>
                ))}
            </div>
        </div>

    </>
  )
}

export default Windgraph
