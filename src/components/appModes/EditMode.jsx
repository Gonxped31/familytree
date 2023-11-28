import React from 'react';
import GraphInputs from '../GraphInputs';
import GraphView from '../GraphView';
import '../../styles/App.css'

export default function EditMode({ graphToEdit }) {
    const [graph, updateGraph] = React.useState({
        nodes: graphToEdit.nodes,
        edges: graphToEdit.edges
    });

    const [option, changeOption] = React.useState({
        height: "900px",
        layout: {
            hierarchical: false
        },
        interaction: {
            hover: true,
            select: true,
        },
    });

  return (
    <div className='App'>
      <GraphInputs graph={graph} updateGraph={updateGraph} changeOption={changeOption} />
      <GraphView graph={graph} option={option} updateGraph={updateGraph} />
    </div>
  )
}
