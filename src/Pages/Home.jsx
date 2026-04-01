import React, { useEffect } from 'react'
import SideBar from '../../Components/sideBar.jsx'
import Dashboard from '../../Components/Dashboard.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuthUserStore } from '../Store/useAuthUserStore.js';
import Users from '../../Components/Users.jsx';
import Departments from '../../Components/Department.jsx';
import DepartmentDetail from '../../Components/DepartmentDetail.jsx';
import Profile from '../../Components/Profile.jsx';

const Home = () => {
  const navigate = useNavigate();
  const { authUser,activeSection } = useAuthUserStore();

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
    <div className="flex h-screen overflow-hidden bg-slate-100">

      <SideBar />

      <main className="flex-1 h-screen overflow-y-auto">
        {renderSection()}
      </main>

    </div>
  );
};

export default Home;