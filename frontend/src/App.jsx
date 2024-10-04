import SignInPage from "../routes/SignInPage"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from "../routes/TodoList";
import SignUpPage from "../routes/SignUpPage";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignInPage/>} />
          <Route path="/Signup" element={<SignUpPage/>} />
          <Route path="/todolist" element={<TodoList/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
