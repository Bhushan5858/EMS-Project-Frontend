import { useAuthUserStore } from "../src/Store/useAuthUserStore";
import {
    LayoutDashboard,
    Users,
    Building2,
    User,
    LogOut,
    X,
} from "lucide-react";

const SideBar = () => {
    const { authUser, activeSection, logout, toggleMobileSidebar } = useAuthUserStore();
    const role = authUser?.role;

    const handleLogout = () => {
        logout();
        window.location.href = "/";
    };

    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard, roles: ["admin", "manager", "employee"] },
        { name: "Users", icon: Users, roles: ["admin"] },
        { name: "Departments", icon: Building2, roles: ["admin", "manager", "employee"] },
        { name: "Profile", icon: User, roles: ["admin", "manager", "employee"] },
    ];

    const MenuItem = ({ item }) => {
        const isActive = activeSection === item.name.toLowerCase();
        const Icon = item.icon;

        return (
            <button
                onClick={() => {
                    useAuthUserStore.setState({
                        activeSection: item.name.toLowerCase(),
                    });
                    toggleMobileSidebar(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
        ${isActive
                        ? "bg-teal-600/20 text-teal-400 border-l-4 border-teal-500 shadow-inner"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
            >
                <Icon className={`size-5 ${isActive ? "text-teal-400" : "group-hover:text-white"}`} />
                <span className="text-sm font-medium">{item.name}</span>
            </button>
        );
    };

    return (
        <div className="h-screen w-64 backdrop-blur-xl bg-gray-900 border-r border-white/10 text-white flex flex-col">

            {/* HEADER */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold tracking-wide">EMS</h1>
                    <p className="text-xs text-slate-400 capitalize mt-1">{role}</p>
                </div>
                <button 
                    onClick={() => toggleMobileSidebar(false)}
                    className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                >
                    <X size={20} />
                </button>
            </div>

            {/* USER INFO */}
            <div className="px-4 py-5 border-b border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    {authUser?.name?.charAt(0)}
                </div>
                <div>
                    <p className="text-sm font-semibold">{authUser?.name}</p>
                    <p className="text-xs text-slate-400">{authUser?.email}</p>
                </div>
            </div>

            {/* MENU */}
            <div className="flex-1 p-4 space-y-2">
                {menuItems
                    .filter((item) => item.roles.includes(role))
                    .map((item, index) => (
                        <MenuItem key={index} item={item} />
                    ))}
            </div>

            {/* FOOTER */}
            <div className="p-4 border-t border-white/10 space-y-3">

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-red-500/90 hover:bg-red-500 text-white py-2 rounded-xl text-sm transition-all active:scale-95"
                >
                    <LogOut className="size-4" />
                    Logout
                </button>

            </div>
        </div>
    );
};

export default SideBar;