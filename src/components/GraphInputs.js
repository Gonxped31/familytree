import React from 'react'
import '../styles/GraphInputs.css'
import VerticesInput from './VerticesInput'
import EdgesInput from './EdgesInput'
import DisplayButtons from './DisplayButtons'

export default function GraphInputs({ graph, updateGraph, changeOption }) {

  return (
  <div className="inputs">
        <VerticesInput graph={graph} updateGraph={updateGraph} />

        <EdgesInput graph={graph} updateGraph={updateGraph} />

        <DisplayButtons graph={graph} updateGraph={updateGraph} changeOption={changeOption} />
  </div>
    
  )
}
