import { useEffect, useState, useMemo } from "react";
import { useAuthUserStore } from "../src/Store/useAuthUserStore";
import UpdateUserModal from "../Modals/UpdateUserModal.jsx";
import AddUserModal from "../Modals/addUser.Modal.jsx";
import DeleteUserModal from "../Modals/DeleteUser.Modal.jsx";
import { 
    Search, 
    UserPlus, 
    Edit3, 
    Trash2, 
    ShieldCheck, 
    Briefcase, 
    Users as UsersIcon, 
    CheckCircle2, 
    XCircle,
    DollarSign,
    MoreVertical
} from "lucide-react";

const Users = () => {
    const { users, getUsers, deleteUser, authUser } = useAuthUserStore();
    const activeSection = useAuthUserStore((state) => state.activeSection);
    
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (!users || users.length === 0 || activeSection === "users") {
            getUsers();
        }
    }, [getUsers, activeSection]);

    const filteredUsers = useMemo(() => {
        if (!users) return [];
        return users.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    const handleDelete = async () => {
        const success = await deleteUser(selectedUser._id);
        if (success) {
            setIsDeleteModalOpen(false);
        }
    };

    const getInitials = (userName) => {
        return (userName || "U").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    };

    const getAvatarBg = (role) => {
        switch (role) {
            case 'admin': return 'bg-purple-100 text-purple-600 border-purple-200';
            case 'manager': return 'bg-blue-100 text-blue-600 border-blue-200';
            default: return 'bg-teal-100 text-teal-600 border-teal-200';
        }
    };

    return (
        <div className="flex-1 flex flex-col min-h-full items-center p-8 bg-slate-50/50">

            <div className="w-full max-w-6xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* HEADER SECTION */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-2xl bg-teal-600 text-white shadow-lg shadow-teal-200">
                                <UsersIcon size={24} />
                            </div>
                            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">System Users</h1>
                        </div>
                        <p className="text-slate-500 mt-1.5 ml-1 select-none">Manage roles, salary, and system access levels.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* SEARCH BAR */}
                        <div className="relative group w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black group-focus-within:text-teal-600 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                className="w-full text-black bg-white border border-slate-200 pl-11 pr-4 py-3 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all text-sm shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg shadow-slate-200 transition-all active:scale-95 whitespace-nowrap"
                        >
                            <UserPlus size={20} />
                            Add New User
                        </button>
                    </div>
                </div>

                {/* TABLE CONTAINER */}
                <div className="bg-white border border-slate-200 rounded-[2rem] shadow-xl shadow-slate-200/50 overflow-hidden">
                    
                    <div className="overflow-x-auto">
                        {(!filteredUsers || filteredUsers.length === 0) ? (
                            <div className="p-20 text-center flex flex-col items-center">
                                <div className="p-6 rounded-full bg-slate-50 text-slate-300 mb-4">
                                    <Search size={48} />
                                </div>
                                <p className="text-slate-500 font-medium">No results found matching your search criteria.</p>
                                <button onClick={() => setSearchTerm("")} className="text-teal-600 font-bold mt-2 hover:underline">Clear Search</button>
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">User Information</th>
                                        <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">System Role</th>
                                        {authUser?.role === "admin" && (
                                            <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Monthly Pay</th>
                                        )}
                                        <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Employee</th>
                                        <th className="px-8 py-5 text-right text-xs font-bold text-slate-400 uppercase tracking-widest">Operations</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-50">
                                    {filteredUsers.map((user) => (
                                        <tr key={user._id} className="hover:bg-slate-50/80 transition-colors group">
                                            
                                            {/* USER INFO */}
                                            <td className="px-8 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-11 h-11 flex items-center justify-center rounded-2xl border font-bold text-sm shadow-sm transition-transform group-hover:scale-105 ${getAvatarBg(user.role)}`}>
                                                        {getInitials(user.name)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-800 text-sm">{user.name}</div>
                                                        <div className="text-slate-400 text-xs mt-0.5">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* ROLE BADGE */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm border
                                                        ${user.role === "admin" ? "bg-purple-100 text-purple-700 border-purple-200" : 
                                                          user.role === "manager" ? "bg-blue-100 text-blue-700 border-blue-200" : 
                                                          "bg-teal-100 text-teal-700 border-teal-200"}`}>
                                                        {user.role}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* SALARY */}
                                            {authUser?.role === "admin" && (
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1.5 text-slate-700 font-bold text-sm">
                                                        <DollarSign size={14} className="text-slate-400" />
                                                        {user.role !== 'admin' ? (user.salary || 0).toLocaleString() : <span className="text-slate-300 font-normal">N/A</span>}
                                                    </div>
                                                </td>
                                            )}

                                            {/* STATUS */}
                                            <td className="px-6 py-4">
                                                <div className={`flex items-center gap-2 text-xs font-bold border w-fit px-3 py-1.5 rounded-full shadow-sm
                                                    ${user.isActive ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"}`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${user.isActive ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"}`}></div>
                                                    {user.isActive ? "ACTIVE" : "INACTIVE"}
                                                </div>
                                            </td>

                                            {/* IS EMPLOYEE */}
                                            <td className="px-6 py-4">
                                                <div className={`flex items-center justify-center w-8 h-8 rounded-xl ${user.isEmployee ? "bg-teal-50 text-teal-600" : "bg-slate-50 text-slate-300"}`}>
                                                    {user.isEmployee ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                                                </div>
                                            </td>

                                            {/* ACTIONS */}
                                            <td className="px-8 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setIsModalOpen(true);
                                                        }}
                                                        className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all"
                                                        title="Edit User"
                                                    >
                                                        <Edit3 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setIsDeleteModalOpen(true);
                                                        }}
                                                        className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:shadow-lg hover:shadow-rose-50 transition-all"
                                                        title="Delete User"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                                <MoreVertical size={18} className="text-slate-300 group-hover:opacity-0 absolute right-8 transition-opacity" />
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            {/* MODALS */}
            {isModalOpen && (
                <UpdateUserModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    user={selectedUser}
                />
            )}

            {isAddModalOpen && (
                <AddUserModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                />
            )}

            {isDeleteModalOpen && (
                <DeleteUserModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleDelete}
                    user={selectedUser}
                />
            )}
        </div>
    );
};

export default Users;
