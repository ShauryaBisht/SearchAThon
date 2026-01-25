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
function App() {
  const { loading,user } = useAuth();

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

   
      <Route path={'/profile/${user._id}'} element={ <ProtectedRoute><Profile /></ProtectedRoute>}></Route>
    

     </Routes>
     <Footer />
     </motion.div>
    </>
  )
}

export default App
