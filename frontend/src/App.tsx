import { Routes, Route, Navigate } from "react-router-dom"
import { Login } from "./components/AuthComponents/Login"
import { Home } from "./pages/Home"
import { MainPage } from "./pages/MainPage"



function App() {
  let authUser=null

  return (
    <>
      <div className="flex flex-col items-center justify-start">


        <Routes>
          <Route path="/" element={<Home/> }/>
          <Route path="/home" element={<MainPage/>}/>
          <Route path="/login" element={!authUser?<Login /> : <Navigate to={ "/home" } />} />
          
        </Routes>
      </div>
    </>
  )
}

export default App
