import axios from 'axios';
import React, { useState } from 'react';

const SignUp = () => {

  const [email,setemail] = useState(null);
  const [password,setpassword] = useState(null)

  const handleCreateAccount = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/user/signup',{
        email,
        password
      })
      console.log(res.data);
    } catch (error) {
      
    }
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
            Sign Up
          </h2>
          
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
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

            <div className="mb-4 flex justify-between items-center">
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
