import React, { useState } from 'react';
import '../../styles/ModifyNode.css';

export default function ViewGraphButton() {
  const [display, setDisplay] = useState(false);
  const [datas, setDatas] = useState([]);
  

    const handleClick = () => {
      fetch('/viewGraphs', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      })
      .then((response) => {
        if (!response.ok){
          throw new Error("Network error")
        }
        return response.text();
      })
      .then((datas) => {
        const jsonDatas = JSON.parse(datas);
        setDatas(jsonDatas);
        setDisplay(true);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      })

    }

  return (
  <div>
    <button className='buttons' onClick={handleClick}>
    VIEW MY GRAPHS
    </button>
    {display && 
      <div className='modal-background'>
        <div className='modal-content'>
          <h2 style={{color: 'black'}}>My graphs</h2>
          <ul style={{color: 'black'}}>
            {datas.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
          <button className='close-button' onClick={() => setDisplay(false)}>x</button>
        </div>
      </div>
    }
  </div>
  )
}
