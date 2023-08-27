import Login from "./pages/Login"
import Register from "./pages/Register"
import "./styles/styles.scss"
import Home from "./pages/Home"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { auth } from "./firebase"
import { useContext } from "react"
import { AuthContext } from "./Context/AuthContext"

function App() {
  const {currentUser}= useContext(AuthContext)
  
  const ProtectedRoute = ({children}) => {
    if(!currentUser){
     return <Navigate to={'/login'}></Navigate>
    }
    return children
  }

  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<ProtectedRoute><Home></Home></ProtectedRoute>}></Route>
      <Route path="login" element={<Login></Login>}></Route>
      <Route path="register" element={<Register></Register>}></Route>
      
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
