
import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Room from './screens/Room'
import Home from './screens/Home'
import Settings from './screens/Settings'
import Layout from './components/Layout'
import CreateRoom from './screens/CreateRoom'
import JoinRoom from './screens/JoinRoom'
import RoomList from './screens/RoomList'
import { ThemeProvider } from './components/ThemeProvider'

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme='dark' storageKey='ui-theme'>
        <Layout> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/:id" element={<Room />} />
            <Route path="/create-room" element={<CreateRoom />} />
            <Route path="/join-room" element={<JoinRoom />} />
            <Route path="/room-list" element={<RoomList />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  )
}

export default App
