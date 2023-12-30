
export default function handleFormChanges(e, index, nodeInformations ,setNodeInformations) {
    // new value
    const newValue = e.target.value
  
    // copy the informations
    const newNodeInformations = [...nodeInformations]
  
        // replace the old value
    newNodeInformations.splice(index, 1, newValue)
  
    // update the informations
    setNodeInformations(newNodeInformations)
}


// APIs call
export async function fetchGraphs() {
    try {
        const response = await fetch('/getGraphs', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error("Error: the network response wasn't ok");
        }
        return await response.text();
    } catch (error) {
        console.log("Error: ", error);
    }
}

export async function deleteGraph({ graphName }) {
    console.log("IN !!")
    try {
        const response = await fetch(`/?graphName=${graphName}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error("Network error: Check your server and then reload the page.");
        }
        return await response.text();
    } catch (error) {
        console.log("Error deleting the graph: ", error);
    }
}

export function saveGraph(graph) {
    fetch('/saveGraph', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            graphName: graph.name,
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
            console.error('Error saving the graph:', error);
        });
};


