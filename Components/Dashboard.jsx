import { useEffect } from "react";
import { useAuthUserStore } from "../src/Store/useAuthUserStore";
import { useDashboardStore } from "../src/Store/useDashboardStore";
import { 
    Users, 
    Building2, 
    DollarSign, 
    TrendingUp, 
    Briefcase, 
    CheckCircle2, 
    Calendar,
    ArrowRight
} from "lucide-react";

const Dashboard = () => {
    const { authUser } = useAuthUserStore();
    const { stats, isLoading, getStats } = useDashboardStore();
    const role = authUser?.role;

    useEffect(() => {
        getStats();
    }, []);

    const StatCard = ({ icon: Icon, label, value, colorClass = "text-teal-600", bgClass = "bg-teal-50" }) => (
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${bgClass} ${colorClass} group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                </div>
                <div className="text-slate-300 group-hover:text-teal-500 transition-colors">
                    <TrendingUp size={20} />
                </div>
            </div>
            <h2 className="text-[10px] sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">{label}</h2>
            <p className="text-xl sm:text-3xl font-bold text-slate-800 mt-1">{value}</p>
        </div>
    );

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-medium animate-pulse">Gathering statistics...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-full">
            
            {/* GREETING */}
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                        Hello, {authUser?.name?.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-slate-500 mt-1">
                        {role === 'admin' ? "Here's what's happening at your company today." : 
                         role === 'manager' ? `Reviewing status for the ${stats?.departmentName || 'managed'} department.` :
                         "Welcome back to your workspace."}
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
                    <Calendar className="text-teal-600" size={20} />
                    <span className="text-sm font-semibold text-slate-700">
                        {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                </div>
            </div>

            {/* ADMIN DASHBOARD */}
            {role === "admin" && (
                <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        <StatCard 
                            icon={Users} 
                            label="Total Users" 
                            value={stats?.totalUsers || 0} 
                            colorClass="text-blue-600" 
                            bgClass="bg-blue-50"
                        />
                        <StatCard 
                            icon={Building2} 
                            label="Departments" 
                            value={stats?.totalDepartments || 0} 
                            colorClass="text-purple-600" 
                            bgClass="bg-purple-50"
                        />
                        <StatCard 
                            icon={CheckCircle2} 
                            label="Total Employees" 
                            value={stats?.totalEmployees || 0} 
                            colorClass="text-teal-600" 
                            bgClass="bg-teal-50"
                        />
                        <StatCard 
                            icon={DollarSign} 
                            label="Monthly Payroll" 
                            value={`$${(stats?.totalPayroll || 0).toLocaleString()}`} 
                            colorClass="text-emerald-600" 
                            bgClass="bg-emerald-50"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <TrendingUp className="text-teal-600" size={20} />
                                User Activity
                            </h3>
                            <div className="flex items-end justify-between gap-4 h-48">
                                <div className="flex-1 bg-slate-100 rounded-t-xl relative group" style={{ height: '60%' }}>
                                    <div className="absolute inset-x-0 bottom-full mb-2 text-center text-xs font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Active: {stats?.activeUsers}</div>
                                    <div className="w-full h-full bg-teal-500 rounded-t-xl transition-all hover:bg-teal-400"></div>
                                </div>
                                <div className="flex-1 bg-slate-100 rounded-t-xl relative group" style={{ height: '20%' }}>
                                    <div className="absolute inset-x-0 bottom-full mb-2 text-center text-xs font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Inactive: {stats?.inactiveUsers}</div>
                                    <div className="w-full h-full bg-slate-300 rounded-t-xl transition-all hover:bg-slate-400"></div>
                                </div>
                            </div>
                            <div className="flex justify-between mt-4 px-2">
                                <span className="text-xs font-bold text-slate-400 uppercase">Active Users</span>
                                <span className="text-xs font-bold text-slate-400 uppercase">Inactive</span>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl shadow-xl text-white flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-bold mb-2">Company Overview</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Your team is growing. You currently manage {stats?.totalEmployees} employees across {stats?.totalDepartments} separate departments.
                                </p>
                            </div>
                            <button className="mt-8 flex items-center gap-2 text-teal-400 font-bold hover:gap-4 transition-all group">
                                Manage Departments <ArrowRight size={20} className="group-hover:scale-110" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MANAGER DASHBOARD */}
            {role === "manager" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard 
                            icon={Building2} 
                            label="Department" 
                            value={stats?.departmentName} 
                            colorClass="text-blue-600" 
                            bgClass="bg-blue-50"
                        />
                        <StatCard 
                            icon={Users} 
                            label="Team members" 
                            value={stats?.employeesCount || 0} 
                            colorClass="text-teal-600" 
                            bgClass="bg-teal-50"
                        />
                        <StatCard 
                            icon={CheckCircle2} 
                            label="Status" 
                            value={stats?.isActive ? "Active" : "Inactive"} 
                            colorClass={stats?.isActive ? "text-green-600" : "text-red-600"} 
                            bgClass={stats?.isActive ? "bg-green-50" : "bg-red-50"}
                        />
                    </div>
                </div>
            )}

            {/* EMPLOYEE DASHBOARD */}
            {role === "employee" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-6">
                            <div className="p-4 rounded-3xl bg-teal-50 text-teal-600 shadow-inner">
                                <Briefcase size={32} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Your Position</h3>
                                <p className="text-2xl font-black text-teal-600 mt-1 uppercase tracking-tight">{authUser?.position || 'Not Assigned'}</p>
                                <p className="text-slate-400 text-xs font-bold uppercase mt-2 tracking-widest">{authUser?.departmentId?.name || 'Waiting for assignment'}</p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-6">
                            <div className="p-4 rounded-3xl bg-blue-50 text-blue-600 shadow-inner">
                                <DollarSign size={32} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Monthly Salary</h3>
                                <p className="text-2xl font-black text-blue-600 mt-1 tracking-tight">${(authUser?.salary || 0).toLocaleString()}</p>
                                <p className="text-slate-400 text-xs font-bold uppercase mt-2 tracking-widest leading-none">Net Monthly Pay</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Dashboard;