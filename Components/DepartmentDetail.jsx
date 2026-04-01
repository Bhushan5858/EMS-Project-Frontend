import { useEffect, useState } from "react";
import UpdateDepartmentModal from "../Modals/UpdateDepartmentModal";
import ConfirmModal from "../Modals/ConfirmModal";
import AssignUserModal from "../Modals/AssignUserModal";
import { useDepartmentStore } from "../src/Store/useDepartmentStore";
import { useAuthUserStore } from "../src/Store/useAuthUserStore";
import { 
    ArrowLeft, 
    User as UserIcon, 
    Users as UsersIcon, 
    Building2, 
    Calendar,
    Settings2,
    Trash2,
    PlusCircle,
    Mail,
    Briefcase,
    DollarSign,
    AlertCircle
} from "lucide-react";

const DepartmentDetail = () => {

    const { authUser, getUsers } = useAuthUserStore();
    const { selectedDepartment, isLoading, removeDepartmentUser, deleteDepartment } = useDepartmentStore();
    const role = authUser?.role;

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [confirmData, setConfirmData] = useState(null);

    if (isLoading) return (
        <div className="flex-1 p-8 bg-slate-50 min-h-full flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium mt-4">Loading department... </p>
        </div>
    );
    if (!selectedDepartment) return (
        <div className="flex-1 p-8 bg-slate-50 min-h-full flex flex-col items-center justify-center">
            <AlertCircle className="text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-bold">Department Not Found</p>
        </div>
    );

    const { department, manager, employees } = selectedDepartment;
    const filteredEmployees = employees.filter((emp) => emp.role !== "manager");

    return (
        <div className="flex-1 p-8 bg-slate-50/50 min-h-full">

            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* TOP BAR / BREADCRUMBS */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => useAuthUserStore.setState({
                            activeSection: "departments",
                            selectedDepartment: null
                        })}
                        className="group flex items-center gap-2 text-slate-500 hover:text-teal-600 font-bold transition-all"
                    >
                        <div className="p-2 rounded-xl bg-white border border-slate-200 group-hover:border-teal-200 group-hover:bg-teal-50 transition-all">
                            <ArrowLeft size={18} />
                        </div>
                        Back to list
                    </button>

                    <div className="flex gap-3">
                        {role === "admin" && (
                            <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 px-5 py-3 rounded-2xl font-bold shadow-sm transition-all active:scale-95"
                                onClick={() => {
                                    setConfirmData({
                                        title: "Delete Department",
                                        message: `Are you sure you want to delete "${department.name}"? This will unassign all users.`,
                                        onConfirm: async () => {
                                            const success = await deleteDepartment(department._id);
                                            if (success) {
                                                useAuthUserStore.setState({ activeSection: "departments", selectedDepartment: null });
                                            }
                                            setConfirmData(null);
                                        }
                                    });
                                }}
                            >
                                <Trash2 size={18} />
                                Delete
                            </button>
                        )}

                        {(role === "admin" || role === "manager") && (
                            <button 
                                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-slate-200 transition-all active:scale-95"
                                onClick={() => setIsEditOpen(true)}
                            >
                                <Settings2 size={18} />
                                Update Details
                            </button>
                        )}
                    </div>
                </div>

                {/* HERO HEADER */}
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-10 border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-50"></div>
                    
                    <div className="relative flex items-center gap-8">
                        <div className="w-20 h-20 flex items-center justify-center bg-teal-600 text-white rounded-[1.5rem] shadow-xl shadow-teal-100">
                            <Building2 size={36} />
                        </div>

                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-4xl font-black text-slate-800 tracking-tight">
                                    {department.name}
                                </h1>
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">
                                    Active Division
                                </span>
                            </div>
                            <div className="flex items-center gap-4 mt-3 text-slate-400 font-medium">
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={16} />
                                    Established {new Date(department.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                                </div>
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                                <div className="flex items-center gap-1.5">
                                    <UsersIcon size={16} />
                                    {employees.length} Members Total
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MANAGER & EMPLOYEES GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* MANAGER CARD */}
                    <div className="lg:col-span-1 border border-slate-100 bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 flex flex-col">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                                <UserIcon size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Direct Manager</h2>
                        </div>

                        {manager ? (
                            <div className="flex-1 flex flex-col">
                                <div className="flex flex-col items-center text-center mb-8 bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
                                    <div className="w-20 h-20 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl font-black mb-4 shadow-sm border-2 border-white">
                                        {manager.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800">{manager.name}</h3>
                                    <div className="flex items-center gap-1 text-slate-400 font-medium text-sm mt-1">
                                        <Briefcase size={14} />
                                        {manager.position || 'Department Head'}
                                    </div>
                                </div>

                                <div className="space-y-4 px-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 text-slate-400">
                                            <Mail size={16} />
                                            <span className="text-sm font-medium">Email</span>
                                        </div>
                                        <span className="text-sm font-bold text-slate-700">{manager.email}</span>
                                    </div>

                                    {role !== "employee" && (
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 text-slate-400">
                                                <DollarSign size={16} />
                                                <span className="text-sm font-medium">Monthly Pay</span>
                                            </div>
                                            <span className="text-sm font-black text-slate-800">INR {manager.salary?.toLocaleString()}</span>
                                        </div>
                                    )}
                                </div>

                                {role === "admin" && (
                                    <button
                                        className="mt-auto pt-8 text-rose-500 font-bold text-sm hover:text-rose-600 transition-colors flex items-center justify-center gap-2 group"
                                        onClick={() => {
                                            setConfirmData({
                                                title: "Remove Manager",
                                                message: `Are you sure you want to remove ${manager.name} from this position?`,
                                                onConfirm: async () => {
                                                    await removeDepartmentUser(department._id, manager._id);
                                                    await getUsers();
                                                    setConfirmData(null);
                                                }
                                            }); 
                                        }}
                                    >
                                        <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
                                        Unassign Manager
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-50/50 rounded-[2rem] border border-dashed border-slate-200">
                                <div className="p-4 rounded-full bg-white shadow-sm mb-4 text-slate-300">
                                    <UserIcon size={32} />
                                </div>
                                <p className="text-slate-500 font-medium text-sm leading-relaxed">No leadership has been assigned to this department yet.</p>
                                {role === "admin" && (
                                    <button
                                        className="mt-4 flex items-center gap-2 text-teal-600 font-black text-xs uppercase tracking-widest hover:underline"
                                        onClick={() => setModalType("manager")}
                                    >
                                        <PlusCircle size={16} />
                                        Assign Now
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* EMPLOYEES SECTION */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                                    <UsersIcon size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                                    Active Team <span className="text-slate-300 ml-1">({filteredEmployees.length})</span>
                                </h2>
                            </div>

                            {(role === "admin" || role === "manager") && (
                                <button
                                    className="flex items-center gap-2 text-teal-600 font-black text-xs uppercase tracking-widest hover:bg-teal-50 px-4 py-2 rounded-xl transition-all"
                                    onClick={() => setModalType("employee")}
                                >
                                    <PlusCircle size={18} />
                                    Add Team Member
                                </button>
                            )}
                        </div>

                        {filteredEmployees.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
                                <p className="text-slate-400 font-medium">This team is currently empty.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {filteredEmployees.map(emp => (
                                    <div key={emp._id} className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center font-bold text-sm border border-slate-100 group-hover:bg-teal-600 group-hover:text-white transition-all">
                                                {emp.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 1)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800 text-sm">{emp.name}</h4>
                                                <p className="text-xs text-slate-400 font-medium">{emp.position || 'Staff'}</p>
                                            </div>
                                        </div>

                                        {(role === "admin" || role === "manager") && (
                                            <button
                                                className="p-2 rounded-xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100"
                                                onClick={() => {
                                                    setConfirmData({
                                                        title: "Remove Employee",
                                                        message: `Unassign ${emp.name} from this department?`,
                                                        onConfirm:async () => {
                                                            await removeDepartmentUser(department._id, emp._id);
                                                            await getUsers();
                                                            setConfirmData(null);
                                                        }
                                                    });
                                                }}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* MODALS */}
            {confirmData && (
                <ConfirmModal
                    title={confirmData.title}
                    message={confirmData.message}
                    onConfirm={confirmData.onConfirm}
                    onCancel={() => setConfirmData(null)}
                />
            )}

            {isEditOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <UpdateDepartmentModal 
                        department={department} 
                        onClose={() => setIsEditOpen(false)} 
                    />
                </div>
            )}

            {modalType && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <AssignUserModal
                        type={modalType}
                        departmentId={department._id}
                        onClose={() => setModalType(null)}
                    />
                </div>
            )}
        </div>
    );
};

export default DepartmentDetail;