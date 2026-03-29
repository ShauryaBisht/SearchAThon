import './App.css'
import { lazy,Suspense } from 'react'
import {Routes,Route} from 'react-router-dom'
import {motion} from  "framer-motion"

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useAuth } from './components/UserContext'
import Hero from './components/Hero'

const Login=lazy(()=>import('./components/Login'))
const Signup=lazy(()=>import('./components/SignUp'))
const ProtectedRoute=lazy(()=>import('./components/ProtectedRoute'))
const Teams=lazy(()=>import('./components/Teams'))
const Profile=lazy(()=>import('./components/Profile'))
const ProfileForm=lazy(()=>import('./components/Profileform'))
const AddTeam=lazy(()=>import('./components/AddTeam'))
const TeamDetails=lazy(()=>import('./components/TeamDetails'))
const EditTeam=lazy(()=>import('./components/EditTeam'))
const MyTeams=lazy(()=>import('./components/MyTeams'))
const NotFound=lazy(()=>import('./components/NotFound'))
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
     <Suspense fallback={<div className="loading-spinner">Loading page...</div>}>
     <Routes>
     <Route path='/' element={<Hero />} />
     <Route path='/login' element={<Login />} />
     <Route path='/signup' element={<Signup />} />
      <Route path="/teams" element={ <ProtectedRoute><Teams /></ProtectedRoute>}></Route>
     <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
<Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/profile/edit/:id" element={ <ProtectedRoute><ProfileForm /></ProtectedRoute>}></Route>
      <Route path='/add-team' element={<ProtectedRoute><AddTeam /></ProtectedRoute>}></Route>
      <Route path='/teams/:id' element={<ProtectedRoute><TeamDetails /></ProtectedRoute>} />
      <Route path='/teams/edit/:teamId' element={<ProtectedRoute><EditTeam></EditTeam></ProtectedRoute>}></Route>
      <Route path='/my-teams' element={<ProtectedRoute><MyTeams/></ProtectedRoute>} ></Route>
      <Route path="*" element={<NotFound />} />
     </Routes>
     </Suspense>
     <Footer />
     </motion.div>
    </>
  )
}

export default App
