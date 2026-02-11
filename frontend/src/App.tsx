import './App.css'
import Navbar from './components/Navbar'
import {motion} from  "framer-motion"
import Footer from './components/Footer'
import Hero from './components/Hero'
import Login from './components/Login'
import {Routes,Route} from 'react-router-dom'
import Signup from './components/SignUp'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './components/UserContext'
import Profile from './components/Profile'
import ProfileForm from './components/Profileform'
import Teams from './components/Teams'
import TeamDetails from './components/TeamDetails'
import AddTeam from './components/AddTeam'
function App() {
  const { loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
     <Navbar />
     <Routes>
     <Route path='/' element={<Hero />} />
     <Route path='/login' element={<Login />} />
     <Route path='/signup' element={<Signup />} />

      <Route path="/teams" element={ <ProtectedRoute><Teams /></ProtectedRoute>}></Route>
      <Route path="/profile/:id" element={ <ProtectedRoute><Profile /></ProtectedRoute>}></Route>
      <Route path="/profile/edit/:id" element={ <ProtectedRoute><ProfileForm /></ProtectedRoute>}></Route>
      <Route path='/add-team' element={<ProtectedRoute><AddTeam /></ProtectedRoute>}></Route>
      <Route path='/teams/:id' element={<ProtectedRoute><TeamDetails /></ProtectedRoute>} />

     </Routes>
     <Footer />
     </motion.div>
    </>
  )
}

export default App
