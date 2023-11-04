import React, { useState } from 'react'
import handleFormChanges from './Utilitaries';

export default function VerticesInput({ graph, updateGraph }) {

    const [nodeInformations, setNodeInformations] = useState([])

    const addNode = () => {
      const newNode = {
        id: nodeInformations[0],
        label: nodeInformations[0],
        data: nodeInformations,
        shape: "circle",
      };

      const prevNodes = graph.nodes
      const prevEdges = graph.edges
  
      updateGraph({
        nodes: [...prevNodes, newNode],
        edges: [...prevEdges],
      });
      
    }

    const removeNode = () => {
      const actualNodes = graph.nodes
      const actualEdges = graph.edges
      const newNodes = actualNodes.filter(node => node.label !== nodeInformations[0])

      updateGraph({
          nodes: newNodes,
          edges: actualEdges
      })
    }

  return (
    <div className='verticesInput'>
        <h2 className='titles'>Family Member</h2>

        <form>
          <label for='firstname'>First Name:</label><br/>
          <input 
          onChange={(e) => handleFormChanges(e, 0, nodeInformations, setNodeInformations)}
          type='text' 
          id='firstname' 
          name='firstname' /> <br/>

          <label for='lastname'>Last Name:</label><br/>
          <input 
          onChange={(e) => handleFormChanges(e, 1, nodeInformations, setNodeInformations)}
          type='text' 
          id='lastname' 
          name='lastname' /><br/>

          <label for='age'>Age:</label><br/>
          <input 
          onChange={(e) => handleFormChanges(e, 2, nodeInformations, setNodeInformations)}
          type='text' 
          id='age' 
          name='age' /><br/>

          <label for='gender'>Gender: </label>
          <select onChange={(e) => handleFormChanges(e, 3, nodeInformations, setNodeInformations)} name='genders' id='genders'>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select><br/>

          <label for='profesion'>Profession: </label>
          <input 
          onChange={(e) => handleFormChanges(e, 4, nodeInformations, setNodeInformations)}
          type='text'
          id='prefesion'
          name='profession' /><br />

          <label for='contact'>Contact (email): </label>
          <input
          onChange={(e) => handleFormChanges(e, 5, nodeInformations, setNodeInformations)}
          type='text' 
          id='contact' 
          name='contact' /><br />
          
        </form> <br/>
        <button onClick={addNode}>Add Member</button>
        <button onClick={removeNode}>Remove Member</button>
    </div>
  )
}


