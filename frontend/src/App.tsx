import './App.css'
import Navbar from './components/Navbar'
import {motion} from  "framer-motion"
function App() {
  

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
     <Navbar />
     </motion.div>
    </>
  )
}

export default App
