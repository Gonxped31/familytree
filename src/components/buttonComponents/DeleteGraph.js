import React from 'react'

export default function DeleteGraph({ graphName }) {
    
    const handleClick = () => {
      fetch(`/?graphName=${graphName}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      }).then((response) => {
        if (!response.ok){
          throw new Error("Network error: Check your server and then reload the page.");
        }
        return response.text();
      })
      .then((res) => alert(JSON.parse(res).message));
    }


  return <button onClick={handleClick} className='buttons'>DELETE</button>
}
