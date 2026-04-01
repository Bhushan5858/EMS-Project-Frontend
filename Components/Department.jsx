import { useEffect, useState, useMemo } from "react";
import { useDepartmentStore } from "../src/Store/useDepartmentStore";
import { 
    Building2, 
    Search, 
    Plus, 
    ArrowRight, 
    Users as UsersIcon, 
    UserCheck, 
    MoreHorizontal,
    LayoutGrid,
    AlertCircle
} from "lucide-react";
import AddDepartmentModal from "../Modals/AddDepartmentModal";
import { useAuthUserStore } from "../src/Store/useAuthUserStore";

const Departments = () => {
    const { departments, getDepartmentDetails, getDepartments, isLoading } = useDepartmentStore();
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const { authUser } = useAuthUserStore();
    const role = authUser?.role;

    useEffect(() => {
        getDepartments();
    }, [getDepartments]);

    // Auto-redirect for non-admins if they have a department
    useEffect(() => {
        if (role !== "admin" && departments.length === 1) {
            handleDepartmentClick(departments[0]._id);
        }
    }, [departments, role]);

    const handleDepartmentClick = async (deptId) => {
        const result = await getDepartmentDetails(deptId);
        if(result) {
            useAuthUserStore.setState({ activeSection: "departmentdetail" });
        }
    }

    const filteredDepartments = useMemo(() => {
        if (!departments) return [];
        return departments.filter(dept => 
            dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (dept.managerName && dept.managerName.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [departments, searchTerm]);

    if (role !== "admin" && isLoading) {
         return (
            <div className="flex-1 p-8 bg-slate-50 min-h-full flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium mt-4">Gathering department insights...</p>
            </div>
         );
    }

    if (role === "manager" && departments.length === 0 && !isLoading) {
        return (
            <div className="flex-1 p-8 bg-slate-50 min-h-full flex flex-col items-center justify-center">
                <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 text-center max-w-lg animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <AlertCircle size={48} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Access Restricted</h2>
                    <p className="text-slate-500 mt-4 leading-relaxed text-lg">
                        You haven't been assigned to lead any department yet. Please reach out to your administrator to finalize your setup.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 p-8 bg-slate-50/50 min-h-full">

            <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                
                {/* HEADER SECTION */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-200">
                                <LayoutGrid size={24} />
                            </div>
                            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                                {role === "admin" ? "Department Management" : "My Department"}
                            </h1>
                        </div>
                        <p className="text-slate-500 mt-2 ml-1">
                            {role === "admin" ? "Organize team structures and track company distribution." : "Real-time updates for your assigned workplace."}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        {role === "admin" && (
                            <div className="relative group w-full sm:w-72">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search departments..."
                                    className="w-full text-black bg-white border border-slate-200 pl-11 pr-4 py-3.5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all text-sm shadow-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        )}

                        {role === "admin" && (
                            <button
                                onClick={() => setIsAddOpen(true)}
                                className="flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-teal-100 transition-all active:scale-95 whitespace-nowrap"
                            >
                                <Plus size={20} />
                                New Department
                            </button>
                        )}
                    </div>
                </div>

                {/* GRID SECTION */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-64 bg-white rounded-3xl border border-slate-100 animate-pulse"></div>
                        ))}
                    </div>
                ) : filteredDepartments.length === 0 ? (
                    <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200 flex flex-col items-center">
                        <div className="p-6 rounded-full bg-slate-50 text-slate-300 mb-6">
                            <Building2 size={64} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">No departments found</h3>
                        <p className="text-slate-500 mt-2">Try adjusting your search criteria or add a new department.</p>
                        {searchTerm && (
                            <button onClick={() => setSearchTerm("")} className="mt-4 text-teal-600 font-bold hover:underline">Reset Search</button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                        {filteredDepartments.map((dept) => (
                            <div
                                key={dept._id}
                                className="group relative bg-white rounded-[2.5rem] p-8 border border-slate-200 hover:border-teal-500 hover:shadow-2xl hover:shadow-teal-100 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col justify-between h-72"
                                onClick={() => handleDepartmentClick(dept._id)}
                            >
                                {/* Decorative Glow */}
                                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-teal-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-3xl"></div>

                                <div>
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-50 text-slate-800 shadow-inner group-hover:bg-teal-600 group-hover:text-white transition-all duration-500">
                                            <Building2 size={24} />
                                        </div>
                                        <div className="text-slate-300 hover:text-teal-600 transition-colors">
                                            <MoreHorizontal size={20} />
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-bold text-slate-800 mt-6 tracking-tight group-hover:translate-x-1 transition-transform">
                                        {dept.name}
                                    </h2>

                                    {/* MANAGER BADGE */}
                                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 font-medium">
                                        <div className={`p-1.5 rounded-lg ${dept.managerName ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-500 italic'}`}>
                                            <UserCheck size={14} />
                                        </div>
                                        <span className={!dept.managerName ? 'text-xs text-rose-400' : ''}>
                                            {dept.managerName ? `Led by ${dept.managerName}` : 'No Manager Assigned'}
                                        </span>
                                    </div>
                                </div>

                                {/* FOOTER STATS */}
                                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center -space-x-2">
                                            {[1, 2].map(i => (
                                                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                                                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300"></div>
                                                </div>
                                            ))}
                                            <div className="w-6 h-6 rounded-full border-2 border-white bg-teal-100 flex items-center justify-center text-[10px] font-bold text-teal-700">
                                                +{dept.employeeCount || 0}
                                            </div>
                                        </div>
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Team Size</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-1 text-teal-600 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                                        Details <ArrowRight size={14} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            <AddDepartmentModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
        </div>
    );
};

export default Departments;
