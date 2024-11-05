import React, { useState } from 'react';
import { Link, useAsyncError, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Validation from '../src/components/validation';

const SignIn = (props) => {

  const [email,setEmail]= useState(null);
  const [password,setPassword]= useState(null);
  const [data,setdata] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) =>{
    e.preventDefault();
    
    try {
      const res = await axios.post('http://localhost:5000/user/signin',{
        email: email,
        password: password
      },{ withCredentials: true })
      console.log(document.cookie)
      if(res.data.loginAccess){
        navigate('/todolist')
        props.onSignIn()
      }
      setdata(res.data)
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
            Sign In
          </h2>
          
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
              </label>
              <input
                type="email"
                placeholder="Enter your Username"
                onChange={(e)=>setEmail(e.target.value)}
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
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <Validation data={data}/>

            <div className="mb-4 flex justify-between items-center">
              <button onClick={handleSignIn} className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none">
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account? <Link to='/Signup' className="text-indigo-500 hover:underline cursor-pointer">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
