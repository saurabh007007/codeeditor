import { Routes, Route, Navigate } from "react-router-dom"
import { Login } from "./components/AuthComponents/Login"
import { Home } from "./pages/Home"
import { MainPage } from "./pages/MainPage"
import { Signup } from "./components/AuthComponents/Signup"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import {Navbar} from "./components/Shared/Navbar"
import { AdminRoute } from "./components/AuthComponents/AdminRoute"
import { AddProblem } from "./pages/AddProblem"
import { ProblemPage } from "./pages/ProblemPage"




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
      <div >
        <Navbar />

        <Routes>
          
            <Route path="/" element={<MainPage/>} />
          

          <Route path="/home" element={<Home/> }/>
          <Route path="/login" element={!authUser?<Login /> : <Navigate to={ "/home" } />} />
          <Route path="/signup" element={!authUser ? <Signup/> : <Navigate to="/home" />}  />

          {/* //Admin routes yha dunga */}
          <Route element={<AdminRoute/>}>

          <Route path="/problem/:id" element={authUser ? <ProblemPage /> : <Navigate to="/login" />} />

          <Route path="/add-problem" element={authUser?<AddProblem />:<Navigate to="/home" />} />

          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
