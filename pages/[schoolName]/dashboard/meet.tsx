import React from 'react'

const Meet = () => {
  const classeID = 'Classe-07894512'
  return (
    <iframe
      src={`https://meet.jit.si/${classeID}`}
      style={{ height: 720, width: '100%' }}
    />
  )
}

export default Meet
