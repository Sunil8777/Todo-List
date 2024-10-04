import React from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
        const res = await axios.post('http://localhost:3000/user/logout');
        console.log(res.data);
        if (res.data.logout) {
            navigate('/');
        }
    } catch (error) {
        console.error("Logout error:", error);
    }
};

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
            type="text"
            placeholder="Add new todo"
            className="w-full p-2 bg-gray-100 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="mt-2 w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
            Add Todo
          </button>
        </div>

        {/* Pending Todos count */}
        <p className="text-gray-700 mb-4">
          Pending Todos: <span className="font-bold">3</span>
        </p>

        {/* Todo Filter Buttons */}
        <div className="flex justify-between mb-6">
          <button className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
            All Todos
          </button>
          <button className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600">
            Active Todos
          </button>
          <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
            Done Todos
          </button>
        </div>

        {/* Todo list */}
        <ul className="space-y-3">
          <li className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
            <span className="text-gray-900">Todo 1</span>
            <div className="space-x-2">
              <button className="text-blue-500 hover:text-blue-600">Edit</button>
              <button className="text-red-500 hover:text-red-600">Delete</button>
            </div>
          </li>
          <li className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
            <span className="text-gray-900">Todo 2</span>
            <div className="space-x-2">
              <button className="text-blue-500 hover:text-blue-600">Edit</button>
              <button className="text-red-500 hover:text-red-600">Delete</button>
            </div>
          </li>
          {/* More todos can be added here */}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
