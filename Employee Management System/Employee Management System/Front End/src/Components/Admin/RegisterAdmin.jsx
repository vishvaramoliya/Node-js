import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

export default function RegisterUser() {

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {

    if (!name || !contact || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    const adminData = { name, contact, email, password }

    const response = await axios.post("http://localhost:1008/register", adminData)

    if (response.data.msg === "Admin already exist please login") {
      toast.error("Admin already registered");
    } else if (response.data.msg === "Admin Registered") {
      toast.success("Admin register successfully");
      setTimeout(() => {
        setIsRightPanelActive(false)
      }, 3000)
    }
  }

  const handleSignIn = async () => {

    if (!email || !password) {
      toast.error("Please fill all fields")
    }

    const adminData = { email, password }
    const response = await axios.post("http://localhost:1008/login", adminData)
  
    console.log(response);
    
    if (response.data.msg === "Admin logged in") {
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("currentAdmin", JSON.stringify(response.data.admin));
      toast.success("Admin Logged In")
      setTimeout(() => {
        navigate("/dashboard")
      }, 1000)
    } else {
      toast.error("Admin email or password wrong")
    }


  }

  const [isRightPanelActive, setIsRightPanelActive] = useState(false);


  return (


    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4">
      <ToastContainer />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl min-h-[480px] overflow-hidden">


        <div className={`absolute top-0 h-full transition-all duration-600 ease-in-out w-1/2 
        ${isRightPanelActive ? 'translate-x-full opacity-100 z-50' : 'opacity-0 z-10'}`}>
          <form className="bg-white flex flex-col items-center justify-center px-10 h-full">
            <h1 className="text-3xl font-bold mb-4">Create Account</h1>

            <span className="text-sm mb-4">or use your email for registration</span>
            <div className="w-[100%]">
              <div className="relative mb-4">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-100 border-none px-10 py-2 w-full rounded focus:ring focus:ring-red-300"
                />
              </div>

              <div className="relative mb-4">
                <FaPhoneAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Contact"
                  onChange={(e) => setContact(e.target.value)}
                  className="bg-gray-100 border-none px-10 py-2 w-full rounded focus:ring focus:ring-red-300"
                />
              </div>

              <div className="relative mb-4">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-100 border-none px-10 py-2 w-full rounded focus:ring focus:ring-red-300"
                />
              </div>

              <div className="relative mb-4">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-100 border-none px-10 py-2 w-full rounded focus:ring focus:ring-red-300"
                />
              </div>
            </div>

            <button type='button' onClick={handleSignUp} className="btn text-white rounded-full px-12 py-3 font-semibold uppercase tracking-wide transform transition hover:scale-105">
              Sign Up
            </button>
          </form>
        </div>



        {/* Sign In Container */}
        <div className={`absolute top-0 h-full transition-all duration-600 ease-in-out w-1/2 z-20
        ${isRightPanelActive ? 'translate-x-full' : ''}`}>
          <form className="bg-white flex flex-col items-center justify-center px-10 h-full">
            <h1 className="text-3xl font-bold mb-4">Sign in</h1>
            <div className="flex gap-4 my-4">
              <a href="#" className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center">f</a>
              <a href="#" className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center">g</a>
              <a href="#" className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center">in</a>
            </div>
            <span className="text-sm mb-4">or use your account</span>

            <div className='w-[100%]'>
              <div className="relative mb-4">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-100 border-none px-10 py-2 w-full rounded focus:ring focus:ring-red-300"
                />
              </div>

              <div className="relative mb-4">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-100 border-none px-10 py-2 w-full rounded focus:ring focus:ring-red-300"
                />
              </div>
            </div>

            <a href="#" className="text-sm text-gray-600 mb-4">Forgot your password?</a>
            <button type='button' onClick={handleSignIn} className="btn text-white rounded-full px-12 py-3 font-semibold uppercase tracking-wide hover:bg-red-600 transform transition hover:scale-105">
              Sign In
            </button>
          </form>
        </div>


        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-100 
        ${isRightPanelActive ? '-translate-x-full' : ''}`}
        >
          <div
            className={` text-white relative -left-full h-full w-[200%] transform transition-transform duration-600 ease-in-out 
          ${isRightPanelActive ? 'translate-x-1/2' : 'translate-x-0'}`} style={{
              background: 'linear-gradient(to right, #1a472a, #0d2818)'
            }}
          >
            <div
              className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transform transition-transform duration-600 ease-in-out
            ${isRightPanelActive ? 'translate-x-0' : '-translate-x-[20%]'}`}
            >
              <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
              <p className="text-sm mb-4">To keep connected with us please login with your personal info</p>
              <button
                onClick={() => setIsRightPanelActive(false)}
                className="border border-white bg-transparent text-white rounded-full px-12 py-3 font-semibold uppercase tracking-wide hover:bg-white/10 transform transition hover:scale-105"
              >
                Sign In
              </button>
            </div>

            <div
              className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 right-0 h-full w-1/2 transform transition-transform duration-600 ease-in-out
            ${isRightPanelActive ? 'translate-x-[20%]' : 'translate-x-0'}`}
            >
              <h1 className="text-3xl font-bold mb-4">Hello, Friend!</h1>
              <p className="text-sm mb-4">Enter your personal details and start journey with us</p>
              <button
                onClick={() => setIsRightPanelActive(true)}
                className="border border-white bg-transparent text-white rounded-full px-12 py-3 font-semibold uppercase tracking-wide hover:bg-white/10 transform transition hover:scale-105"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

      </div>


    </div>
  )
}
