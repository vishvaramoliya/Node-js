import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterUser from './Components/Admin/RegisterAdmin';
import Dashboard from './Components/Admin/Dashboard';
import AddManager from './Components/Admin/AddManager';

export default function App() {

  
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<RegisterUser/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/addManager' element={<AddManager/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}
