import * as React from 'react';
import '../styles/App.css';

export default function DynamicInput({ update }) {
    const [inputList, setInputList] = React.useState([]);

    const addInput = () => {
      // Create a new input element and add it to the inputList state
      setInputList([...inputList, <input key={inputList.length} onChange={
        (e) => update(prevInfo => 
            [...prevInfo, e.target.value]
        )} 
        type="text" />]);
    };
  
    return (
      <div>
        <div>
          <div className="inputs">{inputList}</div>
        </div>
        <button onClick={addInput}>Add Input</button>
      </div>
    );
}

