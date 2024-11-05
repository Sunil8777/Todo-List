import SignInPage from "../routes/SignInPage"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from "../routes/TodoList";
import SignUpPage from "../routes/SignUpPage";
import { useState } from "react";
import ProtectPage from "./components/ProtectPage";

function App() {

  const [isAuth,setIsAuth] = useState(false)

  const handleSignIn = () =>{
    setIsAuth(true)
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignInPage onSignIn={handleSignIn}/>} />
          <Route path="/Signup" element={<SignUpPage/>} />
          <Route path="/todolist" 
            element={
              <ProtectPage isAuth={isAuth}>
                <TodoList/>
              </ProtectPage>
            } />
        </Routes>
      </Router>
    </>
  )
}

export default App
