import {Routes,Route, Navigate} from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { HomePage } from './pages/HomePage'
function App() {
let authUser=null;

  return (
    <>
    
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/login' 
      element={!authUser ? <LoginPage/> : <Navigate to={"/home"} />} 
      />
      <Route path='/signup' 
      element={!authUser?<SignupPage/>:<Navigate to={"/home"}/>} 
      /> 
      <Route path="/home" element={!authUser?<HomePage/>:<Navigate to={"/"}/>
    }/>
    </Routes>
    </>
  )
}

export default App
