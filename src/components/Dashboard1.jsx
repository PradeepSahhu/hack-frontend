import React, { useState, useEffect } from 'react';
import { FaCalendarAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { FaWind } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { WiDegrees } from "react-icons/wi";
import Dashboard_temp from './Dashboard_temp';
import Dashboard3 from './Dashboard3';

const Dashboard1 = () => {
  const [data2, setData] = useState({
      temperature: [],
      sunlight: [],
      windspeed: [],
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      longitude: 28.6139,
      latitude: 77.2088,
  });
  useEffect(() => {
      const fetchData = async () => {
                try {
                  const response = await fetch(`http://192.168.167.225:5001/predict?latitude=28.4446151&longitude=83.13314027`); 
                  const data = await response.json();
                  
      
                  console.log(data);
                  if (data && data.hourly) {
                      const windSpeed = data.hourly.wind_speed.map(value => parseFloat(value).toFixed(2));
                      const solarEnergy = data.hourly.shortwave_radiation.map(value => parseFloat(value).toFixed(2));
                      
                      const temp = data.hourly.temperature;
              
                      setData((prev) => ({
                          ...prev,
                          windspeed: windSpeed,
                          temperature: temp,
                          sunlight: solarEnergy
                      }));
                  }
                } catch (error) {
                  console.error('Error fetching data:', error);
                }
              };
          
              fetchData(); 
            }, []);

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({
          ...prevData,
          [name]: value
      }));
  }

  useEffect(() => {
      const interval = setInterval(() => {
          const now = new Date();
          setData((prevData) => ({
              ...prevData,
              time: now.toLocaleTimeString(),
              date: now.toLocaleDateString()
          }));
      }, 1000);

      return () => clearInterval(interval);
  }, []);

  return (
      <>
          <div>
              <div className='parent'>
              
                  <div className='Dash_U bg-gray-700'>
                      <div className='left_side'>
                      <div style={{display:'flex', flexDirection:'row', position:'relative', paddingBottom:'20px'}}>
                        <div >
                           longitude: <input className="outline-hidden border-none" value={data2.longitude} name='longitude' onChange={handleInputChange} type='text'></input> 
                        </div>
                        <div>
                        latitude: <input className="outline-hidden border-none" value={data2.latitude} name='latitude' onChange={handleInputChange} type='text' />
                        </div>
                        
                        
                      </div>

                          <div style={{display:'flex',flexDirection:'row'}}>
                              {/* <h1 style={{position:'absolute',left:'26%'}}><WiDegrees /></h1> */}
                              <h1 className='h1A'>{data2.temperature[0]} </h1> <h1 className='h1B'>{'\u00B0'}C</h1>
                              
                          </div>
                          <div className='same_l'>
                              <div><FaCalendarAlt /></div>
                              <div>{data2.date}</div>
                              <div>{data2.time}</div>
                          </div>
                      </div>
                      <div className='right_side'>
                          <div className='same_l'>
                              <div><FaWind /></div>
                              <div>{data2.windspeed[0]}</div>
                          </div>
                          <div className='same_l'>
                              <div><IoIosSunny /></div>
                              <div>{data2.sunlight[0]}</div>
                          </div>
                      </div>
                  </div>
              </div>
              <div>
                <Dashboard_temp />
              </div>
              <div>
                <Dashboard3 />
              </div>
              
          </div>
      </>
  );
}

export default Dashboard1;