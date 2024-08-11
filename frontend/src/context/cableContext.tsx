import React from 'react'
import ActionCable from 'actioncable'


const CableContext = React.createContext<ActionCable.Cable | null>(null)

const CableProvider = ({ children }: { children: React.ReactNode }) => {
  const cable = ActionCable.createConsumer('ws://localhost:3000/cable')
  return (
    <CableContext.Provider value={cable}>
      {children}
    </CableContext.Provider>
  )
}


export { CableContext, CableProvider };