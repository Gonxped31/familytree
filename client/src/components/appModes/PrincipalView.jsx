// NetworkGraph.js
import * as React from 'react';
import * as d3 from 'd3';
import '../../styles/PrincipalView.css';
import EditMode from './EditMode';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import * as Utilitaries from '../Utilitaries';

const PrincipalView = () => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [graph, setGraph] = React.useState([]);
  
  const [nodes, updateNodes] = React.useState([]);
  const [rows, setRows] = React.useState();
  /*[
    {
      name : "Graph_1", 
      nodes : [{id:"A", label:"A", data:["A","A","52","A","A","A","A"], shape:"circle"},
      {id:"B", label:"B", data:["A","A","52","A","A","A","A"], shape:"circle"}
      ],
      edges : []
    },
    {
      name : "Graph_2",
      nodes : [{id:"ArianeEagle", label:"Ariane E.", data:["Ariane","Eagle","52","A","A","A","A"], shape:"circle"},
      {id:"BobEagle", label:"Bob E.", data:["Bob","Eagle","52","A","A","A","A"], shape:"circle"},
      {id:"CamiliaBenson", label:"Camilia B.", data:["Camilia","Benson","52","A","A","A","A"], shape:"circle"},
      {id:"IsmaelGbian", label:"Ismael G.", data:["Ismael","Gbian","52","A","A","A","A"], shape:"circle"}],

      edges : []
    }
  ]*/
  const [editMode, setEditMode] = React.useState(false);
  const [newGraphMode, setNewGraphMode] = React.useState(false);
  const [newGraphName, setNewGraphName] = React.useState("");

  React.useEffect(() => {

    // Get the graphs from the database
    Utilitaries.fetchGraphs().then((data) => {
      const parsedData = JSON.parse(data);
      setRows(parsedData);
      const graphsName = parsedData.map((row) => row.name);
      const graphs = graphsName.map((name) => ({ id: name }));
      console.log(graphs)
      updateNodes(graphs);
    })
    .catch((error) => {
      console.log("Error deleting the graph: ", error);
    })

    if (nodes.length >= 80) {
      alert("Your graph inventory is full");
    }
    // Clear the svg container
    d3.select('#network-graph').selectAll('*').remove();

    // Create force simulation
    const simulation = d3.forceSimulation(nodes);
    
    // Set nodes positions
    var dx = 350;
    var pos = 0;
    nodes.forEach((node, index) => {
      if (index % 4 === 0 && index !== 0){
        dx = dx + 200;
        pos = 0;
        //console.log('switch')
      }

      //console.log(pos);
      // Set x position to create a vertical line with a spacing of 50 units
      node.x = 0 + dx;
      node.y = pos * 200 + 100;

      // Fix nodes in their initial positions
      node.fx = 0 + dx;
      node.fy = pos * 200 + 100;

      pos++;
      //console.log(`Node: ${node.id}, x : ${node.x}, y : ${node.y}`)
    });

    // Create nodes
    const svg = d3.select('#network-graph').append('svg')
    .attr('width', '100%')
    .attr('height', '100%');

    //  Add a 'new graph' button
    svg.data(nodes)
      .append('text')
      .attr('x', 950)
      .attr('y', 35)
      .attr('cursor', 'pointer')
      .text('\u002B')
      .style('font-size', '80px')
      .style('text-anchor', 'middle')
      .style('dominant-baseline', 'middle')
      .on('click', () => addNode());

    const nodeContainer = svg.selectAll('.node')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', (d, i) => `translate(${50 + i * 120}, 100)`);

    // Rectangular nodes
    nodeContainer.append('rect')
      .attr('width', 150)
      .attr('height', 80)
      .attr('fill', 'lightblue')
      .attr('stroke', 'black')
      .on('click', (_, d) => {
        if (rows.length > 0) {
          const graphToDisplay = rows.filter((elem) => elem.name === d.id);
          setGraph(graphToDisplay[0]);
          setEditMode(true);
        }
      });
      
    // Node names
    nodeContainer.append('text')
    .attr('x', 40)
    .attr('y', 35)
    .attr('class', 'node-label')
    .text(d => d.id)
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'middle');

    // Edit button (pen icon)
    nodeContainer.append('text')
      .attr('x', 165)
      .attr('y', 10)
      .attr('cursor', 'pointer')
      .text('\u270E') // Unicode character for a pen icon
      .style('font-size', '18px')
      .style('text-anchor', 'middle')
      .style('dominant-baseline', 'middle')
      .on('click', () => editNodeName());

    // Delete button (minus icon)
    nodeContainer.append('text')
      .attr('x', 140)
      .attr('y', 10)
      .attr('cursor', 'pointer')
      .text('\u2212') // Unicode character for a minus icon
      .style('font-size', '25px')
      .style('text-anchor', 'middle')
      .style('dominant-baseline', 'middle')
      .on('click', (_, d) => deleteNode(d.id));

    // Update positions on each tick
    simulation.on('tick', () => {
        nodeContainer.attr('transform', d => `translate(${d.x},${d.y})`);
    });


    const editNodeName = () => {
      //TODO
    };
    
    const deleteNode = (nodeId) => {
      Utilitaries.deleteGraph(nodeId)
        .then((res) => alert(JSON.parse(res).message))
        .catch((error) => {
          console.log("Error deleting the graph: ", error);
        })

      const newNodes = nodes.filter((node) => node.id !== nodeId);
      updateNodes(newNodes);
    }

    const addNode = () => {
      setNewGraphMode(true);
    }

  }, []);

  const handleModalClose = () => {
    setNewGraphMode(false);
  };

  const handleContinueClick = () => {
    setGraph({
      name: newGraphName,
      nodes: [],
      edges: []
    });
    setEditMode(true);
  };

  if (editMode) {
    return <EditMode graphToEdit={graph}/>
  } else if (newGraphMode) {
    return (<div>
      <Modal
        open={newGraphMode}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h3">
            Graph Name
          </Typography>
          <input
            type='text' 
            id='firstname' 
            name='firstname' 
            onChange={(e) => setNewGraphName(e.target.value)}/>
          <Button onClick={handleContinueClick}>Continue</Button>
        </Box>
      </Modal>
    </div>)
  } else {
    return <div id="network-graph" className='graph-container'></div>;
  }
};

export default PrincipalView;