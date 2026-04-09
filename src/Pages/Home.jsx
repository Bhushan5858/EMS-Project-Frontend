import React, { useEffect } from 'react'
import SideBar from '../../Components/sideBar.jsx'
import Dashboard from '../../Components/Dashboard.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuthUserStore } from '../Store/useAuthUserStore.js';
import Users from '../../Components/Users.jsx';
import Departments from '../../Components/Department.jsx';
import DepartmentDetail from '../../Components/DepartmentDetail.jsx';
import Profile from '../../Components/Profile.jsx';
import { Menu, X } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { authUser, activeSection, isMobileSidebarOpen, toggleMobileSidebar } = useAuthUserStore();

  useEffect(() => {
    if (!authUser) navigate('/');
  }, [authUser, navigate]);


  const renderSection =()=>{
    switch(activeSection){
      case "dashboard":
        return <Dashboard/>
      case "users":
        return <Users/>
      case "departments":
        return <Departments/>
      case "departmentdetail":
        return <DepartmentDetail/>
      case "profile":
        return <Profile/>
      default:
        return <Dashboard/>
    }
  };


  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 relative">
      
      {/* MOBILE HEADER */}
      <header className="lg:hidden absolute top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => toggleMobileSidebar(true)}
            className="p-2 -ml-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <Menu size={24} />
          </button>
          <span className="font-bold text-slate-800 tracking-tight">EMS</span>
        </div>
        <div className="text-xs font-bold text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full">
          {activeSection}
        </div>
      </header>

      {/* SIDEBAR OVERLAY (MOBILE) */}
      {isMobileSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 transition-opacity"
          onClick={() => toggleMobileSidebar(false)}
        />
      )}

      {/* SIDEBAR */}
      <div className={`
        fixed inset-y-0 left-0 z-40 lg:relative lg:z-auto
        transition-transform duration-300 transform
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <SideBar />
      </div>

      <main className="flex-1 h-screen overflow-y-auto pt-16 lg:pt-0">
        {renderSection()}
      </main>

    </div>
  );
};

export default Home;