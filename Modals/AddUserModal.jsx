import { useState } from "react";
import { useAuthUserStore } from "../src/Store/useAuthUserStore";
import { 
    UserPlus, 
    X, 
    User, 
    Mail, 
    Lock, 
    ShieldCheck, 
    PlusCircle
} from "lucide-react";

/** Professional corporate-grade user onboarding modal */
const AddUserModal = ({ isOpen, onClose }) => {
    const { register } = useAuthUserStore();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "employee",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register(formData);
        if (success) {
            onClose();
            setFormData({ name: "", email: "", password: "", role: "employee" });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-teal-600 text-white">
                            <UserPlus size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-slate-800 tracking-tight">Onboard New User</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Access Provisioning</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Identity</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Enter full name"
                                    className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all text-sm font-bold"
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
                                    className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all text-sm font-bold"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Key</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all text-sm font-bold"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                                    className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all text-sm font-bold appearance-none cursor-pointer"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                >
                                    <option value="employee">Standard Employee</option>
                                    <option value="manager">Lead Manager</option>
                                    <option value="admin">System Administrator</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-3">
                        <button
                            type="submit"
                            className="flex-1 py-4 rounded-xl bg-slate-900 text-teal-400 font-black text-xs tracking-widest uppercase hover:bg-slate-800 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 group"
                        >
                            <PlusCircle size={16} />
                            Finalize Onboarding
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 rounded-xl bg-slate-50 text-slate-400 font-bold text-xs tracking-widest uppercase hover:bg-slate-100 transition-all active:scale-95"
                        >
                            Dismiss Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;