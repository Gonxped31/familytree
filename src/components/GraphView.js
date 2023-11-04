import React, { useState } from 'react'
import '../styles/GraphView.css'
import ModifyNode from './ModifyNode';
import '../styles/ModifyNode.css'

// @ts-ignore
import Graph from 'react-vis-network-graph'

export default function GraphView({ graph, option, updateGraph }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleGraphClick = (event) => {
    const { nodes: clickedNodes } = event;
    if (clickedNodes.length > 0) {
      const nodeId = clickedNodes[0];
      const retreiveNode = graph.nodes.filter((node) => node.id === nodeId);
      const nodeInfos = retreiveNode[0].data;
      const node = {
        id: nodeId,
        label: nodeId,
        title: `NODE INFORMATIONS: <br />
                FirstName: ${nodeInfos[0]} <br /> 
                LastName: ${nodeInfos[1]} <br />
                Age: ${nodeInfos[2]} <br />
                Gender: ${nodeInfos[3]} <br />
                Profession: ${nodeInfos[4]} <br />
                Contact: ${nodeInfos[5]} <br />`,
        data: nodeInfos,
        shape: "circle",        
      }

      setSelectedNode(node);

      setEditMode(true);
    }
}

  return (
    <div className='graph'>
      <Graph
        graph= {graph}
        options= {option}
        events= {{ click: handleGraphClick }}
      />

      {editMode &&
      <div className='modal-background'>
        <div className='modal-content'>
          <ModifyNode graph={graph}  selectedNode={selectedNode} updateGraph={updateGraph} editMode={editMode}/>
          <button className="close-button" onClick={() => setEditMode(false)}>X</button>
        </div>
      </div>}
    </div>
  )
}
