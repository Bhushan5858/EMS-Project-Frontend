import { useState } from "react";
import { useAuthUserStore } from "../src/Store/useAuthUserStore";
import { UserPlus } from "lucide-react";

const AddUserModal = ({ isOpen, onClose }) => {

    const { addUser } = useAuthUserStore();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "employee",
        isActive: true,
    });

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await addUser(formData);

        if (success) {
            onClose();

            // reset form
            setFormData({
                name: "",
                email: "",
                password: "",
                role: "employee",
                isActive: true,
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            <div className="bg-white w-full max-w-md p-8 rounded-[2rem] shadow-2xl animate-in zoom-in duration-300">

                <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                    <div className="p-2.5 rounded-2xl bg-teal-50 text-teal-600">
                        <UserPlus size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Create New User</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                        <input
                            type="text"
                            placeholder="e.g. John Doe"
                            className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all text-slate-800 placeholder:text-slate-300"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="john@example.com"
                            className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all text-slate-800 placeholder:text-slate-300"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Temporary Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all text-slate-800 placeholder:text-slate-300"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Role */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Assign Role</label>
                            <select
                                className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all text-slate-800"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                                <option value="employee">Employee</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Initial Status</label>
                            <select
                                className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all text-slate-800"
                                value={formData.isActive}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        isActive: e.target.value === "true"
                                    })
                                }
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-3 pt-6 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-2xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all active:scale-95"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-8 py-3 rounded-2xl bg-teal-600 text-white font-bold shadow-lg shadow-teal-100 hover:bg-teal-500 transition-all active:scale-95"
                        >
                            Create User
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default AddUserModal;