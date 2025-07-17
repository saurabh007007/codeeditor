import { Routes, Route, Navigate } from "react-router-dom"
import { Login } from "./components/AuthComponents/Login"
import { Home } from "./pages/Home"
import { MainPage } from "./pages/MainPage"
import { Signup } from "./components/AuthComponents/Signup"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Loader } from "lucide-react"




function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-start">


        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/home" element={<Home/> }/>
          <Route path="/login" element={!authUser?<Login /> : <Navigate to={ "/" } />} />
          <Route path="/signup" element={!authUser ? <Signup/> : <Navigate to="/" />}  />
          
        </Routes>
      </div>
    </>
  )
}

export default App
