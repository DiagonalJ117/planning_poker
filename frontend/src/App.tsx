import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'
import Room from './screens/Room'
import Home from './screens/Home'
import Settings from './screens/Settings'
import Layout from './components/Layout'
import CreateRoom from './screens/CreateRoom'
import JoinRoom from './screens/JoinRoom'
import RoomList from './screens/RoomList'

function App() {
 

  return (
    <Router>
      <Layout> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:id" element={<Room />} />
          <Route path="/create-room" element={<CreateRoom />} />
          <Route path="/join-room" element={<JoinRoom />} />
          <Route path="/room-list" element={<RoomList />} />
          <Route path="/about" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
