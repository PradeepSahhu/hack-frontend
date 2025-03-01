import React, { useEffect, useState } from 'react'
import datax from './datax.json'
import { FaWind } from "react-icons/fa";

const Dashboard3 = () => {
    const [w_data, setdataw] = useState({
        temperature: [],
        solar: [],
        wind: [],
        time: []
    })

    useEffect(() => {
    const fetchData = async () => {
              try {
                const response = await fetch(`http://192.168.167.225:5001/predict?latitude=28.4446151&longitude=83.13314027`); 
                const data = await response.json();
                
    
                console.log(data);
                if (data && data.hourly) {
                    const times = data.hourly.formatted_time.map(timestamp => {
                        const date = new Date(timestamp);
                        let hours = date.getHours();
                        let minutes = date.getMinutes();
                        hours = hours < 10 ? '0' + hours : hours;
                        minutes = minutes < 10 ? '0' + minutes : minutes;
                        return `${hours}:${minutes}`;
                    });
            
                    const windEnergy = data.hourly.wind_energy.map(value => parseFloat(value).toFixed(2));
                    const solarEnergy = data.hourly.solar_energy.map(value => parseFloat(value).toFixed(2));
                    
                    const temp = data.hourly.temperature;
            
                    setdataw((prev) => ({
                        ...prev,
                        time: times,
                        wind: windEnergy,
                        temperature: temp,
                        solar: solarEnergy
                    }));
                }
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            };
        
            fetchData(); 
          }, []);
          

    return (
        <>
            <div className="lower_d">
                {w_data.time.length > 0 ? (
                    w_data.time.map((time, index) => (
                        <div key={index} className="widgets">
                                <h1>{w_data.time[index]}</h1>
                                <h2>{w_data.temperature[index]}°C</h2>
                                <div style={{display:'flex',flexDirection: 'row'}}><h2>{w_data.wind[index]}</h2></div>
                                
                        </div>
                    ))
                ) : (
                    <p>Loading data...</p>
                )}
            </div>
        </>
    )
}

export default Dashboard3
