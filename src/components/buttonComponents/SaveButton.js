import React from 'react'

export default function SaveButton({ graph, graphName }) {

    const handleSaveGraph = () => {
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                graphName: graphName,
                nodes: graph.nodes,
                edges: graph.edges,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Data received from the server:', data);
            })
            .catch((error) => {
                // Handle errors, such as network errors or JSON parsing errors
                console.error('Error:', error);
            });
    };

  return (
    <button className='buttons' onClick={handleSaveGraph}>SAVE GRAPH</button>
  )
}
