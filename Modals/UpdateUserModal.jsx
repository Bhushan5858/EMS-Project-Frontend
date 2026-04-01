import { useState, useEffect } from "react";
import { useAuthUserStore } from "../src/Store/useAuthUserStore";
import { 
    UserCheck, 
    X, 
    User, 
    Mail, 
    ShieldCheck, 
    Edit3,
    ArrowRight,
    Lock,
    Banknote,
    Activity
} from "lucide-react";

/** Professional corporate-grade user update modal */
const UpdateUserModal = ({ isOpen, onClose, user }) => {
    const { updateUser, getUsers } = useAuthUserStore();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "employee",
        password: "",
        isActive: true,
        salary: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                role: user.role || "employee",
                password: "",
                isActive: user.isActive !== undefined ? user.isActive : true,
                salary: user.salary || "",
            });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await updateUser(user._id, formData);
        if (success) {
            await getUsers();
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-teal-600 text-white shadow-md shadow-teal-900/10">
                            <Edit3 size={18} />
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-slate-800 tracking-tight">Modify Identity</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Update Authorization & Details</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto max-h-[75vh]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Identity</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Enter full name"
                                    className="w-full text-black bg-slate-50 border border-slate-200 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all text-sm font-bold"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Terminal</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="email"
                                    placeholder="user@ems.corp"
                                    className="w-full text-black bg-slate-50 border border-slate-200 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all text-sm font-bold"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        {/* Role */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Authority Level</label>
                            <div className="relative">
                                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <select
                                    className="w-full text-black bg-slate-50 border border-slate-200 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all text-sm font-bold appearance-none cursor-pointer"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                >
                                    <option value="employee">Standard Employee</option>
                                    <option value="manager">Lead Manager</option>
                                    <option value="admin">System Administrator</option>
                                </select>
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password (Optional)</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="password"
                                    placeholder="Leave empty to keep unchanged"
                                    className="w-full text-black bg-slate-50 border border-slate-200 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all text-sm font-bold"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Salary */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Salary</label>
                            <div className="relative">
                                <Banknote className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="number"
                                    placeholder="Base Salary"
                                    className="w-full text-black bg-slate-50 border border-slate-200 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all text-sm font-bold"
                                    value={formData.salary}
                                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Status (isActive) */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Account Status</label>
                            <div className="relative">
                                <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <select
                                    className="w-full text-black bg-slate-50 border border-slate-200 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all text-sm font-bold appearance-none cursor-pointer"
                                    value={formData.isActive ? "true" : "false"}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === "true" })}
                                >
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-3">
                        <button
                            type="submit"
                            className="flex-1 py-4 rounded-xl bg-slate-900 text-teal-400 font-black text-xs tracking-widest uppercase hover:bg-slate-800 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 group"
                        >
                            <UserCheck size={16} />
                            Save Modifications
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 rounded-xl bg-red-600 text-black font-bold text-xs tracking-widest uppercase hover:bg-slate-100 transition-all active:scale-95"
                        >
                            Dismiss Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateUserModal;