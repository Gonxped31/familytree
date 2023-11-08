import React from 'react';
import '../styles/App.css'
import GraphInputs from './GraphInputs';
import GraphView from './GraphView';

export default function Home() {
    const [graph, updateGraph] = React.useState({
        nodes: [],
        edges: []
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
