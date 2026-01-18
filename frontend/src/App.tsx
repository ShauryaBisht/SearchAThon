import './App.css'
import Navbar from './components/Navbar'
import {motion} from  "framer-motion"
import Footer from './components/Footer'
import Hero from './components/Hero'
function App() {
  

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
     <Navbar />
     <Hero />
     <Footer />
     </motion.div>
    </>
  )
}

export default App
