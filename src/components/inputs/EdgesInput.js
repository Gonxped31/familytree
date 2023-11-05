import React, { useState } from 'react'

export default function EdgesInput({ graph, updateGraph }) {

    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')

    const addEdge = () => {
        const nodes = graph.nodes
        const edges = graph.edges

        const newEdge = {
            from: from,
            to: to,
            color: "white",
            arrows: {from: {enabled: false}, to: {enabled: false}}
        }

        const newEdges = [...edges, newEdge]

        updateGraph({
            nodes: nodes,
            edges: newEdges
        })
    }


    const removeEdge = () => {
        const actualNodes = graph.nodes;
        const actualEdges = graph.edges;
    
        const newEdges = actualEdges.filter((edge) => !(edge.from === from && edge.to === to) && !(edge.to === from && edge.from === to));
    
        updateGraph({
            nodes: actualNodes,
            edges: newEdges
        });
    }


  return (
    <div className='edgesInput'>
        <h2 className='titles'>Relation</h2>
        <text>From (First Name)</text>
        <textarea className='textarea' id='startingVertex' name='start' onChange={(e) => setFrom(e.target.value)} />
        <text>To (First Name)</text>
        <textarea className='textarea' id='endingVertex' name='end' onChange={(e) => setTo(e.target.value)} />
        <button onClick={addEdge}>ADD EDGE</button>
        <button onClick={removeEdge}>REMOVE EDGE</button>
    </div>
  )
}
