import '../styles/App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GraphInputs from './GraphInputs'
import GraphView from './GraphView';
import SignUp from './SignUp';
import SignIn from './SignIn';
import DisplayApp from './DisplayApp';

function App() {
  /*const [graph, updateGraph] = useState({
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
  })*/

  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/display" element={<DisplayApp />} />
      </Routes>
    </Router>
  );
}

export default App;
