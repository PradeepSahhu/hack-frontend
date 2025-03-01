import React, { useState, useEffect } from 'react';
import { FaCalendarAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { FaWind } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";

const Current = () => {
    const [data, setData] = useState({
          temperature: 24,
          sunlight: 3.87,
          windspeed: 7.9,
          time: new Date().toLocaleTimeString(),
          date: new Date().toLocaleDateString(),
          location: 'New Delhi',
          longitude: 28.6139,
          latitude: 77.2088,
      });
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
        <div className='parent_c bg-gray-700'>
            <div className='child1_c'>
                <h1 className='h1A'>{data.temperature} </h1> <h1 className='h1B'>{'\u00B0'}C</h1>
            </div>
            <div className='child1_c'>
                <h4 style={{marginTop:'4px',marginRight:'6px'}} ><FaCalendarAlt /></h4>
                <h4>{data.date}</h4>
                <h4 style={{marginLeft:'40px'}}>{data.time}</h4>
            </div>
            <div className='child1_c'>
                <h4 style={{marginTop:'4px',marginRight:'6px'}} ><CiLocationOn /></h4>
                <h4>{data.location}</h4>
            </div>
            <div className='child1_c'>
                <h6 style={{marginTop:'4px',marginRight:'6px'}}><FaWind /></h6>
                <h4>{data.windspeed}</h4>
            </div>
            <div className='child1_c'>
                <h4 style={{marginTop:'4px',marginRight:'6px'}} ><IoIosSunny /></h4>
                <h4>{data.sunlight}</h4>
            </div>

        </div>
    </>
  )
}

export default Current