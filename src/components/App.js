import '../styles/App.css';
import { useState } from 'react';
import GraphInputs from './GraphInputs'
import GraphView from './GraphView';

function App() {
  const [graph, updateGraph] = useState({
    nodes: [], 
    edges: []
  })

  const [option, changeOption] = useState({
    height: "900px",
    layout: {
        hierarchical: false
    },
    interaction: {
      hover: true,
      select: true,
    },
  })

  return (
    <div className="App">
      <GraphInputs graph={graph} updateGraph={updateGraph} changeOption={changeOption} />
      <GraphView graph={graph} option={option} updateGraph={updateGraph} />
    </div>
  );
}

export default App;
