import React, { useState } from 'react'
import handleFormChanges from './Utilitaries';
import '../styles/ModifyNode.css'
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DynamicInput from './DynamicInput';


export default function ModifyNode({ graph ,selectedNode, updateGraph, setEditNodeMode }) {
    const [nodeInfos, updateNodeInfos] = useState([selectedNode.data[0], selectedNode.data[1],selectedNode.data[2],
                                                    selectedNode.data[3],selectedNode.data[4],selectedNode.data[5],
                                                    selectedNode.data[6], selectedNode.data[7]]);

    const [linkInfo, updateLinkInfo] = useState([]);
    const [removeLinkInfo, updateRemoveLinkInfo] = useState([]);


    // Remove the node selected and add a new node with the new informations
    const handleForm = (e) => {
        e.preventDefault();
        const newNodes = graph.nodes.filter((node) => node.id !== selectedNode.id);
        const id = `${nodeInfos[0]}${nodeInfos[1]}`;
        var modifiedNode = {};
        selectedNode.data = nodeInfos;
        if (nodeInfos[1] !== "Null"){
            modifiedNode= {
                id: id,
                label: `${nodeInfos[0]} ${nodeInfos[1][0]}.`,
                data: nodeInfos,
                shape: "circle"
            }
        } else {
            modifiedNode= {
                id: `${nodeInfos[0]}`,
                label: `${nodeInfos[0]}`,
                data: nodeInfos,
                shape: "circle"
            }
        }
    
        var newEdges = graph.edges;

        if (linkInfo.length > 0) {
            for (let i = 0; i < linkInfo.length; i++) {
                newEdges = [...newEdges, {from: id, to: linkInfo[i], arrows: {from: {enabled: false}, to: {enabled: false}}}];
            }
        }

        if (removeLinkInfo.length) {
            for (let i = 0; i < removeLinkInfo.length; i++) {
                newEdges = newEdges.filter((edge) => !(edge.from === id && edge.to === removeLinkInfo[i]) && !(edge.to === id && edge.from === removeLinkInfo[i]));
            }
        }

        updateGraph({
            name: graph.name,
            nodes: [...newNodes, modifiedNode],
            edges: newEdges,
        });

        setEditNodeMode(false);
    }
    
    const removeNode = () => {
        if (selectedNode) {
          const newNodes = graph.nodes.filter((node) => node.id !== selectedNode.id);
          updateGraph((prevGraph) => ({
            name: prevGraph.name,
            nodes: newNodes,
            edges: prevGraph.edges,
          }));
          setEditNodeMode(false);
        }
    };


  return (
    <div>
        <div>
            <Typography id="modal-modal-title" variant="h6" component="h1">
                Node edition
            </Typography>
            <div className='close-button'>
                <Button style={{ 
                backgroundColor: 'red', color: 'white', 'margin-left': '0%', width: '60px', height: '25px'
                }} variant='contained' onClick={(e) => handleForm(e)}>
                X
                </Button>    
            </div>
        </div>

        <label for='firstname'>First Name:</label><br/>
        <input 
        type='text' 
        id='firstname' 
        value={nodeInfos[0]}
        name='firstname' 
        onChange={(e) =>{
            handleFormChanges(e, 0, nodeInfos, updateNodeInfos);
        } }
        /> <br/>

        <label for='lastname'>Last Name:</label><br/>
        <input 
        type='text' 
        id='lastname' 
        value={nodeInfos[1]}
        name='lastname'
        onChange={(e) => {
            handleFormChanges(e, 1, nodeInfos, updateNodeInfos);
        }}
            /><br/>

        <label for='age'>Age:</label><br/>
        <input 
        onChange={(e) => {
            handleFormChanges(e, 2, nodeInfos, updateNodeInfos);
        }}            type='text' 
        id='age' 
        value={nodeInfos[2]}
        name='age' /><br/>

        <label for='gender'>Gender: </label>
        <select 
        onChange={(e) => {
            handleFormChanges(e, 3, nodeInfos, updateNodeInfos);
        }}
        name='genders' 
        id='genders'
        value={nodeInfos[3]}>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
        </select><br/>

        <label for='profesion'>Profession: </label>
        <input 
        onChange={(e) => {
            handleFormChanges(e, 4, nodeInfos, updateNodeInfos);
        }}            type='text'
        id='prefesion'
        value={nodeInfos[4]}
        name='profession' /><br />

        <label for='contact'>E-mail: </label>
        <input
        onChange={(e) => {
            handleFormChanges(e, 5, nodeInfos, updateNodeInfos);
        }}            type='text' 
        id='courriel'
        value={nodeInfos[5]}
        name='courriel' /><br />

        <label for='contact'>Phone number: </label>
        <input
        onChange={(e) => {
            handleFormChanges(e, 6, nodeInfos, updateNodeInfos);
        }}            type='text' 
        id='phone'
        value={nodeInfos[6]}
        name='phone' /><br />

        <label for='contact'>Other information: </label>
        <input
        onChange={(e) => {
            handleFormChanges(e, 7, nodeInfos, updateNodeInfos);
        }}            type='text' 
        id='other'
        value={nodeInfos[7]}
        name='other' /><br />

        <Typography id="modal-modal-title" variant="h6" component="h1">
            Add a new relation
        </Typography>

        <label for='contact'>Exemple: 'ArionSherwind' for Arion Sherwind: </label><br />
        <DynamicInput update={updateLinkInfo}/>

        <Typography id="modal-modal-title" variant="h6" component="h1">
            Remove a relation
        </Typography>
        <DynamicInput update={updateRemoveLinkInfo}/>
        <br />
        <div>
            <Button variant='contained' style={{ 
                backgroundColor: '#4169E1', color: 'white', 'margin-left': '0%'
                }} onClick={removeNode}>
                Delete
            </Button>
        </div>

    </div>)

}
