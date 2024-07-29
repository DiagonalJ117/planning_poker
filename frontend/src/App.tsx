import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '@/pages/Home'
import Room from './pages/Room'
import Layout from './components/Layout'
import RoomList from './pages/RoomList'

function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/room/:id' Component={Room} />
          <Route path='/roomlist' Component={RoomList} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
