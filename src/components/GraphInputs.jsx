import React from 'react'
import '../styles/GraphInputs.css'
import NodesInput from './inputs/NodesInput'
import EdgesInput from './inputs/EdgesInput'
import DisplayButtons from './buttonComponents/DisplayButtons'

export default function GraphInputs({ graph, updateGraph, changeOption }) {

  return (
  <div className="inputs">
        <NodesInput graph={graph} updateGraph={updateGraph} />

        <EdgesInput graph={graph} updateGraph={updateGraph} />

        <DisplayButtons graph={graph} updateGraph={updateGraph} changeOption={changeOption} />
  </div>
    
  )
}
