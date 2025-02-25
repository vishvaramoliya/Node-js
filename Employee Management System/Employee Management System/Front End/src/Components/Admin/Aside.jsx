import React, { useState, useEffect } from 'react';
import { Home, Users, UserPlus, UserCheck, Settings, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Aside() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const [active, setActive] = useState('dashboard');
  
  useEffect(() => {
    if (currentPath === '/dashboard') {
      setActive('dashboard');
    } else if (currentPath === '/addManager') {
      setActive('add-manager');
    } else if (currentPath === '/viewAdmin') {
      setActive('view-admin');
    } else if (currentPath === '/addEmployee') {
      setActive('add-employee');
    } else if (currentPath === '/settings') {
      setActive('settings');
    }
  }, [currentPath]);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const currentAdmin = JSON.parse(sessionStorage.getItem("currentAdmin"))

  return (
    <div>
      <div className={`bg-gray-800 h-[100vh] text-white flex flex-col transition-all duration-300 ${expanded ? 'w-64' : 'w-20'}`}>
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {expanded && (
            <h2 className="text-xl font-bold">EMS</h2>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-2">
            <li>
              <Link to="/dashboard">
                <button
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    active === 'dashboard'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className={expanded ? "mr-3" : "mx-auto"}><Home size={20} /></span>
                  {expanded && <span>Dashboard</span>}
                </button>
              </Link>
            </li>

            <li>
              <Link to="/addManager">
                <button
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    active === 'add-manager'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className={expanded ? "mr-3" : "mx-auto"}><UserPlus size={20} /></span>
                  {expanded && <span>Add Manager</span>}
                </button>
              </Link>
            </li>

            <li>
              <Link to="/viewAdmin">
                <button
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    active === 'view-admin'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className={expanded ? "mr-3" : "mx-auto"}><UserCheck size={20} /></span>
                  {expanded && <span>View Admin</span>}
                </button>
              </Link>
            </li>

            <li>
              <Link to="/addEmployee">
                <button
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    active === 'add-employee'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className={expanded ? "mr-3" : "mx-auto"}><Users size={20} /></span>
                  {expanded && <span>Add Employee</span>}
                </button>
              </Link>
            </li>

            <li>
              <Link to="/settings">
                <button
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    active === 'settings'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className={expanded ? "mr-3" : "mx-auto"}><Settings size={20} /></span>
                  {expanded && <span>Settings</span>}
                </button>
              </Link>
            </li>
          </ul>
        </div>

        {expanded && (
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-2">
                <span className="text-sm font-bold">A</span>
              </div>
              <div>
                <p className="text-sm font-medium">Admin Profile</p>
                <p className="text-xs text-gray-400">{currentAdmin.email}</p>
              </div>
            </div>
          </div>
        )}
        {!expanded && (
          <div className="p-4 border-t border-gray-700 flex justify-center">
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
              <span className="text-sm font-bold">R</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}