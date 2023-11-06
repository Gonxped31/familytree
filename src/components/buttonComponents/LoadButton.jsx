import React from 'react';

export default function LoadButton({ updateGraph, graphName }) {
    const handleLoad = () => {
        fetch(`/?graphName=${graphName}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            return response.text(); // Parse the response as JSON
        })
        .then((data) => {
            if (!data) {
                alert("This graph doesn't exist.");
            } else {
                const jsonData = JSON.parse(data);
                updateGraph({
                    nodes: JSON.parse(jsonData.nodes),
                    edges: JSON.parse(jsonData.edges),
                });
            }
        })
        .catch((error) => {
            console.log("Error fetching data: ", error);
        });
    }

    return <button className='buttons' onClick={handleLoad}>LOAD GRAPH</button>
}
