import { Routes, Route, Navigate } from "react-router-dom"
import { Login } from "./components/AuthComponents/Login"
import { Home } from "./pages/Home"
import { MainPage } from "./pages/MainPage"
import { Signup } from "./components/AuthComponents/Signup"



function App() {
  let authUser=null

  return (
    <>
      <div className="flex flex-col items-center justify-start">


        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/home" element={<Home/> }/>
          <Route path="/login" element={!authUser?<Login /> : <Navigate to={ "/home" } />} />
          <Route path="/signup" element={!authUser ? <Signup/> : <Navigate to="/" />}  />
          
        </Routes>
      </div>
    </>
  )
}

export default App
