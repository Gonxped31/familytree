import React, { useState } from 'react'
import handleFormChanges from './Utilitaries';
import '../styles/ModifyNode.css'

export default function ModifyNode({ graph ,selectedNode, updateGraph, editMode }) {
    const [nodeInfos, updateNodeInfos] = useState([selectedNode.data[0], selectedNode.data[1],selectedNode.data[2],
                                                    selectedNode.data[3],selectedNode.data[4],selectedNode.data[5],
                                                    selectedNode.data[6], selectedNode.data[7]]);

    const handleForm = (e) => {
        e.preventDefault();
        const newNodes = graph.nodes.filter((node) => node.id !== selectedNode.id);

        selectedNode.data = nodeInfos;
        const modifiedNode = {
            id: nodeInfos[0],
            label: nodeInfos[0],
            data: nodeInfos,
            shape: "circle",
        }
        
        updateGraph({
            nodes: [...newNodes, modifiedNode],
            edges: graph.edges,
        });
    }
    

  return (
    <div>
        {editMode && 
        <div>
            <h2>Edit node informations</h2>
            <form>
                <label for='firstname'>First Name:</label><br/>
                <input 
                type='text' 
                id='firstname' 
                value={nodeInfos[0]}
                name='firstname' 
                onChange={(e) => handleFormChanges(e, 0, nodeInfos, updateNodeInfos)}
                /> <br/>

                <label for='lastname'>Last Name:</label><br/>
                <input 
                type='text' 
                id='lastname' 
                value={nodeInfos[1]}
                name='lastname'
                onChange={(e) => handleFormChanges(e, 1, nodeInfos, updateNodeInfos)}
                 /><br/>

                <label for='age'>Age:</label><br/>
                <input 
                onChange={(e) => handleFormChanges(e, 2, nodeInfos, updateNodeInfos)}
                type='text' 
                id='age' 
                value={nodeInfos[2]}
                name='age' /><br/>

                <label for='gender'>Gender: </label>
                <select 
                onChange={(e) => handleFormChanges(e, 3, nodeInfos, updateNodeInfos)} 
                name='genders' 
                id='genders'
                value={nodeInfos[3]}>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                </select><br/>

                <label for='profesion'>Profession: </label>
                <input 
                onChange={(e) => handleFormChanges(e, 4, nodeInfos, updateNodeInfos)}
                type='text'
                id='prefesion'
                value={nodeInfos[4]}
                name='profession' /><br />

                <label for='contact'>E-mail: </label>
                <input
                onChange={(e) => handleFormChanges(e, 5, nodeInfos, updateNodeInfos)}
                type='text' 
                id='courriel'
                value={nodeInfos[5]}
                name='courriel' /><br />

                <label for='contact'>Phone number: </label>
                <input
                onChange={(e) => handleFormChanges(e, 6, nodeInfos, updateNodeInfos)}
                type='text' 
                id='phone'
                value={nodeInfos[6]}
                name='phone' /><br />

                <label for='contact'>Other information: </label>
                <input
                onChange={(e) => handleFormChanges(e, 7, nodeInfos, updateNodeInfos)}
                type='text' 
                id='other'
                value={nodeInfos[7]}
                name='other' /><br />

                <button type="button" onClick={handleForm}>Save</button>
            </form>
        </div>}
    </div>
  )
}
