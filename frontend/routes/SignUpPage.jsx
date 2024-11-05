import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Validation from '../src/components/validation';

const SignUp = () => {

  const Navigate = useNavigate();
  const [email,setemail] = useState(null);
  const [password,setpassword] = useState(null)
  const [data,setdata] = useState(null)

  const handleCreateAccount = async (e)=>{
    e.preventDefault();
    
    try {
      const res = await axios.post('http://localhost:5000/user/signup',{
        email,
        password
      })
      setdata(res.data);
      if(!res.data.invalid){
        const res2 = await axios.post('http://localhost:5000/user/todolist',{email})
      }
      
    } catch (error) {
        if (error.response) {
          setdata(error.response.data) 
        } else {
          console.error("Request failed:", error.message);
        }
    }
  }

  return (
    <div>
      <div>
        <button onClick={()=> Navigate('/') } className="absolute top-6 right-6 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
          Sign in
        </button>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
            Sign Up
          </h2>
          
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="email"
                placeholder="Enter your Username"
                onChange={(e)=>setemail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                onChange={(e)=>setpassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <Validation data={data}/>

            <div className="mb-4 flex justify-between items-center ">
              <button onClick={handleCreateAccount} className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none">
                Create account
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
