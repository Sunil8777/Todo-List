import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Todos from '../src/components/Todos';


const TodoList = () => {
  const navigate = useNavigate();
  const [Text,setText] = useState("");
  const [TotalTodo,setTotalTodo] = useState([]);

  useEffect(()=>{
    const DataFetch = async ( )=>{
      try {
        const res2 = await axios.post('http://localhost:5000/user/todolistAdd', { Text }, { withCredentials: true });
        if(res2.data.subTodo) setTotalTodo(res2.data.subTodo)
      } catch (error) {
        console.error("TodoList error:", error);
      }
    }
    DataFetch();
  },[])

  const handleLogOut = async () => {
    try {
        const res = await axios.post('http://localhost:5000/user/logout',{},{ withCredentials: true });
        console.log(res.data);
        if (res.data.logout) {
            navigate('/');
        }
    } catch (error) {
        console.error("Logout error:", error);
    }
};
  const handleAddTodo = async () =>{
    try {
      const res2 = await axios.post('http://localhost:5000/user/todolistAdd', { Text }, { withCredentials: true });
      if(res2.data.subTodo) setTotalTodo(res2.data.subTodo)
      setText("")
    } catch (error) {
      console.error("TodoListAdd error:", error);
    }
  }
  
  const handleDelete = async (TodoId) =>{
      try {

        const res = await axios.post('http://localhost:5000/user/todolistDelete',{TodoId},{ withCredentials: true })
        if(res.data.subTodo) setTotalTodo(res.data.subTodo)

      } catch (error) {
        console.error("TodoListDelete error:", error);
      }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 relative">
      {/* Logout Button - Top Left */}
      <button onClick={handleLogOut} className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
        Logout
      </button>

      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        {/* Header */}
        <div className="flex justify-center items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Todo List</h1>
        </div>

        {/* Input to add a new todo */}
        <div className="mb-4">
          <input
          value={Text}
            onChange={(e)=>setText(e.target.value)}
            type="text"
            placeholder="Add new todo"
            className="w-full p-2 bg-gray-100 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button 
            onClick={handleAddTodo}
            className="mt-2 w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
            Add Todo
          </button>
        </div>

        {/* Pending Todos count */}
        <p className="text-gray-700 mb-4">
          Pending Todos: <span className="font-bold">{TotalTodo.length}</span>
        </p>

        {/* Todo Filter Buttons */}
        <div className="flex justify-between mb-6">
          <button className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
            All Todos
          </button>
          
        </div>
        {
          TotalTodo.map((item, index) => (
            <Todos keys={index} text={item} handleDelete={handleDelete}/> 
          ))
        }
      </div>
    </div>
  );
};

export default TodoList;
