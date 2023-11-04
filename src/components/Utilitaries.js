
export default function handleFormChanges(e, index, nodeInformations ,setNodeInformations) {
    // new value
    const newValue = e.target.value
  
    // copy the informations
    const newNodeInformations = [...nodeInformations]
  
        // replace the old value
    newNodeInformations.splice(index, 1, newValue)
  
    // update the informations
    setNodeInformations(newNodeInformations)
}
