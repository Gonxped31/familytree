import React, { useState, useEffect } from 'react';
import ModifyNode from '../ModifyNode';
import * as Utilitaries from '../Utilitaries';
import PrincipalView from './PrincipalView';
import Button from '@mui/material/Button';
import '../../styles/GraphView.css';

// @ts-ignore
import Graph from 'react-vis-network-graph';

const EditMode = ({ graphToEdit, allGraphs }) => {

  const [graph, updateGraph] = useState({
    name: graphToEdit.name,
    nodes: graphToEdit.nodes,
    edges: graphToEdit.edges,
  });

  const [selectedNode, setSelectedNode] = useState(null);
  const [editNodeMode, setEditNodeMode] = useState(false);
  const [principalView, setPrincipalView] = useState(false);
  const [i, updateI] = useState(0);

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
      setEditNodeMode(true);
    }
  }

  const addNode = () => {
    console.log("Adding node")
    const nodeInformations = [`node${i}`, "Null", "Null", "Null", "Null", "Null", "Null", "Null"];
    const newNode = {
      id: `node${i}`,
      label: `node${i}`,
      data: nodeInformations,
      shape: "circle",
    };

    updateI((prevI) => prevI + 1);

    const prevGraphName = graph.name;
    const prevNodes = graph.nodes
    const prevEdges = graph.edges

    updateGraph({
      name: prevGraphName,
      nodes: [...prevNodes, newNode],
      edges: [...prevEdges]
    });
    
  };

  const saveGraph = () => {
    // Reminder: allGraphs is an array of dictionnary
    const contains = allGraphs.filter((name) => name.id === graph.name);
    if (contains.length === 1){
      Utilitaries.modifyExistingGraph(graph);
      setPrincipalView(true);
    } else {
      console.log("save")
      Utilitaries.saveGraph(graph);
      setPrincipalView(true);
    }
  };

  return (
    <div>
      {editNodeMode && (
        <div className='graph'>
          <div className='modal-background'>
            <div className='modal-content'>
              <ModifyNode graph={graph} selectedNode={selectedNode} updateGraph={updateGraph} setEditNodeMode={setEditNodeMode}  />
            </div>
          </div>
        </div>
      )}
      {principalView ? (
        <PrincipalView />
      ) : (
        <div className='graph'>
          <Graph
            graph={graph}
            options={{
              nodes: {
                color: "#FFD700"
              },
              physics: {
                enabled: true,
                stabilization: { iterations: 1500 },
              },
            }}
            events={{ click: handleGraphClick }}
          />
          <Button variant='contained' onClick={addNode}>
            Add Node
          </Button>
          <Button variant='contained' onClick={saveGraph}>
            Save Graph
          </Button>
          <Button variant='contained' onClick={() => setPrincipalView(true)}>
            Exit
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditMode;
