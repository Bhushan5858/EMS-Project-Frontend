import { useState, useEffect } from "react";
import { useAuthUserStore } from "../src/Store/useAuthUserStore.js";

const UpdateUserModal = ({ isOpen, onClose, user }) => {

    const { updateUser } = useAuthUserStore();

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
                name: user.name,
                email: user.email,
                role: user.role,
                password: "",
                isActive: user.isActive,
                salary: user.salary || "",
            });
        }
    }, [user]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await updateUser(user._id, formData);

        if (success) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg animate-in zoom-in duration-300">

                <h2 className="text-xl font-bold mb-6 text-slate-800 border-b pb-2">Update User Details</h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase px-1">Full Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase px-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                         {/* Role */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase px-1">User Role</label>
                            <select
                                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                                <option value="employee">Employee</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase px-1">Account Status</label>
                            <select
                                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800"
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

                    {/* Salary (Visible only if user role is not admin? No, the requirement says "both employee and manager") */}
                    {formData.role !== "admin" && (
                         <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase px-1">Monthly Salary ($)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                                <input
                                    type="number"
                                    placeholder="Salary Amount"
                                    className="w-full bg-slate-50 border border-slate-200 p-3 pl-7 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800"
                                    value={formData.salary}
                                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    {/* Password */}
                    <div className="flex flex-col gap-1">
                         <label className="text-xs font-semibold text-slate-500 uppercase px-1">Reset Password (Optional)</label>
                        <input
                            type="password"
                            placeholder="Type new password if changing"
                            className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-6 border-t mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-semibold hover:bg-slate-200 transition-all active:scale-95"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-500 transition-all shadow-md active:scale-95"
                        >
                            Update User
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default UpdateUserModal;