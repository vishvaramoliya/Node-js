import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Aside from './Aside';

export default function Dashboard() {
  const token = sessionStorage.getItem("token");
 

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [])

  return (
    <div className="flex h-screen overflow-hidden">

      <div>
        <Aside/>
      </div>


      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">

          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        </main>
      </div>
    </div>
  )
}