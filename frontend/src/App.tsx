import './App.css'
import Navbar from './components/Navbar'
import {motion} from  "framer-motion"
import Footer from './components/Footer'
import Hero from './components/Hero'
import Login from './components/Login'
import {Routes,Route} from 'react-router-dom'
import Signup from './components/SignUp'
function App() {
  

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
     </Routes>
     <Footer />
     </motion.div>
    </>
  )
}

export default App
