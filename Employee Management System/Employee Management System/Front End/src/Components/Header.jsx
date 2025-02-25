import React, { useState } from 'react';
import { Bell, Search, Menu, LogOut, User, Settings } from 'lucide-react';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  const handleLogout = () => {

    console.log("Logging out...");
    
  };

  const currentAdmin = JSON.parse(sessionStorage.getItem("currentAdmin"))
 
  return (
    <header className="bg-white shadow-sm h-16 px-6 flex items-center justify-between w-[100%] z-50">
      
      <div className="flex items-center">
        
        <h1 className="text-xl font-semibold text-gray-800">Employee Management System</h1>
      </div>
      
      
      <div className="flex items-center space-x-4">
       
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 py-2 px-4 pl-10 text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        
        
        <button className="p-2 rounded-lg hover:bg-gray-100 relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </button>
        
        
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <span className="font-medium">R</span>
            </div>
            <span className="hidden md:block font-medium">{currentAdmin.name}</span>
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
                <User size={16} className="mr-2" />
                <span>My Profile</span>
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
                <Settings size={16} className="mr-2" />
                <span>Settings</span>
              </button>
              <div className="border-t border-gray-200 my-1"></div>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center"
              >
                <LogOut size={16} className="mr-2" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;