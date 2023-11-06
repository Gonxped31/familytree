import React from 'react';
import '../styles/App.css'
import GraphInputs from './GraphInputs';
import GraphView from './GraphView';

export default function DisplayApp({ graph, updateGraph, option, changeOption }) {
  return (
    <div className='App'>
      <GraphInputs graph={graph} updateGraph={updateGraph} changeOption={changeOption} />
      <GraphView graph={graph} option={option} updateGraph={updateGraph} />
    </div>
  )
}
